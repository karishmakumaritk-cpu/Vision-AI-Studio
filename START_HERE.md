# 🎯 START HERE - HerBalance AI Studio Complete Guide

Welcome to **HerBalance AI Studio** - a complete SaaS automation platform!

This file will guide you through everything. **Read in this order:**

---

## 📍 Current Status

✅ **Frontend**: React.js website (already built)
✅ **Backend**: Node.js/Express API (✨ newly created)
✅ **Database**: Supabase PostgreSQL schema (ready to use)
✅ **Integration**: Contact form → Lead capture → Trial activation

---

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Install & Run Frontend

```bash
# In project root
npm install
npm run dev
```

Open: https://localhost:5173

### 2️⃣ Install & Run Backend

```bash
# In new terminal
cd backend
npm install
npm run dev
```

Runs on: http://localhost:5000

### 3️⃣ Setup Supabase (Database)

1. Go to https://app.supabase.com → Create Project
2. Copy credentials to `backend/.env`
3. Go to **SQL Editor** → **New Query**
4. Paste entire content from `backend/database/schema.sql`
5. Click **Run**

### 4️⃣ Test the System

1. Go to http://localhost:5173/contact
2. Fill the contact form
3. Click "Send Message"
4. Should see ✅ success message
5. Check `backend/` console for logs

**That's it! You have a working SaaS platform.** 🎉

---

## 📚 Complete Documentation

Read these files **in order** to understand everything:

### Level 1: Getting Started (Start Here)
1. **[README.md](./README.md)** - Project overview
2. **[SETUP.md](./SETUP.md)** - Step-by-step setup guide
3. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Commands & troubleshooting

### Level 2: Understanding the System
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & data flow
5. **[backend/README.md](./backend/README.md)** - API documentation

### Level 3: Going to Production
6. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
7. **[backend/database/schema.sql](./backend/database/schema.sql)** - Database reference

---

## 🗂️ File Organization

```
HerBalance-AI-Studio/
│
├── 📄 START_HERE.md (This file)
├── 📄 SETUP.md (Setup guide)
├── 📄 QUICK_REFERENCE.md (Commands)
├── 📄 ARCHITECTURE.md (Design)
├── 📄 DEPLOYMENT.md (Production)
├── 📄 setup.sh (Auto-setup script)
│
├── 🎨 src/ (Frontend React code)
│   ├── pages/Contact.jsx ⭐ (Form → API integration)
│   ├── components/
│   └── styles/
│
├── 🔧 backend/ (Backend API)
│   ├── server.js (Main entry)
│   ├── .env.example (Configuration)
│   ├── README.md (API docs)
│   ├── routes/ (API endpoints)
│   ├── controllers/ (Business logic)
│   ├── middleware/ (Validation)
│   ├── utils/ (Email, n8n)
│   └── database/
│       └── schema.sql (Create tables)
│
├── package.json (Frontend config)
├── vite.config.js (Frontend build)
└── tailwind.config.js (Frontend styles)
```

---

## 🔄 How It Works (The Flow)

### 1. User Submits Contact Form
- Name, Email, Phone, Service, Message
- Location: http://localhost:5173/contact

### 2. Frontend Validates & Sends to Backend
```
POST http://localhost:5000/api/leads/create
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "service_interest": "chatbot",
  "message": "I need AI automation"
}
```

### 3. Backend Processes
- ✅ Validates input (Joi)
- ✅ Checks if user exists
- ✅ Creates user (if new) with 7-day trial
- ✅ Creates lead record
- ✅ Assigns automation (based on service)
- ✅ Generates demo data
- ✅ Sends welcome email
- ✅ Triggers n8n workflow (optional)
- ✅ Returns success response

### 4. User Gets Access
- 📧 Welcome email with trial details
- 🎯 Automation assigned automatically
- 📊 Demo data available in dashboard
- 🎉 Ready to explore!

---

## 🎯 Key Features

### ✨ Automatic Trial System
- 7-day free trial on first contact
- No payment required
- Auto-activates
- Expiry checked daily via cron job

### 🤖 Auto-Assignment
When user selects a service, automation is automatically assigned:

| Service | Automation |
|---------|-----------|
| Website | AI Website Chatbot |
| Automation | Business Automation |
| Chatbot | WhatsApp Chatbot |
| Voice | AI Voice Agent |
| Instagram | Instagram Growth |

### 📊 Demo Data
Each trial user gets sample data showing:
- Example conversations
- Sample analytics
- Performance metrics
- So they understand the power!

### 📧 Email Notifications
- Welcome email (on signup)
- Trial expiry day email (with discount)
- Auto-triggered at right times

---

## ⚙️ Configuration Guide

### Environment Variables (.env)

Edit `backend/.env` with these values:

```env
# Database (Get from Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ0eXAi... (from Project Settings)
SUPABASE_ANON_KEY=eyJ0eXAi... (from Project Settings)

# Email (Get from Gmail)
SMTP_USER=your_email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx (16-char app password)

# Frontend URL (where your React app runs)
FRONTEND_URL=http://localhost:5173

# Other Settings
PORT=5000
NODE_ENV=development
```

### Getting Credentials

**Supabase:**
1. Go to app.supabase.com
2. Create project
3. Settings → API → Copy credentials

**Gmail SMTP:**
1. Go to myaccount.google.com
2. Security → Enable 2FA
3. App passwords → Mail → Windows → Generate
4. Use 16-character password

---

