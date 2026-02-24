# Deployment

## Frontend (Vercel)
- Root directory: `frontend`
- Build command: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL`

## Backend (Render/Railway)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Set env from `backend/.env.example`

## Database (Supabase)
- Run `database/schema.sql`
- Run `database/seeds.sql`


## Common Supabase URI Fix (Important)
If you see Prisma/DB connection errors with Supabase URI:
- use `sslmode=require`
- URL-encode password characters (`@` => `%40`, `#` => `%23`, etc.)
- prefer pooler URL for runtime:
  - `postgresql://postgres.<project-ref>:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require`
- use direct `db.<project-ref>.supabase.co:5432` only for migrations when needed.


### Your project reference example
For project ref `pcrtgcyqryafuautfctg`:
- `SUPABASE_URL=https://pcrtgcyqryafuautfctg.supabase.co`
- Runtime DB URL must use pooler host `aws-0-ap-south-1.pooler.supabase.com:6543`
- Migration URL can use direct host `db.pcrtgcyqryafuautfctg.supabase.co:5432`

IMPORTANT: secrets security and correct SUPABASE_URL

- Use the HTTP(S) Supabase URL for `SUPABASE_URL` (example):

  `SUPABASE_URL=https://pcrtgcyqryafuautfctg.supabase.co`

- Do NOT set `SUPABASE_URL` to the Postgres connection string (the `postgresql://...` value). If you set `SUPABASE_URL` to a `postgresql://...` string, backend auth/data calls will fail.

- If you have posted or shared secret keys (service role keys, DB passwords, API keys) publicly (for example in chat, issues, or commit history), rotate them immediately in the provider dashboard (Supabase, Stripe, Twilio, OpenAI, etc.) and update the copied values in your deployment environment variables. Treat the following as sensitive (server-only):

  - `SUPABASE_SERVICE_KEY` (Supabase service role key)
  - `DATABASE_URL` (Postgres connection string)
  - `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `TWILIO_AUTH_TOKEN`, `EMAIL_SMTP_PASS`, and similar

  Replace any exposed values right away and redeploy.

Recommended env var names and scopes

- Public (frontend) - safe to expose to browsers:
  - `NEXT_PUBLIC_SUPABASE_URL` = https://<your-supabase-project>.supabase.co
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key

- Server-only (do not expose to browser):
  - `SUPABASE_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) — service role key used only by server code
  - `DATABASE_URL` — Postgres connection string (postgresql://...)
  - `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASS`, `NEXTAUTH_SECRET`, etc.

Set the server-only variables in your host (Vercel/Render) as protected secrets and do not prefix them with `NEXT_PUBLIC_`.


## Notifications Setup
- Gmail (for owner email alerts): set `GMAIL_USER`, `GMAIL_APP_PASSWORD` in backend env.
- Twilio WhatsApp (for +91 9818691915 alerts): set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`.
- Endpoint used by frontend request form: `POST /api/automation/request`.
