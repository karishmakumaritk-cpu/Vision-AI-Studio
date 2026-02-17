# Vision AI Studio — Production SaaS Build Plan

This document converts your product vision into an implementation-ready blueprint.

## Architecture
Frontend (Vercel) → Backend API (Render) → Supabase DB/Auth → n8n → WhatsApp/Email/Voice APIs.

## Included in this repository now
- Backend scaffold with auth, workflows, subscriptions, usage, payment placeholder.
- Trial expiry middleware and hourly cron checker.
- Plan limits utility for Trial/Starter/Growth/Pro.
- SQL schema for 5 core tables (`users`, `subscriptions`, `workflows`, `usage_logs`, `leads`).

## Day-wise rollout
1. Configure Supabase and run `database/schema.sql`.
2. Configure backend env + deploy backend (`backend/`).
3. Connect frontend signup/login/dashboard to backend APIs.
4. Add payment integration in `backend/routes/payments.js`.
5. Connect n8n webhooks and workflow templates.
6. QA trial expiry and workflow disable flow.
7. Launch with monitoring and alerting.

## Required environment variables
See your requested values and map them to:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `JWT_SECRET`
- `N8N_WEBHOOK_URL`
- `FRONTEND_URL`