## 🧪 Testing Checklist

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend runs at http://localhost:5000
- [ ] Contact form displays correctly
- [ ] Can submit form without errors
- [ ] Success message appears
- [ ] No red errors in browser console
- [ ] Backend console shows log messages
- [ ] New lead appears in Supabase dashboard
- [ ] Email received (if SMTP configured)

---

## 🐛 Quick Troubleshooting

### "Backend not responding"
```bash
# Check if running
curl http://localhost:5000/api/health

# Port might be in use
lsof -i :5000
```

### "Cannot find module"
```bash
# Install dependencies
cd backend
npm install
```

### "Supabase connection failed"
- Check SUPABASE_URL is correct
- Verify SUPABASE_SERVICE_KEY exists
- Confirm tables are created in dashboard

### "Email issues"
- Use Gmail App Password (not regular password)
- Verify SMTP credentials
- Check 2FA is enabled on Gmail

**More help:** See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## 🚀 What's Next?

### Immediate (Next 1 Hour)
1. ✅ Run the Quick Start above
2. ✅ Test the complete flow
3. ✅ Verify data in Supabase

### Short Term (Next 1 Day)
1. Setup email (optional)
2. Customize welcome email templates
3. Test auto-assignments for different services
4. Generate test data

### Medium Term (Next 1 Week)
1. Deploy backend to Render/Railway
2. Deploy frontend to Vercel
3. Connect production database
4. Setup custom domain
5. Monitor & optimize

### Long Term (Next 1 Month+)
1. Add user dashboard
2. Integrate payment system
3. Add authentication
4. Setup n8n workflows
5. Scale infrastructure

---

## 📊 API Quick Reference

### Create Lead
```bash
curl -X POST http://localhost:5000/api/leads/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "service_interest": "chatbot",
    "message": "Help me automate"
  }'
```

### Get All Leads
```bash
curl http://localhost:5000/api/leads
```

### Check Trial Status
```bash
curl http://localhost:5000/api/trials/status/{USER_ID}
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

See [backend/README.md](./backend/README.md) for complete API docs.

---

## 📁 Important Files to Know

| File | Purpose | Action |
|------|---------|--------|
| `src/pages/Contact.jsx` | Contact form | ✅ Auto-integrated to API |
| `backend/server.js` | Main backend | 🔧 Can modify routes |
| `backend/.env.example` | Config template | 📋 Copy to .env & fill |
| `backend/database/schema.sql` | Database setup | 💾 Run in Supabase SQL |
| `backend/controllers/leadController.js` | Lead logic | 🧠 Business logic here |
| `backend/utils/email.js` | Email sending | 📧 Customize templates |

---

## 🎓 Learning Resources

### Understanding the Code
- **Backend Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Details**: See [backend/README.md](./backend/README.md)
- **Database Schema**: See `backend/database/schema.sql`

### External Resources
- **Express.js**: https://expressjs.com
- **Node.js**: https://nodejs.org/docs
- **Supabase**: https://supabase.com/docs
- **React**: https://react.dev

---

## 💡 Pro Tips

1. **Use Chrome DevTools Console**
   - See network requests
   - Debug JavaScript
   - Check API responses

2. **Check Backend Logs**
   - See what's happening
   - Debug API issues
   - Troubleshoot integrations

3. **Use Supabase Dashboard**
   - Verify data is saved
   - Check table contents
   - Monitor query performance

4. **Test with Multiple Emails**
   - Each email = one user
   - Check trial assignment logic
   - Verify automation creation

5. **Read Error Messages**
   - They're helpful!
   - Usually point to the problem
   - Check both frontend & backend

---

## ❓ FAQ

**Q: Do I need to install anything else?**
A: Just Node.js (npm comes with it). Supabase is cloud, no installation needed.

**Q: Can I run without email?**
A: Yes! Email is optional. Remove SMTP_USER/SMTP_PASS from .env if not using.

**Q: How do I change the 7-day trial duration?**
A: Edit `backend/controllers/leadController.js`, line ~25, change `setDate` value.

**Q: Can I use MySQL instead of Supabase?**
A: Yes, update `backend/config/db.js` and install mysql2 package.

**Q: Is this production-ready?**
A: Yes! See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy.

**Q: How do I add more services?**
A: Edit the automationMap in `backend/controllers/leadController.js`.

---

## 📞 Getting Help

1. **Error Messages**: Read them carefully, they help!
2. **Check Logs**: Backend console shows what's happening
3. **Browser DevTools**: Network tab shows API calls
4. **Supabase Dashboard**: Verify data is there
5. **Read Documentation**: Files in root folder

---

## ✅ Success Checklist

You'll know everything is working when:

- [ ] Contact form submits without errors
- [ ] Success message appears
- [ ] No errors in browser console
- [ ] Backend console shows logs
- [ ] New row appears in `users` table (Supabase)
- [ ] New row appears in `leads` table (Supabase)
- [ ] New row appears in `automations` table (Supabase)
- [ ] Email arrives in inbox (if SMTP set)

---

## 🎉 Conclusion

You now have a complete **SaaS platform** with:

✅ React frontend that captures leads
✅ Node.js backend that processes requests
✅ PostgreSQL database that stores everything
✅ Email notifications that inform users
✅ Automatic trial system that activates users
✅ Auto-assignment of workflows
✅ Demo data for trial users

**Everything is ready to grow your business!**

---

## 🔗 Quick Links

- [Complete Setup Guide](./SETUP.md)
- [API Documentation](./backend/README.md)
- [System Architecture](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Quick Commands](./QUICK_REFERENCE.md)

---

**Ready to get started? Go to [SETUP.md](./SETUP.md) now!** 🚀

*Happy building! 💪*
