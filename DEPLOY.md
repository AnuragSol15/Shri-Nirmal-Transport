# Deployment Runbook — Render + Custom Domain

Two Render services from one repo:
- **shri-nirmal-ui** — Static Site (the React build in `ui/`)
- **shri-nirmal-api** — Web Service (FastAPI in `backend/`)

Final URLs:
- `https://www.yourdomain.com` → UI
- `https://api.yourdomain.com` → API

---

## 0. Prerequisites
- A GitHub repo containing this project (with the `ui/` + `backend/` layout).
- A [Render](https://render.com) account (free, sign in with GitHub).
- SMTP credentials (Gmail App Password, **or** a Brevo/Resend free account — recommended).
- A domain (Cloudflare Registrar / Namecheap / Hostinger).

## 1. Push the repo to GitHub
From the project root:
```bash
git add .
git commit -m "Monorepo (ui + backend) + Render deploy config"
git branch -M main
git push -u origin main
```
> `.gitignore` already excludes `node_modules`, `dist`, `.env`, and `__pycache__`.

## 2. Create the services on Render (Blueprint)
1. Render Dashboard → **New +** → **Blueprint**.
2. Select your repo. Render reads `render.yaml` and proposes **two** services.
3. Click **Apply**. (If Blueprint gives trouble, create them manually — see Appendix A.)

## 3. Set environment variables (Render dashboard → each service → Environment)
**shri-nirmal-api** (secrets — `sync: false` in the blueprint):
| Key | Value |
|---|---|
| `SMTP_SERVER` | `smtp-relay.brevo.com` (or `smtp.gmail.com`) |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | your SMTP login |
| `SMTP_PASSWORD` | your SMTP key / Gmail App Password |
| `MAIL_TO` | `anurag15work@gmail.com` |
| `MAIL_FROM` | a verified sender address |
| `ALLOWED_ORIGINS` | *(fill in step 5)* |

**shri-nirmal-ui**:
| Key | Value |
|---|---|
| `VITE_QUOTES_API` | *(fill in step 5)* |
| `VITE_WAITLIST_API` | *(fill in step 5)* |
| `VITE_SITE_URL` | `https://www.yourdomain.com` (your real domain, **no** trailing slash) |
| `VITE_GA_ID` | GA4 id `G-XXXXXXXXXX` (optional; blank = analytics off) |

## 4. First deploy (on `.onrender.com` URLs)
- Note the two generated URLs, e.g. `shri-nirmal-api.onrender.com` and `shri-nirmal-ui.onrender.com`.
- Temporarily set:
  - API `ALLOWED_ORIGINS=https://shri-nirmal-ui.onrender.com`
  - UI `VITE_QUOTES_API=https://shri-nirmal-api.onrender.com/api/quotes`
- Trigger a redeploy of the UI (env vars are baked in at build time).
- Test: open the UI, submit a quote → check the inbox + the API logs.
- Health check: `https://shri-nirmal-api.onrender.com/api/health`.

## 5. Attach the custom domain
**In Render:**
- `shri-nirmal-ui` → Settings → Custom Domains → add `www.yourdomain.com` **and** `yourdomain.com`.
- `shri-nirmal-api` → Custom Domains → add `api.yourdomain.com`.
Render shows the DNS target for each.

**In your registrar / DNS (Cloudflare):**
| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `shri-nirmal-ui.onrender.com` |
| CNAME | `api` | `shri-nirmal-api.onrender.com` |
| ALIAS/ANAME (or A) | `@` (apex) | per Render's instructions |

(If on Cloudflare, set those records to **DNS only / grey-cloud** initially so Render can issue SSL, then you can proxy.)

**Then update env to the real domain and redeploy:**
- API `ALLOWED_ORIGINS=https://www.yourdomain.com,https://yourdomain.com`
- UI `VITE_QUOTES_API=https://api.yourdomain.com/api/quotes`

SSL certs are issued automatically once DNS resolves.

## 6. Keep the free API warm (optional but recommended)
Render free web services sleep after ~15 min idle (cold start ~30–60s). Add a free
[UptimeRobot](https://uptimerobot.com) HTTP monitor hitting
`https://api.yourdomain.com/api/health` every 5–10 min.

## 7. Email deliverability (if sending from your domain)
Add the **SPF** + **DKIM** DNS records your mail provider gives you, so quote emails
don't land in spam.

---

## Before you launch — domain, SEO & analytics
A few values reference a placeholder domain (`https://www.yourdomain.com`). Swap them to your real domain:

1. **`VITE_SITE_URL`** (UI env in `render.yaml` + local `.env`) — drives the `og:image`,
   `canonical`, and JSON-LD structured-data URLs that are baked into `index.html` at **build
   time**. Set it before/at deploy, then redeploy the UI.
2. **`ui/public/sitemap.xml`** — replace the domain in both URLs (homepage + `/privacy`).
3. **`ui/public/robots.txt`** — replace the domain in the `Sitemap:` line.

**Analytics:** set `VITE_GA_ID` to your GA4 measurement id (`G-XXXXXXXXXX`) to turn on Google
Analytics (SPA page views are tracked on every route change). Leaving it blank loads no script.

**Social share image:** `ui/public/og-image.png` (1200×630) already ships and is referenced by the
OG/Twitter tags. To rebrand it, edit `ui/public/og-image.svg`, open `tools/og-image-generator.html`
in a browser, click **Download og-image.png**, and replace the file in `ui/public/`.

> Tip: search the repo for `yourdomain.com` to catch every placeholder at once.

---

## Appendix A — Manual service creation (if not using Blueprint)
**API:** New + → Web Service → repo → Root Dir `backend`, Runtime `Python`,
Build `pip install -r requirements.txt`,
Start `uvicorn main:app --host 0.0.0.0 --port $PORT`, Health `/api/health`, Plan Free.

**UI:** New + → Static Site → repo → Root Dir `ui`,
Build `npm ci && npm run build`, Publish Dir `dist`.
Add a rewrite rule: Source `/*` → Destination `/index.html` (Action: Rewrite).

## Appendix B — Local dev still works
```bash
# backend  (use a Python 3.12 venv — newer Pythons lack prebuilt pydantic-core wheels)
cd backend && py -3.12 -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# frontend
cd ui && npm install && npm run dev
```
