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


## Quick Windows fix for "ENOENT: no such file or directory, open 'C:\Users\karis\package.json'"

If you see errors like:
- "Could not read package.json: ENOENT"
- "Cannot find path 'C:\Users\karis\frontend'"

It means your terminal is not inside the project folder. Do the following in PowerShell:

1. Find the project folder (example locations)
- If you cloned the repo to Documents or Projects:
  PS> cd C:\Users\karis\Documents\Projects\Vision-AI-Studio
- If you used GitHub Desktop or another tool, adjust path accordingly.

2. Verify you're in the folder that contains package.json:
  PS> Get-ChildItem -Name package.json
  # or
  PS> dir package.json

You should see package.json listed. If not, `cd` into the correct directory.

3. Install and run (examples)

- For the monorepo root (Next.js app):
  PS> cd C:\path\to\Vision-AI-Studio
  PS> npm install
  PS> npm run dev

- For the Vite frontend (if using frontend/ folder):
  PS> cd C:\path\to\Vision-AI-Studio\frontend
  PS> npm install
  PS> npm run dev

- For the Express backend:
  PS> cd C:\path\to\Vision-AI-Studio\backend
  PS> npm install
  PS> npm run dev

4. Quick checks
- Confirm current path:
  PS> Get-Location
- Confirm package.json exists:
  PS> Test-Path package.json

5. Common causes & fixes
- Typo in folder name — use tab-complete when cd-ing.
- You cloned the repo into a different parent folder — search for the project:
  PS> Get-ChildItem -Directory -Recurse -Depth 2 | Where-Object { $_.Name -match "Vision-AI-Studio" }

If you paste the output of `Get-Location` and `dir package.json` I can tell you the exact next command to run.

## How to run the project (copy-paste)

Important: All commands must be run from the project root — the directory that contains package.json.

Windows (PowerShell)
1) Open PowerShell and change to project folder:
   PS> cd "C:\path\to\Vision-AI-Studio"

2) Verify you're in the right folder:
   PS> Get-Location
   PS> Test-Path package.json
   # should return True

3) Install root dependencies and run Next (if using Next at root):
  PS> npm install
   PS> npm run dev
   # Next dev runs at http://localhost:3000 by default

If you see "Could not read package.json: ENOENT" then you are in the wrong folder — cd into the folder that contains package.json.

Frontend (Vite) — if you are running the separate frontend/ app:
   PS> cd "C:\path\to\Vision-AI-Studio\frontend"
   PS> npm install
   PS> npm run dev
   # Vite dev server typically: http://localhost:5173

Backend (Express) — if you are running backend/ separately:
   PS> cd "C:\path\to\Vision-AI-Studio\backend"
   PS> npm install
   PS> npm run dev
   # Backend default: http://localhost:5000

macOS / Linux (bash)
1) cd to project root:
   $ cd /full/path/to/Vision-AI-Studio
2) Verify folder:
   $ pwd
   $ ls package.json
3) Install & run root Next app:
  $ npm install
   $ npm run dev

Docker (if you prefer containerized)
From project root:
   $ docker compose up --build
This will build and start the web service (port mapping from docker-compose.yml).

Quick fixes for common errors
- ENOENT / Could not read package.json:
  -> You ran npm where package.json does not exist. Run `Get-Location` (PowerShell) or `pwd` (bash) and `ls package.json` to confirm.
- "Cannot find path '.../frontend'":
  -> Ensure the frontend folder exists. If you intended to run the root Next app, use the root commands above.
- Port in use:
  -> Find process and stop it, or run with a different port: e.g., `PORT=3001 npm run dev` (bash) or `$env:PORT=3001; npm run dev` (PowerShell).
- Missing env values:
  -> Copy `.env.example` to `.env` and fill secrets before starting services that require them.

If you want, I can:
- Add a convenience script in package.json to run frontend + backend concurrently (requires adding `concurrently` as a devDependency).
- Walk you through exact steps to run on your machine if you paste the output of:
  - Windows: Get-Location and dir package.json
  - macOS/Linux: pwd and ls package.json

## Auto-locate project on Windows (quick)

If you can't `cd` into the project because you're not sure where it was cloned, run the included helper:

PowerShell (copy-paste):
  cd "<path-to-this-repo>"
  powershell -ExecutionPolicy Bypass -File .\tools\find-project.ps1

The script will:
- search common locations (Documents, Desktop, Downloads, OneDrive, Projects),
- print the found path,
- copy the path to the clipboard,
- optionally open a new PowerShell window at the project root.

When the script prints the project path, run:
  cd "C:\full\path\to\Vision-AI-Studio"
Then run the appropriate install/start commands described earlier (e.g., `npm install` and `npm run dev` at project root).

## Authentication & AI quickstart

### Local dev

1. Create a local `.env` file (do **NOT** commit) with the following variables (replace with your values):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_API_URL=http://localhost:10000
```

2. Install dependencies from repo root:
```bash
npm install
```

3. Start the backend (Express + lazy OpenAI):
```bash
npm run start:backend
# Listens on PORT (default 10000)
```

4. Start the Next.js frontend pages (signup / login / dashboard):
```bash
npm run dev:frontend
# Runs at http://localhost:3000
```

5. Open http://localhost:3000/signup to create an account, then http://localhost:3000/login to sign in. After login you will be redirected to http://localhost:3000/dashboard where you can send prompts to the AI endpoint.

### Pages added

| Path | File |
|---|---|
| `/signup` | `frontend/pages/signup.jsx` |
| `/login` | `frontend/pages/login.jsx` |
| `/dashboard` | `frontend/pages/dashboard.jsx` |

### Backend endpoints (backend/server.js)

| Method | Path | Notes |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/api/auth/register` | Placeholder — TODO: Supabase service-role creation |
| POST | `/api/ai/generate` | Lazily imports OpenAI — TODO: wire real model call |

> **Security note:** Never commit `.env` or any file containing real secrets. Rotate any key that is accidentally exposed.
