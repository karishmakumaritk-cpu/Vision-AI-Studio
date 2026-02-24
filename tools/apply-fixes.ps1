<#
Apply curated fixes from the workspace to your local checkout.

What this script does:
- For each known file it will create a timestamped backup (if the file exists).
- Write the curated content to the file (overwriting it).
- It does NOT run npm, git, or push anything. You remain in control.

Usage (from repo root):
  powershell -ExecutionPolicy Bypass -File .\tools\apply-fixes.ps1

Review the script before running. If you prefer, copy the parts you want manually.
#>

Set-StrictMode -Version Latest

function Write-Backup {
    param($path)
    if (Test-Path $path) {
        $stamp = (Get-Date -Format "yyyyMMdd-HHmmss")
        $bak = "$path.bak.$stamp"
        Copy-Item -Path $path -Destination $bak -Force
        Write-Host "Backed up $path -> $bak"
    }
}

$repoRoot = Get-Location
Write-Host "Applying curated fixes in $repoRoot`n"

$files = @{
    "package.json" = @'
{
  "name": "vision-ai-studio",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "cspell:check": "cspell \"**/*\" --no-must-find-files",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "smoke-test": "node tools/smoke-test.js",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@prisma/client": "^5.18.0",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.1",
    "lucide-react": "^0.451.0",
    "next": "14.2.15",
    "next-auth": "^4.24.8",
    "openai": "^4.67.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.53.0",
    "stripe": "^16.9.0",
    "zod": "^3.23.8",
    "zustand": "^5.0.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "framer-motion": "^10.16.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.21.0",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "@types/node": "^22.7.5",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "cspell": "^6.24.0",
    "eslint-config-next": "14.2.15",
    "postcss": "^8.4.47",
    "prisma": "^5.18.0",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.2"
  }
}
'@

    "cspell.json" = @'
{
  "version": "0.2",
  "language": "en",
  "words": [
    "NextAuth",
    "supabase",
    "Supabase",
    "pgbouncer",
    "Vercel",
    "Render",
    "whatsapp",
    "WhatsApp",
    "Razorpay",
    "sqlx",
    "Prisma",
    "Ai",
    "AIAssistant",
    "AIA",
    "Stripe",
    "postcss",
    "vite",
    "framer",
    "lucide",
    "zod",
    "zustand",
    "nextauth",
    "nodejs",
    "cspell"
  ],
  "allowCompoundWords": true,
  "ignorePaths": [
    "node_modules/**",
    "**/dist/**",
    ".next/**",
    "frontend/node_modules/**",
    "backend/node_modules/**",
    "public/**",
    "**/*.png",
    "**/*.jpg",
    "**/*.svg",
    "**/*.ico",
    "**/*.lock",
    "**/*.log",
    "**/.git/**"
  ]
}
'@

    ".cspellignore" = @'
node_modules
.next
frontend/node_modules
backend/node_modules
public
**/*.png
**/*.jpg
**/*.svg
**/*.ico
**/*.lock
**/*.log
**/.git
'

    ".github/workflows/code-quality.yml" = @'
name: Code Quality (spellcheck + eslint fix)

on:
  workflow_dispatch: {}
  push:
    branches:
      - main
      - master

jobs:
  lint-and-spell:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          npm install --prefer-offline --no-audit --progress=false

      - name: Run ESLint (auto-fix)
        run: |
          npx eslint . --ext .js,.jsx,.ts,.tsx --fix || true

      - name: Run cspell
        run: |
          npx cspell "**/*" --no-must-find-files || true

      - name: Commit fixes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'chore(code-quality): run eslint --fix and cspell'
          file_pattern: '. '
          branch: ${{ github.ref_name }}
          author_name: 'github-actions[bot]'
          author_email: '41898282+github-actions[bot]@users.noreply.github.com'
'
    
    
    
    
'

    "vercel.json" = @'
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
'

    "docs/DEPLOYMENT.md" = @'
# Deployment

