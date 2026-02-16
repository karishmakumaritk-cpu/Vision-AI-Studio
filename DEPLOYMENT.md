# 🚀 Deployment Guide

## Overview

This guide covers deploying both frontend and backend to production.

---

## Part 1: Backend Deployment

### Option A: Deploy to Render.com (Recommended)

#### Step 1: Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub account
- Authorize Render to access your GitHub repos

#### Step 2: Prepare Repository
```bash
# Ensure backend/.env is NOT committed
git status  # Confirm .env is not listed

# Commit all changes
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 3: Deploy on Render
1. Go to render.com Dashboard
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Configure:
   - **Name**: herbalance-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Branch**: main

#### Step 4: Set Environment Variables
In Render dashboard → **Environment**:
```
SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_KEY=your_production_service_key
SUPABASE_ANON_KEY=your_production_anon_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
JWT_SECRET=generate_new_random_secret_here
RAZORPAY_KEY_ID=your_production_razorpay_key
RAZORPAY_KEY_SECRET=your_production_razorpay_secret
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

#### Step 5: Deploy
- Click **Deploy**
- Render automatically builds and deploys
- You get a URL: `https://herbalance-backend-xxx.onrender.com`

### Option B: Deploy to Railway.app

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

#### Step 2: Initialize & Deploy
```bash
cd backend
railway init  # Follow prompts
railway variables set SUPABASE_URL=... SUPABASE_SERVICE_KEY=...
railway variables set SMTP_USER=... SMTP_PASS=...
railway variables set FRONTEND_URL=https://your-frontend.com
railway up
```

#### Step 3: Get Production URL
```bash
railway status
# Shows: https://herbalance-backend-xxx.railway.app
```

---

## Part 2: Frontend Deployment

### Option A: Deploy to Vercel (Recommended for React)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
vercel
# Follow interactive prompts
# Vercel automatically detects Vite config
```

#### Step 3: Update Backend URL
After backend is deployed:

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add environment variable:
   ```
   VITE_API_URL=https://herbalance-backend-xxx.onrender.com
   ```

3. Or update in `Contact.jsx`:
   ```javascript
   // Change from localhost to production
   const API_URL = 'https://herbalance-backend-xxx.onrender.com';
   
   const response = await fetch(
     `${API_URL}/api/leads/create`,
     {...}
   );
   ```

### Option B: Deploy to Netlify

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

#### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click **New site from Git**
3. Select your GitHub repo
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Step 3: Set Environment Variables
Netlify Dashboard → Settings → Environment:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

#### Step 4: Deploy
- Netlify automatically builds and deploys on every push

---

## Part 3: Database Replication (Supabase)

### Setup Production Database

#### Option 1: Use Same Supabase Project
- Simpler but less isolated
- Good for MVP/startup

#### Option 2: Create Separate Project
- Better for production safety
- Copy schema to new project

##### Steps:
1. Create new Supabase project for production
2. In new project, SQL Editor → New Query
3. Paste `backend/database/schema.sql`
4. Run the query
5. Update `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in backend production env

---

## Part 4: Connect Everything

### Update Frontend API URL

#### For Vercel:
1. Create `frontend/.env.production`:
   ```
   VITE_API_URL=https://herbalance-backend-xxx.onrender.com
   ```

#### For Netlify:
- Add environment variable in Netlify Dashboard

#### Update Contact.jsx:
```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';

const response = await fetch(
  `${API_URL}/api/leads/create`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }
);
```

### Update Backend FRONTEND_URL

In Render/Railway environment variables:
```
FRONTEND_URL=https://your-frontend-domain.com
```

This allows:
- Proper CORS headers
- Correct email links
- Dashboard redirects

---

## Part 5: Verification Checklist

### Backend Verification
```bash
# Test health endpoint
curl https://your-backend-url.com/api/health

# Test lead creation
curl -X POST https://your-backend-url.com/api/leads/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "1234567890",
    "service_interest": "chatbot",
    "message": "test"
  }'
```

### Frontend Verification
1. Go to https://your-frontend-domain.com
2. Navigate to Contact page
3. Fill and submit form
4. Should see success message
5. Check email (if SMTP working)
6. Check Supabase dashboard for new lead

### Monitoring

#### Render.com Logs
- Dashboard → Web Service → Logs
- See real-time backend activity

#### Vercel Analytics
- Dashboard → Analytics
- Monitor frontend performance

#### Supabase Logs
- Dashboard → Logs
- Monitor database queries

---

## Part 6: Troubleshooting Production Issues

### Backend not responding
- Check Render/Railway logs
- Verify environment variables are set
- Check Supabase is accessible

### CORS errors
- Update FRONTEND_URL in backend env
- Restart backend service
- Clear browser cache

### Emails not sending
- Verify SMTP credentials
- Check Gmail App Password (not regular password)
- Review backend logs for email errors

### Database connection timeout
- Check Supabase project status
- Verify service key is correct
- Check network connectivity

---

## Part 7: Custom Domain Setup

### For Backend (Render):
1. Render Dashboard → Web Service → Settings
2. Add Custom Domain
3. Add CNAME record to your DNS

### For Frontend (Vercel):
1. Vercel Dashboard → Project Settings → Domains
2. Add Domain
3. Configure DNS records (instructions provided)

---

## Part 8: SSL/HTTPS

Both Render and Vercel provide **free SSL certificates**:
- Automatically generated
- Auto-renewal
- No additional cost

---

## Part 9: Auto-Scaling & Optimization

### Backend (Render)
- Render auto-scales based on traffic
- No configuration needed
- Free tier includes auto-sleep (wake on request)

### Frontend (Vercel)
- Cloudflare CDN for global distribution
- Automatic image optimization
- Built-in analytics

### Database (Supabase)
- Auto-scaling for free tier
- Upgrade to paid plan if needed
- Monitor usage in dashboard

---

## Part 10: Monitoring & Maintenance

### Daily Checks
- Backend health endpoint response time
- Supabase database status
- Email notifications working

### Weekly Checks
- Review error logs
- Monitor usage metrics
- Check CORS for issues

### Monthly Tasks
- Update dependencies: `npm update`
- Review and optimize queries
- Backup database (Supabase auto-backups)

---

## Summary

**Complete Deployment Flow:**

1. ✅ Deploy Backend to Render/Railway
   - Get production URL: `https://herbalance-backend-xxx.com`

2. ✅ Deploy Frontend to Vercel/Netlify
   - Get production URL: `https://frontend-domain.com`

3. ✅ Setup Production Database
   - Copy schema to production Supabase

4. ✅ Connect Components
   - Update frontend to call production backend
   - Update backend FRONTEND_URL
   - Update Supabase credentials

5. ✅ Test Complete Flow
   - Fill contact form
   - Verify lead in database
   - Check for welcome email

6. ✅ Monitor & Maintain
   - Check logs regularly
   - Update dependencies
   - Scale as needed

---

## Estimated Costs

| Service | Free Tier | Production |
|---------|-----------|-----------|
| **Render** | ✅ (auto-sleep) | $7-50/month |
| **Vercel** | ✅ (limited) | $20+/month |
| **Supabase** | ✅ Limited DB | $10-1000+/month |
| **Gmail SMTP** | ✅ FREE | ✅ FREE |

**Total Monthly Cost**: Can start at **$0** (free tier) → grows with usage

---

## Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Production Best Practices: https://expressjs.com/en/advanced/best-practice-performance.html
