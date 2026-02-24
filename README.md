# Vision AI Studio - Production Monolith SaaS

Vision AI Studio is a single-monolith SaaS platform designed for fast go-to-market.

## Structure

- `frontend/` React + Vite app (Landing, auth, dashboard, admin)
- `backend/` Express API (auth, products, workflows, payments, admin)
- `database/` Supabase SQL schema and seeds
- `docs/` architecture, API, deployment docs

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
Run SQL files in Supabase SQL editor:
- `database/schema.sql`
- `database/seeds.sql`

## Production Notes
- JWT auth + role-based admin routes
- Trial/subscription-aware workflow middleware
- Stripe + Razorpay payment endpoints
- OpenAI-backed workflow service
- Cron hooks for trial expiration checks

See docs in `docs/` for API and deployment details.


## Supabase URI Error Fix
If your URI shows connection/auth errors, ensure:
- `sslmode=require` is present
- password is URL-encoded
- runtime uses Supabase pooler (`port 6543`)
- direct host (`db.<ref>.supabase.co:5432`) is used only when required for migrations.


## Supabase Connection Quick Fix (for your error)
Use these exact formats:

- Prisma runtime (`DATABASE_URL`):
  - `postgresql://postgres.pcrtgcyqryafuautfctg:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require`
- Prisma migrate (`DIRECT_URL`):
  - `postgresql://postgres:[PASSWORD]@db.pcrtgcyqryafuautfctg.supabase.co:5432/postgres?sslmode=require`
- Supabase JS client (`SUPABASE_URL`):
  - `https://pcrtgcyqryafuautfctg.supabase.co`

If password has special chars (`@`, `#`, `%`), URL-encode before placing in URI.
