"""
Shri Nirmal Logistics & DN Transport - Quote + Waitlist intake API.

A small, production-minded FastAPI service that receives freight-quote requests
and tracking-portal waitlist signups from the React front-end, logs them, and
emails formatted summaries to the business inbox using Python's built-in
smtplib / email.mime (no third-party form providers).

Hardening:
  * Hidden honeypot field on each endpoint (bots that fill it are rejected).
  * Lightweight in-memory per-IP rate limiting.

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""

from __future__ import annotations

import logging
import os
import re
import smtplib
import ssl
import time
import uuid
from collections import defaultdict, deque
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr, formatdate
from threading import Lock

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:  # pragma: no cover
    pass


# --------------------------------------------------------------------------- #
# Configuration
# --------------------------------------------------------------------------- #
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
)
logger = logging.getLogger("intake-api")

SMTP_SERVER = os.getenv("SMTP_SERVER", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

MAIL_TO = os.getenv("MAIL_TO", "anurag15work@gmail.com")
MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER or "no-reply@shrinirmal.local")
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "Shri Nirmal Logistics - Website")

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if o.strip()
]

BRAND_PRIMARY = "#FF5722"
BRAND_INK = "#0B1220"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


# --------------------------------------------------------------------------- #
# App + CORS
# --------------------------------------------------------------------------- #
app = FastAPI(
    title="Shri Nirmal Logistics - Intake API",
    version="1.1.0",
    description="Receives freight quotes + tracking waitlist signups and emails them.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------- #
# Lightweight in-memory rate limiter (per client IP, sliding window)
# --------------------------------------------------------------------------- #
def client_ip(request: Request) -> str:
    """Resolve the real client IP, honoring Render's proxy header."""
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


class RateLimiter:
    """Allow at most `max_requests` per `window_seconds` per IP (in-memory)."""

    def __init__(self, max_requests: int, window_seconds: int) -> None:
        self.max_requests = max_requests
        self.window = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def __call__(self, request: Request) -> None:
        ip = client_ip(request)
        now = time.monotonic()
        with self._lock:
            bucket = self._hits[ip]
            while bucket and now - bucket[0] > self.window:
                bucket.popleft()
            if len(bucket) >= self.max_requests:
                logger.warning("Rate limit hit for %s on %s", ip, request.url.path)
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Too many requests. Please wait a moment and try again.",
                )
            bucket.append(now)


quote_limiter = RateLimiter(max_requests=5, window_seconds=60)
waitlist_limiter = RateLimiter(max_requests=5, window_seconds=60)


# --------------------------------------------------------------------------- #
# Schemas (honeypot `hp` must stay empty for humans)
# --------------------------------------------------------------------------- #
class QuoteRequest(BaseModel):
    loadType: str = Field(..., examples=["FTL"])
    origin: str = Field(..., min_length=1, examples=["Indore"])
    destination: str = Field(..., min_length=1, examples=["Mumbai"])
    weight: str = Field(..., examples=["12"])
    cargo: str = Field("", description="Cargo description / special handling")
    name: str = Field(..., min_length=1, examples=["Anurag Solanki"])
    phone: str = Field(..., min_length=4, examples=["+91-88176-70032"])
    email: str = Field("", description="Optional customer email", examples=["client@company.com"])
    hp: str = Field("", description="Honeypot - must be empty")

    @field_validator("loadType", "origin", "destination", "weight", "name", "phone")
    @classmethod
    def _strip_required(cls, v: str) -> str:
        v = (v or "").strip()
        if not v:
            raise ValueError("Field must not be empty.")
        return v

    @field_validator("destination")
    @classmethod
    def _route_distinct(cls, v: str, info) -> str:
        origin = (info.data.get("origin") or "").strip().lower()
        if origin and v.strip().lower() == origin:
            raise ValueError("Origin and destination must differ.")
        return v

    @field_validator("email")
    @classmethod
    def _optional_email(cls, v: str) -> str:
        v = (v or "").strip()
        if v and not EMAIL_RE.match(v):
            raise ValueError("Please provide a valid email address or leave it blank.")
        return v


