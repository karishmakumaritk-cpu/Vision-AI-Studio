# Vision-AI-Studio

Production SaaS scaffold with:
- **Frontend:** Vite SPA (root `src/`)
- **Backend:** Express API (`backend/`)
- **DB:** Supabase/Postgres schema (`database/schema.sql`)

## 1) Install

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## 2) Supabase setup
Run `database/schema.sql` in Supabase SQL Editor.

## 3) Required backend env vars
In `backend/.env`:
- `PORT=10000` (Render default can also be used)
- `NODE_ENV=production`
- `FRONTEND_URL=https://your-frontend.vercel.app`
- `SUPABASE_URL=...`
- `SUPABASE_SERVICE_KEY=...`
- `JWT_SECRET=...`

## 4) API routes
- `GET /` → redirects to `/api`
- `GET /api`
- `GET /api/health`
- `GET /health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/google` (not configured placeholder)
- `GET /api/auth/me`
- `GET /api/workflows`
- `POST /api/workflows/create`
- `PATCH /api/workflows/:id/pause`
- `PATCH /api/workflows/:id/resume`
- `DELETE /api/workflows/:id`
- `GET /api/subscriptions/status`
- `GET /api/usage/stats`
- `POST /api/ai/chat`
- `POST /api/support/email-query`

## 5) Render deploy note
If Render root is `backend`, Start Command should be:
```bash
node server.js
```
If Render root is repo root, Start Command should be:
```bash
cd backend && npm install && node server.js
```
