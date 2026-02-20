# Deployment Guide

## Vercel + Supabase/Railway Postgres
1. Push repository to Git provider.
2. Import project in Vercel.
3. Configure environment variables from `.env.example`.
4. Add production database URL and run Prisma migrations:
   - `npx prisma migrate deploy`
5. Configure Stripe webhook endpoint:
   - `https://<your-domain>/api/stripe/webhook`

## Docker
```bash
docker compose up --build
```

## CI suggestion
- Run `npm ci`
- Run `npx prisma generate`
- Run `npm run build`