class WaitlistRequest(BaseModel):
    email: str = Field(..., examples=["client@company.com"])
    hp: str = Field("", description="Honeypot - must be empty")

    @field_validator("email")
    @classmethod
    def _valid_email(cls, v: str) -> str:
        v = (v or "").strip()
        if not EMAIL_RE.match(v):
            raise ValueError("A valid email address is required.")
        return v


class IntakeResponse(BaseModel):
    status: str
    reference: str
    delivered: bool
    message: str


def reject_if_bot(hp: str, kind: str, ip: str) -> None:
    """Honeypot guard: a filled hidden field means a bot."""
    if hp and hp.strip():
        logger.warning("Honeypot triggered (%s) from %s - rejected.", kind, ip)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request rejected.",
        )


# --------------------------------------------------------------------------- #
# Email rendering + delivery
# --------------------------------------------------------------------------- #
def _row(label: str, value: str) -> str:
    return f"""
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #1A263F;color:#94a3b8;
            font-size:13px;text-transform:uppercase;letter-spacing:.08em;width:42%;">{label}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #1A263F;color:#ffffff;
            font-size:15px;font-weight:600;">{value or '-'}</td>
      </tr>"""


def _shell(title_kicker: str, inner: str, reference: str, received_at: str) -> str:
    """Shared premium dark email shell."""
    return f"""<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#070B16;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:{BRAND_INK};border:1px solid #1A263F;border-radius:18px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(135deg,{BRAND_INK},#111A2E);padding:28px 24px;border-bottom:3px solid {BRAND_PRIMARY};">
          <div style="display:inline-block;background:{BRAND_PRIMARY};color:#fff;font-weight:800;
               width:42px;height:42px;line-height:42px;text-align:center;border-radius:10px;font-size:16px;">SN</div>
          <span style="color:#fff;font-size:20px;font-weight:800;vertical-align:middle;margin-left:12px;">
            Shri Nirmal Logistics &amp; DN Transport
          </span>
          <p style="margin:14px 0 0;color:{BRAND_PRIMARY};font-size:12px;font-weight:700;
             text-transform:uppercase;letter-spacing:.18em;">{title_kicker}</p>
        </td>
      </tr>
      <tr><td style="padding:24px;">{inner}
        <div style="margin-top:20px;padding:14px 16px;background:rgba(255,87,34,.08);
             border:1px solid rgba(255,87,34,.25);border-radius:12px;">
          <p style="margin:0;color:#cbd5e1;font-size:13px;">
            Reference <b style="color:#fff;">{reference}</b> &middot; Received {received_at}
          </p>
        </div>
      </td></tr>
      <tr>
        <td style="padding:18px 24px;background:#070B16;border-top:1px solid #1A263F;">
          <p style="margin:0;color:#64748b;font-size:12px;">
            Sent automatically by the Shri Nirmal Logistics website &middot; 111/6, S. R. Compound, Indore
          </p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>"""


def send_email(
    subject: str,
    html_body: str,
    text_body: str,
    reference: str,
    reply_to: str | None = None,
) -> bool:
    """Send via SMTP. Returns True if delivered, False if SMTP isn't configured."""
    if not (SMTP_SERVER and SMTP_USER and SMTP_PASSWORD):
        logger.warning(
            "SMTP not configured - logged %s but skipping email delivery.", reference
        )
        return False

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = formataddr((MAIL_FROM_NAME, MAIL_FROM))
    message["To"] = MAIL_TO
    # Reply directly to the customer when we have their email; otherwise the inbox.
    message["Reply-To"] = reply_to or MAIL_TO
    message["Date"] = formatdate(localtime=True)
    message.attach(MIMEText(text_body, "plain", "utf-8"))
    message.attach(MIMEText(html_body, "html", "utf-8"))

    context = ssl.create_default_context()
    try:
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context, timeout=20) as s:
                s.login(SMTP_USER, SMTP_PASSWORD)
                s.sendmail(MAIL_FROM, [MAIL_TO], message.as_string())
        else:
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=20) as s:
                s.ehlo()
                s.starttls(context=context)
                s.login(SMTP_USER, SMTP_PASSWORD)
                s.sendmail(MAIL_FROM, [MAIL_TO], message.as_string())
        logger.info("Email %s delivered to %s", reference, MAIL_TO)
        return True
    except (smtplib.SMTPException, OSError) as exc:
        logger.exception("Failed to deliver %s: %s", reference, exc)
        raise


