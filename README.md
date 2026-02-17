# Vision-AI-Studio

SaaS automation platform scaffold:

- **Frontend:** Vite app in root (`src/`), deployable to Vercel.
- **Backend:** Express API scaffold in `backend/`, deployable to Render.
- **Database:** Supabase/PostgreSQL schema in `database/schema.sql`.
- **Blueprint:** `docs/PRODUCTION_SAAS_PLAN.md`.

## Frontend
```bash
npm install
npm run dev
npm run build
```

## Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Core API routes
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/workflows`
- `POST /api/workflows/create`
- `GET /api/subscriptions/status`
- `GET /api/usage/stats`
