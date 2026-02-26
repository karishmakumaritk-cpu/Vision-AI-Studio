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
3. Add Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production URL, e.g. `https://vision-ai-studio-git-main-velisions-projects.vercel.app` (use `http://localhost:3000` for local dev) |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase Settings → API (service_role key) |
| `GOOGLE_CLIENT_ID` | `318717295860-vuhr6eh7angp6k56tt99s8jbaimgb0cg.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From Google Console |

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

## 🔧 Why OAuthSignin Error Happened

The error `OAuthSignin` means Google couldn't redirect back.

**Root cause**: Missing redirect URI in Google Console.

**Fix**: Add `https://vision-ai-studio-git-main-velisions-projects.vercel.app/api/auth/callback/google` to Google Console redirect URIs (Step 1 above).

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
