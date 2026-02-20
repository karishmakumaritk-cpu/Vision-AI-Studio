# Vision AI Studio (Next.js 14 SaaS)

Production-ready AI SaaS starter inspired by Tixu.ai.

## Stack
- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS (ShadCN-compatible style)
- PostgreSQL + Prisma
- NextAuth (Google OAuth + email/password)
- Stripe subscriptions
- OpenAI API integration
- Zustand state store

## Features
- Animated landing page with local free SVG illustrations
- Auth flow (signup/login/logout + Google OAuth)
- Protected dashboard with sidebar navigation
- AI prompt generator and saved prompt history
- Billing page with Stripe checkout
- Admin panel and admin API
- Usage limits per plan + rate-limited AI endpoint

## Folder Structure
```txt
app/
  (landing)/signin
  (landing)/signup
  (dashboard)/dashboard
  (dashboard)/admin
  api/
components/
  landing/
    sections/
  dashboard/
lib/
prisma/schema.prisma
public/images/
docs/DEPLOYMENT.md
```

## Setup
1. Install dependencies
```bash
npm install
```

2. Configure environment
```bash
cp .env.example .env
```

3. Set up database and Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run dev server
```bash
npm run dev
```

## Deployment
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

### Vercel
- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm ci`

### Railway
- Uses `railway.json` + `Dockerfile`

### Docker local
```bash
docker compose up --build
```

## Security Notes
- Input validation via Zod
- Route protection via middleware + server session checks
- Basic in-memory rate limiting (replace with Redis/Upstash in production)
- Plan-based usage limits