## Frontend (Vercel)
- Root directory: `frontend`
- Build command: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL`

## Backend (Render/Railway)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Set env from `backend/.env.example`

## Database (Supabase)
- Run `database/schema.sql`
- Run `database/seeds.sql`


## Common Supabase URI Fix (Important)
If you see Prisma/DB connection errors with Supabase URI:
- use `sslmode=require`
- URL-encode password characters (`@` => `%40`, `#` => `%23`, etc.)
- prefer pooler URL for runtime:
  - `postgresql://postgres.<project-ref>:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require`
- use direct `db.<project-ref>.supabase.co:5432` only for migrations when needed.


### Your project reference example
For project ref `pcrtgcyqryafuautfctg`:
- `SUPABASE_URL=https://pcrtgcyqryafuautfctg.supabase.co`
- Runtime DB URL must use pooler host `aws-0-ap-south-1.pooler.supabase.com:6543`
- Migration URL can use direct host `db.pcrtgcyqryafuautfctg.supabase.co:5432`

IMPORTANT: secrets security and correct SUPABASE_URL

- Use the HTTP(S) Supabase URL for `SUPABASE_URL` (example):

  `SUPABASE_URL=https://pcrtgcyqryafuautfctg.supabase.co`

- Do NOT set `SUPABASE_URL` to the Postgres connection string (the `postgresql://...` value). If you set `SUPABASE_URL` to a `postgresql://...` string, backend auth/data calls will fail.

- If you have posted or shared secret keys (service role keys, DB passwords, API keys) publicly (for example in chat, issues, or commit history), rotate them immediately in the provider dashboard (Supabase, Stripe, Twilio, OpenAI, etc.) and update the copied values in your deployment environment variables. Treat the following as sensitive (server-only):

  - `SUPABASE_SERVICE_KEY` (Supabase service role key)
  - `DATABASE_URL` (Postgres connection string)
  - `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `TWILIO_AUTH_TOKEN`, `EMAIL_SMTP_PASS`, and similar

  Replace any exposed values right away and redeploy.

Recommended env var names and scopes

- Public (frontend) - safe to expose to browsers:
  - `NEXT_PUBLIC_SUPABASE_URL` = https://<your-supabase-project>.supabase.co
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key

- Server-only (do not expose to browser):
  - `SUPABASE_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) — service role key used only by server code
  - `DATABASE_URL` — Postgres connection string (postgresql://...)
  - `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASS`, `NEXTAUTH_SECRET`, etc.

Set the server-only variables in your host (Vercel/Render) as protected secrets and do not prefix them with `NEXT_PUBLIC_`.


## Notifications Setup
- Gmail (for owner email alerts): set `GMAIL_USER`, `GMAIL_APP_PASSWORD` in backend env.
- Twilio WhatsApp (for +91 9818691915 alerts): set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`.
- Endpoint used by frontend request form: `POST /api/automation/request`.
'

    "README.md" = @'
````markdown
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

## Quick local run (static frontend + backend)

- Backend (Express):
  1. cd backend
  2. npm install
  3. cp .env.example .env  # fill values
  4. npm run dev
  Backend listens on PORT (default 5000).

- Static frontend (quick preview using index.html):
  Option A — serve with a static server:
    npx serve -s .
    Then open http://localhost:3000 (or port printed by serve). The static entry is index.html which mounts src/main.js -> src/App.jsx.

  Option B — open index.html in browser (no dev server). Some features (fetch/XHR) require a server.

Notes:
- For full Next.js frontend run the root project with `npm run dev` (Next) after installing deps.
- Environment variables: use `.env.example` as a template. Do not commit secrets.
  
IMPORTANT: secrets safety

- Never paste real API keys, service role keys, database passwords, or other secrets into public chat, issues, or commit messages. If any secret has been exposed, rotate it immediately in the provider dashboard (Supabase, Stripe, Twilio, OpenAI, etc.) and update the deployment environment variables.

````
'

}

foreach ($relPath in $files.Keys) {
    $absPath = Join-Path $repoRoot $relPath
    Write-Host "Processing: $relPath"
    Write-Backup -path $absPath
    $content = $files[$relPath]
    $dir = Split-Path $absPath -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    Set-Content -Path $absPath -Value $content -Encoding UTF8
    Write-Host "Wrote: $absPath`n"
}

Write-Host "Done. Please inspect the files, run 'git status' and commit the changes if they look good."
