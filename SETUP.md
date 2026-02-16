# 🚀 HerBalance AI Studio - Complete SaaS Platform

## 📋 Project Overview

**HerBalance AI Studio** is a full-stack SaaS automation platform that helps businesses automate operations with AI. It includes:

- ✅ Customer query capture (Contact Form + Chatbot)
- ✅ Automatic 7-day free trial activation
- ✅ Auto-assign automation workflows
- ✅ User dashboard with demo data
- ✅ Backend automation engine integration
- ✅ Payment system (for post-trial)
- ✅ Email notifications
- ✅ n8n workflow integration

---

## 📁 Project Structure

```
HerBalance-AI-Studio/
├── frontend/                  # React.js Website
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   └── styles/           # CSS files
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Node.js + Express API
│   ├── server.js             # Main server file
│   ├── package.json
│   ├── .env.example          # Environment variables template
│   ├── config/
│   │   └── db.js             # Supabase connection
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── middleware/           # Validation & auth
│   ├── utils/                # Helper functions
│   ├── database/
│   │   └── schema.sql        # Database schema
│   └── README.md             # Backend documentation
│
└── SETUP.md                  # This file
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone and Setup Frontend

```bash
cd HerBalance-AI-Studio

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Step 3: Configure .env

Edit `backend/.env`:

```env
# Supabase (Required)
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here

# Email (Optional - for welcome emails)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URL (where your React app is running)
FRONTEND_URL=http://localhost:5173

# Other configs
PORT=5000
NODE_ENV=development
```

### Step 4: Setup Supabase Database

