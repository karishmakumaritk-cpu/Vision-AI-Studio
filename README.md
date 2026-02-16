# Vision AI Studio

Vite frontend + Render backend deployment guide.

## 1) Local run

```bash
npm install
npm run dev
```

## 2) Environment variable (IMPORTANT)

Frontend API call ke liye `VITE_BACKEND_URL` set karo.

`.env` example:

```env
VITE_BACKEND_URL=https://vision-ai-studio-backend.onrender.com
```

## 3) Vercel deploy (frontend)

Vercel project settings:

- Framework Preset: **Vite**
- Root Directory: **./**
- Install Command: **npm install**
- Build Command: **npm run build**
- Output Directory: **dist**
- Environment Variable: `VITE_BACKEND_URL=https://vision-ai-studio-backend.onrender.com`

## 4) Render deploy (backend)

Render logs show server is running on port 10000, which is good. Agar browser pe "blank" lage,
usually root route response ya frontend API/CORS config issue hota hai.

Backend checklist:

- `PORT` se listen karo (Render provides it)
- root route (`/`) ya health route (`/health`) pe response return karo
- CORS me frontend domain allow karo:
  - Vercel domain
  - GitHub Pages domain
  - local dev origin

## 5) GitHub Pages deploy (optional)

Workflow already present at `.github/workflows/deploy-pages.yml`.

1. Repo → **Settings → Pages**
2. **Source = GitHub Actions**
3. Push to `main`
4. URL format: `https://<username>.github.io/Vision-AI-Studio/`