# --------------------------------------------------------------------------- #
# Routes
# --------------------------------------------------------------------------- #
@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "smtp_configured": bool(SMTP_SERVER and SMTP_USER and SMTP_PASSWORD)}


@app.post(
    "/api/quotes",
    response_model=IntakeResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(quote_limiter)],
)
def create_quote(quote: QuoteRequest, request: Request) -> IntakeResponse:
    ip = client_ip(request)
    reject_if_bot(quote.hp, "quote", ip)

    reference = f"SNT-{uuid.uuid4().hex[:8].upper()}"
    received_at = datetime.now(timezone.utc).strftime("%d %b %Y, %H:%M UTC")

    logger.info(
        "Quote %s | %s | %s -> %s | %s Tons | %s (%s)",
        reference, quote.loadType, quote.origin, quote.destination,
        quote.weight, quote.name, quote.phone,
    )

    inner = f"""<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="border:1px solid #1A263F;border-radius:12px;overflow:hidden;">
        {_row("Load Type", quote.loadType)}
        {_row("Route", f"{quote.origin} &rarr; {quote.destination}")}
        {_row("Estimated Weight", f"{quote.weight} Tons")}
        {_row("Cargo Details", quote.cargo)}
        {_row("Customer Name", quote.name)}
        {_row("Phone", quote.phone)}
        {_row("Email", quote.email)}
      </table>"""
    html_body = _shell("New Freight Quote Request", inner, reference, received_at)
    text_body = (
        f"New Freight Quote Request ({reference})\nReceived: {received_at}\n\n"
        f"Load Type        : {quote.loadType}\n"
        f"Route            : {quote.origin} -> {quote.destination}\n"
        f"Estimated Weight : {quote.weight} Tons\n"
        f"Cargo Details    : {quote.cargo or '-'}\n"
        f"Customer Name    : {quote.name}\n"
        f"Phone            : {quote.phone}\n"
        f"Email            : {quote.email or '-'}\n"
    )
    subject = f"Freight Quote {reference}: {quote.loadType} {quote.origin} -> {quote.destination} ({quote.name})"

    try:
        delivered = send_email(subject, html_body, text_body, reference, reply_to=quote.email or None)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Quote received but email delivery failed. Our team has been notified.",
        ) from exc

    return IntakeResponse(
        status="received",
        reference=reference,
        delivered=delivered,
        message="Quote request received. Our freight desk will reach out shortly.",
    )


@app.post(
    "/api/waitlist",
    response_model=IntakeResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(waitlist_limiter)],
)
def join_waitlist(payload: WaitlistRequest, request: Request) -> IntakeResponse:
    ip = client_ip(request)
    reject_if_bot(payload.hp, "waitlist", ip)

    reference = f"WL-{uuid.uuid4().hex[:8].upper()}"
    received_at = datetime.now(timezone.utc).strftime("%d %b %Y, %H:%M UTC")
    logger.info("Waitlist %s | %s", reference, payload.email)

    inner = f"""<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="border:1px solid #1A263F;border-radius:12px;overflow:hidden;">
        {_row("Waitlist Email", payload.email)}
        {_row("Interest", "Consignment Tracking Portal (Coming Soon)")}
      </table>"""
    html_body = _shell("Tracking Portal - Priority Waitlist", inner, reference, received_at)
    text_body = (
        f"New Tracking Waitlist Signup ({reference})\nReceived: {received_at}\n\n"
        f"Email    : {payload.email}\n"
        f"Interest : Consignment Tracking Portal (Coming Soon)\n"
    )
    subject = f"Tracking Waitlist {reference}: {payload.email}"

    try:
        delivered = send_email(subject, html_body, text_body, reference, reply_to=payload.email)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Signup received but email delivery failed. Our team has been notified.",
        ) from exc

    return IntakeResponse(
        status="received",
        reference=reference,
        delivered=delivered,
        message="You're on the priority list. We'll email you when tracking goes live.",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