1. Go to [Supabase](https://app.supabase.com)
2. Create a new project
3. Copy URL and keys to `.env`
4. Go to **SQL Editor** → **New Query**
5. Copy-paste entire schema from `backend/database/schema.sql`
6. Click **Run**

### Step 5: Start Backend

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 6: Test the Integration

1. Open `http://localhost:5173`
2. Go to **Contact** page
3. Fill and submit the form
4. Check backend console for success message
5. Check your email for welcome message (if SMTP configured)

---

## 🔧 Detailed Setup Guide

### A. Supabase Setup (Database)

#### Get Supabase Credentials

1. Go to [app.supabase.com](https://app.supabase.com)
2. Create new project
3. Go to **Settings** → **API**
4. Copy these values to `backend/.env`:
   - **Project URL** → `SUPABASE_URL`
   - **anon key** → `SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_KEY`

#### Run Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Paste entire content of `backend/database/schema.sql`
4. Click **Run**
5. All tables will be created automatically

### B. Email Setup (Gmail SMTP)

#### Enable Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Go to **Security**
3. Enable **2-Step Verification** (if not enabled)
4. Back to Security → **App passwords**
5. Select Mail & Windows → Generate
6. Copy 16-character password

#### Update .env

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_app_password
```

### C. Frontend Configuration

The frontend is pre-configured to call the backend API. The Contact form automatically:

1. Validates user input
2. Sends data to `http://localhost:5000/api/leads/create`
3. Shows success/error messages
4. Resets the form on success

No additional configuration needed!

### D. Optional: n8n Integration

To enable workflow automation (WhatsApp, voice agents, etc.):

1. Setup n8n: [docs.n8n.io](https://docs.n8n.io)
2. Create workflows in n8n
3. Get webhook URLs
4. Add to `backend/.env`:
   ```env
   N8N_WEBHOOK_URL=https://your-n8n.com/webhook
   N8N_API_KEY=your_api_key
   ```

Without n8n, basic lead capture still works!

---

## 💻 API Endpoints

### Lead Management

```bash
# Create a lead (from contact form)
POST /api/leads/create
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "service_interest": "chatbot",
  "message": "I want a chatbot for my business"
}

# Get all leads (admin)
GET /api/leads

# Get single lead
GET /api/leads/:id

# Update lead status
PATCH /api/leads/:id/status
{"status": "contacted"}
```

### Trial Management

```bash
# Get user trial status
GET /api/trials/status/:userId

# Get all users
GET /api/trials
```

### Automation

```bash
# Get user automations
GET /api/automation/user/:userId

# Get demo data
GET /api/automation/demo/:userId

# Log automation action
POST /api/automation/:automationId/log
```

See `backend/README.md` for complete API documentation.

---

## 🔄 Workflow: From Lead to Trial User

```
User submits contact form
        ↓
Backend validates data
        ↓
Check if user exists
        ↓
No? Create user with 7-day trial
    ↓
Send welcome email
    ↓
Create lead record
    ↓
Auto-assign automation
    ↓
Generate demo data
    ↓
Trigger n8n workflow (optional)
    ↓
Return success response ✅
```

---

## 🧪 Testing

### Test API with cURL

```bash
# Create a lead
curl -X POST http://localhost:5000/api/leads/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "business_type": "Technology",
    "service_interest": "chatbot",
    "message": "Help me automate my business"
  }'

# Get trial status
curl http://localhost:5000/api/trials/status/USER_ID_HERE

# Health check
curl http://localhost:5000/api/health
```

### Check Backend Console Output

When everything works, you should see:

```
🚀 Server running on port 5000
📍 Environment: development
🔗 Frontend URL: http://localhost:5173
✅ Welcome email sent to: user@example.com
✅ Automation assigned: whatsapp_chatbot
✅ Demo data generated for: whatsapp_chatbot
```

---

## 🐛 Troubleshooting

### Issue: "Cannot POST /api/leads/create"

**Solution:**
- Ensure backend is running (`npm run dev` in backend folder)
- Check if port 5000 is not in use: `lsof -i :5000`
- Verify FRONTEND_URL in `.env` matches your frontend URL

### Issue: "Supabase connection error"

**Solution:**
- Verify SUPABASE_URL and SUPABASE_SERVICE_KEY in `.env`
- Check database schema is created
- Test connection: Check Supabase dashboard → Tables

### Issue: "Email not sending"

**Solution:**
- Enable Gmail App Password (not regular password)
- Check SMTP credentials
- Verify 2FA is enabled on Gmail account
- Test SMTP: `telnet smtp.gmail.com 587`

### Issue: "CORS Error"

**Solution:**
- Update FRONTEND_URL in `backend/.env`
- Restart backend server
- Clear browser cache

### Issue: "Database table doesn't exist"

**Solution:**
- Go to Supabase → SQL Editor
- Run `backend/database/schema.sql` again
- Verify all tables appear in Supabase dashboard

---

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| users | Store customer accounts & trial info |
| leads | Store form submissions |
| automations | Store assigned AI workflows |
| automation_logs | Track automation usage |
| subscriptions | Track payments (future) |
| demo_data | Sample data for trial users |

---

## 🎯 Key Features

### 1. Automatic Trial Activation
- Users get 7-day free trial on first contact
- Automations are auto-assigned based on their interest
- Demo data is generated for testing
- Welcome email is sent automatically

### 2. Email Notifications
- Welcome email with trial details
- Trial expiry email with discount offer
- Auto-triggered when specific events occur

### 3. Auto-Assignment Logic
Based on service interest, automations are auto-assigned:

| Interest | Automation |
|----------|-----------|
| website | AI Website Chatbot |
| automation | Business Automation |
| chatbot | WhatsApp Chatbot |
| voice | AI Voice Agent |
| instagram | Instagram Growth |

### 4. Demo Data
Each trial user gets sample data:
- Sample conversations / messages
- Sample analytics
- Sample performance metrics

### 5. Cron Jobs
- **Daily at midnight**: Check for expired trials and update status

---

## 🚀 Deployment

### Deploy Frontend (Vercel)

```bash
npm install -g vercel
cd frontend
vercel
```

### Deploy Backend (Render.com)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

### Deploy Backend (Railway.app)

```bash
npm install -g @railway/cli
railway login
railway init
railway variables set SUPABASE_URL=... SUPABASE_SERVICE_KEY=...
railway up
```

---

## 📞 Support Resources

- **Backend Docs**: See [backend/README.md](backend/README.md)
- **Supabase**: https://supabase.com/docs
- **Express**: https://expressjs.com
- **React**: https://react.dev

---

## ✅ Setup Checklist

```
Frontend:
☐ npm install (in project root)
☐ npm run dev (verify frontend loads)
☐ Check contact form displays correctly

Supabase:
☐ Create Supabase project
☐ Copy credentials to backend/.env
☐ Run schema.sql in SQL Editor
☐ Verify tables created in dashboard

Backend:
☐ cd backend && npm install
☐ Copy .env.example to .env
☐ Configure SUPABASE_URL and SUPABASE_SERVICE_KEY
☐ Configure FRONTEND_URL=http://localhost:5173
☐ npm run dev (verify server starts)
☐ Check http://localhost:5000/api/health

Email (Optional):
☐ Generate Gmail App Password
☐ Add SMTP credentials to .env
☐ Restart backend

Integration:
☐ Fill contact form in frontend
☐ Verify form submission works
☐ Check terminal for success messages
☐ Check email for welcome message (if SMTP enabled)

Production:
☐ Update FRONTEND_URL to production URL
☐ Deploy backend to Render/Railway
☐ Deploy frontend to Vercel
☐ Update APIs to use production URL
☐ Test complete flow
```

---

## 🎓 Learning Path

1. **Understand the Flow**
   - Read the workflow diagram above
   - Check Contact page code

2. **Backend Architecture**
   - Controllers handle business logic
   - Routes define API endpoints
   - Utils handle external services (email, n8n)
   - Middleware validates inputs

3. **Database Design**
   - User table = customers
   - Leads table = inquiries
   - Automations table = assigned workflows
   - See schema.sql for complete structure

4. **Extend & Customize**
   - Add new fields to forms
   - Modify auto-assignment logic
   - Add more email templates
   - Create new API endpoints

---

## 📝 License

MIT - Feel free to use and modify!

---

## 🎉 You're All Set!

Your complete SaaS platform is ready. Start with the Quick Start guide above, and you'll have everything running in 5 minutes!

**Need help?** Check:
- `backend/README.md` for API documentation
- Browser console for frontend errors
- Backend terminal for server errors
- Supabase dashboard for data verification

**Happy building! 🚀**
