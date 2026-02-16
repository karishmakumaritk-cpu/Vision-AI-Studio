# 📚 Quick Reference Guide

## Starting the Project

### Terminal 1: Frontend
```bash
npm run dev
# Runs on: http://localhost:5173
```

### Terminal 2: Backend
```bash
cd backend
npm run dev
# Runs on: http://localhost:5000
```

---

## API Quick Reference

### Create Lead
```bash
curl -X POST http://localhost:5000/api/leads/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "service_interest": "chatbot",
    "message": "Help me automate my business"
  }'
```

### Check API Health
```bash
curl http://localhost:5000/api/health
```

---

## Common Issues & Solutions

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process using port 5000
kill -9 <PID>
```

### Supabase not connecting
- Verify SUPABASE_URL is correct format
- Check SUPABASE_SERVICE_KEY is valid
- Ensure tables are created in database

### Email not working
- Check SMTP credentials are correct
- Verify Gmail App Password (not regular password)
- Test with: `telnet smtp.gmail.com 587`

### Form not submitting
- Check browser DevTools Console for errors
- Verify backend is running on :5000
- Check FRONTEND_URL in backend/.env

---

## File Locations

| File | Location | Purpose |
|------|----------|---------|
| Contact Form | src/pages/Contact.jsx | User inquiry form |
| API Routes | backend/routes/ | Define API endpoints |
| Business Logic | backend/controllers/ | Handle form logic |
| Database Schema | backend/database/schema.sql | Create tables |
| Config | backend/.env | Store credentials |
| Email Templates | backend/utils/email.js | Send notifications |

---

## Environment Variables Cheatsheet

```env
# Database (Required)
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_KEY=eyJ0eXAi... (service_role key)

# Email (Optional)
SMTP_USER=your_email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx (16-char app password)

# Frontend
FRONTEND_URL=http://localhost:5173

# Other
PORT=5000
NODE_ENV=development
```

---

## Database Quick Commands

### View All Data
```sql
-- View users
SELECT * FROM users;

-- View leads
SELECT * FROM leads ORDER BY created_at DESC;

-- View automations
SELECT * FROM automations;

-- View logs
SELECT * FROM automation_logs ORDER BY created_at DESC;
```

### Troubleshooting Queries
```sql
-- Count new leads
SELECT COUNT(*) FROM leads WHERE status = 'new';

-- Find active trials
SELECT * FROM users WHERE status = 'active' AND plan = 'free_trial';

-- Check trial expiry
SELECT name, email, trial_end FROM users 
WHERE trial_end < NOW();
```

---

## Frontend Pages

- **Home** (`/`) - Landing page
- **Services** (`/services`) - Services overview
- **Products** (`/products`) - Product showcase
- **Contact** (`/contact`) - Contact form → Leads API

---

## Backend Structure

```
backend/
├── server.js              # Entry point
├── config/db.js           # Database connection
├── routes/                # API endpoints
├── controllers/           # Business logic
├── middleware/            # Validation
├── utils/                 # Helpers (email, n8n)
└── database/schema.sql    # Database creation
```

---

## Testing the Complete Flow

1. **Fill Contact Form** (http://localhost:5173/contact)
   - Name, Email, Phone, Service, Message

2. **Submit Form**
   - Frontend sends POST to /api/leads/create
   - Backend validates and processes

3. **Check Backend Console**
   - Should see success messages

4. **Check Email** (if SMTP configured)
   - Welcome email should arrive in 5 seconds

5. **Check Supabase Dashboard**
   - New user in `users` table
   - New lead in `leads` table
   - New automation in `automations` table
   - Demo data in `demo_data` table

---

## Useful Commands

```bash
# Node.js
npm install              # Install dependencies
npm run dev             # Start development server
npm start               # Start production server

# Database
psql -U user -d db      # Access PostgreSQL directly
ping supabase-url       # Test connection

# Git
git clone ...           # Clone repository
git add .               # Stage changes
git commit -m "msg"     # Commit changes
git push                # Push to GitHub

# Terminal
lsof -i :5000          # Find process on port 5000
kill -9 PID            # Kill process
ps aux | grep node     # Find all node processes
```

---

## Links & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Express.js**: https://expressjs.com
- **React**: https://react.dev
- **Nodemailer**: https://nodemailer.com
- **n8n**: https://docs.n8n.io
- **Tailwind**: https://tailwindcss.com

---

## Key Concepts

### Lead vs User
- **User**: Created on first contact, gets trial
- **Lead**: Inquiry/interest captured from contact form

### Auto-Assignment
- When lead is created, automation is assigned based on service_interest
- User gets access to demo data for that automation type

### Trial System
- 7-day free trial starts automatically
- Cron job checks expiry daily at midnight
- Status changes to "trial_expired" when time runs out

### Demo Data
- Sample conversations, messages, analytics
- Auto-generated when automation is assigned
- Shows trial users what automation can do

---

## Next Steps

1. ✅ Backend setup complete
2. ✅ Frontend integrated
3. Next: Deploy to production
   - Frontend: Vercel
   - Backend: Render or Railway
   - Database: Supabase (free tier ok)

---

## Need Help?

Check these files in order:
1. `SETUP.md` - Step-by-step setup guide
2. `backend/README.md` - Detailed API documentation
3. Console errors - Most helpful for debugging
4. Supabase dashboard - Verify data is being saved
