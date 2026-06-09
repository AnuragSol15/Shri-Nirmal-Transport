# Backend — Quote Intake API (FastAPI)

Owned, third-party-free replacement for FormSubmit. Receives quote requests from
the React UI and emails a premium HTML summary via Python's built-in `smtplib`.

## Setup
```bash
cd backend
python -m venv .venv
# Windows:  .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # fill in SMTP credentials
uvicorn main:app --reload --port 8000
```

- Health check: `GET http://localhost:8000/api/health`
- Quote intake: `POST http://localhost:8000/api/quotes`
- Interactive docs: `http://localhost:8000/docs`

## Request body (mirrors `QuoteBuilder.jsx`)
```json
{
  "loadType": "FTL",
  "origin": "Indore",
  "destination": "Mumbai",
  "weight": "12",
  "cargo": "Palletised FMCG, 20 pallets",
  "name": "Anurag Solanki",
  "phone": "+91-88176-70032"
}
```

## Notes
- CORS is open to `http://localhost:5173` (configurable via `ALLOWED_ORIGINS`).
- If SMTP env vars are absent, the inquiry is still **logged** and the API returns
  `delivered: false` (so the UI works in development without mail credentials).
- Gmail requires an **App Password**, not your normal password.
