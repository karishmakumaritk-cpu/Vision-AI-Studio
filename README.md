# Vision AI Studio

Vite frontend + Render backend setup (without changing your core workflow).

## Why Vercel shows only one page

Aapka deploy technically successful ho sakta hai, lekin agar frontend backend se connect nahi kar pa raha
(CORS/env/api URL issue), to UI static ek page jaisa dikhta rehta hai.

## What is configured now

- Frontend default API base: `/api`
- `vercel.json` rewrite: `/api/*` -> `https://vision-ai-studio-backend.onrender.com/*`
- Optional env override: `VITE_BACKEND_URL`
- Frontend status box + response preview for quick debugging

## Vercel settings

- Framework: `Vite`
- Root: `./`
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

(Optional) Environment variable:

```env
VITE_BACKEND_URL=https://vision-ai-studio-backend.onrender.com
```

## Render backend checklist

- `PORT` se listen karna (already visible in logs)
- `/health` route add/verify karo
- CORS allow origins:
  - your Vercel domain
  - local dev (`http://localhost:5173`)

## Local run

```bash
npm install
npm run dev
```
