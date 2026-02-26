# Vision AI Studio — Production SaaS

## 🚀 Deploy in 4 Steps

---

### STEP 1 — Fix Google OAuth (CRITICAL)

Go to: https://console.cloud.google.com/apis/credentials

Click your OAuth 2.0 Client (Web client 2)

Add to **Authorized redirect URIs**:
```
https://vision-ai-studio-git-main-velisions-projects.vercel.app/api/auth/callback/google
```

Also add to **Authorized JavaScript origins**:
```
https://vision-ai-studio-git-main-velisions-projects.vercel.app
```

Save. Wait 5 minutes.

> ⚠️ **Vercel preview deployments** get a unique URL per commit (e.g. `vision-ai-studio-80hlc8w72-velisions-projects.vercel.app`). These change every deploy and cannot all be registered. The `next.config.mjs` in this repo automatically pins `NEXTAUTH_URL` to `NEXT_PUBLIC_APP_URL` for any deployment where `NEXTAUTH_URL` is not explicitly set, ensuring Google always receives the stable registered redirect URI. You still **must** set `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` in your Vercel project environment variables (see Step 4).

---

### STEP 2 — Setup Supabase

1. Go to https://supabase.com → Create project
2. Go to SQL Editor → Run the file: `supabase-schema.sql`
3. Copy your credentials from Settings → API

---

### STEP 3 — Push to GitHub

```bash
git init
git add .
git commit -m "Vision AI Studio v1.0"
git remote add origin https://github.com/YOUR_USERNAME/vision-ai-studio.git
git push -u origin main
```

---

### STEP 4 — Deploy on Vercel

1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Add Environment Variables (**set for All Environments**):

| Variable | Correct value / where to find it |
|----------|----------------------------------|
| `NEXTAUTH_URL` | Your stable production URL, e.g. `https://vision-ai-studio-git-main-velisions-projects.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` above |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` and paste the output. **Do NOT use your Vercel project ID** — it must be a long random secret. |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console → Credentials |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console → Credentials |
| `NEXT_PUBLIC_SUPABASE_URL` | The Supabase project **REST URL**: `https://<project-ref>.supabase.co` — found in Supabase → Settings → API. **This is NOT the same as the PostgreSQL connection string.** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase → Settings → API → service_role key |
| `DATABASE_URL` | Supabase pooler URL with your **real password** substituted for `<YOUR-PASSWORD>`: `postgresql://postgres.<ref>:<password>@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require` |
| `DIRECT_URL` | Supabase direct URL (for Prisma migrations): `postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres?sslmode=require` |
| `OPENAI_API_KEY` | From https://platform.openai.com/api-keys |

4. Click **Deploy**

---

### Make Yourself Admin

After first signup, run in Supabase SQL Editor:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

---

## 📁 Project Structure

```
vision-ai-studio/
├── app/
│   ├── page.tsx              ← Public homepage
│   ├── signin/page.tsx       ← Login page
│   ├── signup/page.tsx       ← Register page
│   ├── dashboard/            ← Customer dashboard (protected)
│   ├── admin/                ← Admin panel (admin only)
│   ├── pricing/page.tsx      ← Pricing page
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── auth/signup/route.ts
│       └── workflows/route.ts
├── lib/
│   ├── auth.ts               ← NextAuth config (JWT)
│   └── supabase.ts           ← Supabase admin client
├── middleware.ts              ← Route protection
├── supabase-schema.sql        ← Run this in Supabase
├── .env.example               ← Copy to .env.local
└── vercel.json
```

---

## 🔧 Troubleshooting Common Errors

### Error 400: redirect_uri_mismatch (Google OAuth)

The `redirect_uri` the app sent to Google doesn't match any URI registered in Google Console.

**Root cause 1 — Wrong URI in Google Console.**
Register this URI exactly in Google Console (Step 1 above):
```
https://vision-ai-studio-git-main-velisions-projects.vercel.app/api/auth/callback/google
```

**Root cause 2 — Vercel preview deployment URL.**
Vercel assigns a unique URL to every preview build (e.g. `vision-ai-studio-80hlc8w72-velisions-projects.vercel.app`). These change every deploy and cannot all be registered. `next.config.mjs` now pins `NEXTAUTH_URL` to `NEXT_PUBLIC_APP_URL` whenever `NEXTAUTH_URL` is not explicitly set. **You must still set `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` in Vercel to the stable production URL for all environments.**

---

### Signup / Login fails silently or with a database error

**Cause: `DATABASE_URL` still has the placeholder password.**
If your `DATABASE_URL` contains the literal text `[YOUR-PASSWORD]` or `<YOUR-PASSWORD>`, Prisma cannot connect to Supabase. Replace it with your real database password from Supabase → Settings → Database → Connection string.

**Cause: `DIRECT_URL` is not set.**
Prisma's schema requires both `DATABASE_URL` (pooler, for runtime) and `DIRECT_URL` (direct, for migrations). Add `DIRECT_URL` to your Vercel env vars.

---

### Supabase client errors / NEXT_PUBLIC_SUPABASE_URL misconfigured

`NEXT_PUBLIC_SUPABASE_URL` must be the Supabase project **REST URL** — an HTTPS address like:
```
https://<project-ref>.supabase.co
```
Your Supabase project ref is the string between `//` and `.supabase.co` in your DATABASE_URL.

**Do NOT** set it to a PostgreSQL connection string (`postgresql://...`). That belongs in `DATABASE_URL` only. The app will throw a startup error if a non-HTTPS URL is detected here.

---

### NextAuth JWT / session errors

`NEXTAUTH_SECRET` must be a long, random string. Generate one with:
```bash
openssl rand -base64 32
```
**Do NOT** reuse your Vercel project ID or any other existing key as the secret.

---

## 🛡️ Route Protection

| Route | Access |
|-------|--------|
| `/` | Public |
| `/signin` | Public |
| `/signup` | Public |
| `/pricing` | Public |
| `/dashboard` | Logged in users |
| `/admin` | Admin role only |
