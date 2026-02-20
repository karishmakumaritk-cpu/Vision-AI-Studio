# Vision AI Studio (Next.js 14 SaaS)

Production-ready AI SaaS starter inspired by Tixu.ai.

## Stack
- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS (ShadCN-compatible component style)
- PostgreSQL + Prisma
- NextAuth (Google OAuth + email/password)
- Stripe subscriptions
- OpenAI API integration
- Zustand state store

## Features
- Marketing landing page (hero, features, pricing, testimonials, FAQ, footer)
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
    auth/[...nextauth]
    auth/register
    ai/generate
    prompts
    stripe/checkout
    stripe/webhook
    admin/users
components/
  landing/
  dashboard/
lib/
  auth.ts db.ts openai.ts stripe.ts rate-limit.ts usage.ts validations.ts
prisma/schema.prisma
store/ui-store.ts
types/next-auth.d.ts
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

4. Run development server
```bash
npm run dev
```

## Stripe Webhook (local)
Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

## Deployment
- Frontend/API: Vercel
- Database: Railway or Supabase Postgres
- Optional file storage: Supabase Storage or Cloudinary

## Security Notes
- Input validation via Zod
- Route protection via middleware + server session checks
- Basic in-memory rate limiting (replace with Redis/Upstash in production)
- Plan-based usage limits
