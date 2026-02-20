# Deployment Guide (Monolith-first)

## 1) Database (Supabase)
1. Create project.
2. Run `database/schema.sql`.
3. Run `database/seeds.sql`.
4. Save `SUPABASE_URL` + `SUPABASE_SERVICE_KEY`.

## 2) Backend (Render/Railway)
- Root: `backend`
- Build: `npm install`
- Start: `npm start`
- Add env vars from `backend/.env.example`

## 3) Frontend (Vercel)
- Root: `frontend`
- Build: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL=https://<backend>/api`

## 4) Payments
- Stripe webhook: `https://<backend>/api/payments/stripe/webhook`
- Configure Razorpay keys.

## 5) Production checklist
- Secure JWT secret
- CORS set to frontend domain
- Rate limits enabled
- Cron jobs active
- Monitoring/logging configured
