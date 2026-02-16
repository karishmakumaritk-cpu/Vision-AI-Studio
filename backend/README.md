# HerBalance AI Backend Setup Guide

## 📋 Project Overview

This is the backend API for HerBalance AI - a SaaS platform for AI-powered automation. It handles:
- Lead capture from contact forms
- Automatic 7-day trial activation
- User management
- Automation workflow orchestration
- Email notifications

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here

# n8n Configuration (Optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
N8N_API_KEY=your_n8n_api_key

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_change_this

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# App Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Supabase Database

1. Go to [Supabase Console](https://app.supabase.com)
2. Create a new project
3. Copy the project URL and API keys to `.env`
4. Go to SQL Editor and run the contents of `database/schema.sql`

### 4. Start the Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

---

## 📡 API Endpoints

### Leads Management

#### Create Lead (Contact Form)
```http
POST /api/leads/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "business_type": "E-commerce",
  "service_interest": "chatbot",
  "message": "I'm interested in AI chatbots for my business"
}
```

**Response:**
```json
{
  "success": true,
  "message": "🎉 Welcome! Check your email for trial access details.",
  "data": {
    "lead_id": "uuid",
    "user_id": "uuid",
    "trial_ends": "2026-02-21T...",
    "is_new_user": true
  }
}
```

#### Get All Leads (Admin)
```http
GET /api/leads
```

#### Get Lead by ID
```http
GET /api/leads/:id
```

#### Update Lead Status
```http
PATCH /api/leads/:id/status
Content-Type: application/json

{
  "status": "contacted"
}
```

Valid statuses: `new`, `contacted`, `demo_sent`, `converted`, `lost`

---

### Trial Management

#### Get Trial Status
```http
GET /api/trials/status/:userId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "active",
    "plan": "free_trial",
    "trial_end": "2026-02-21T...",
    "days_remaining": 7,
    "is_expired": false
  }
}
```

#### Get All Users (Admin)
```http
GET /api/trials
```

---

### Automation Management

#### Get User Automations
```http
GET /api/automation/user/:userId
```

#### Get Automation by ID
```http
GET /api/automation/:id
```

#### Update Automation Status
```http
PATCH /api/automation/:id/status
Content-Type: application/json

{
  "status": "paused"
}
```

Valid statuses: `active`, `paused`, `stopped`

#### Get Automation Logs
```http
GET /api/automation/:automationId/logs?limit=50&offset=0
```

#### Log Automation Action
```http
POST /api/automation/:automationId/log
Content-Type: application/json

{
  "userId": "uuid",
  "actionType": "message_sent",
  "details": {
    "recipient": "user@example.com",
    "message": "Hello!"
  }
}
```

#### Get Demo Data
```http
GET /api/automation/demo/:userId
```

---

### Health Check

```http
GET /api/health
```

---

## 🗄️ Database Setup

### Supabase Credentials Location
- **URL**: Supabase Dashboard → Project Settings → API
- **Anon Key**: For client-side operations
- **Service Key**: For server-side operations (use this in backend)

### Email Setup (Gmail)

1. Go to [Google Account](https://myaccount.google.com)
2. Enable 2-Factor Authentication
3. Create App Password (16-character password)
4. Use this as `SMTP_PASS` in `.env`

### Payment Gateway Setup (Razorpay)

1. Create account at [Razorpay](https://razorpay.com)
2. Get API keys from Dashboard
3. Add to `.env` file

---

## 🔄 Cron Jobs

The backend automatically runs scheduled tasks:

- **Daily at Midnight**: Check for expired trials and update user status
  - Updates user status to `trial_expired`
  - Pauses all automations
  - Sends trial expiry email

---

## 🔗 Frontend Integration

### Contact Form API Call

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch(
      'http://localhost:5000/api/leads/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          business_type,
          service_interest,
          message
        }),
      }
    );

    const data = await response.json();
    
    if (data.success) {
      alert('🎉 Check your email for trial access!');
      // Reset form
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 📊 Auto-Assignment Logic

When a lead is created, an automation is automatically assigned based on `service_interest`:

| Service | Automation Type |
|---------|-----------------|
| website | ai_website_chatbot |
| automation | business_automation |
| chatbot | whatsapp_chatbot |
| voice | ai_voice_agent |
| instagram | instagram_automation |

---

## 🧪 Testing

### Test the API

Using cURL:
```bash
curl -X POST http://localhost:5000/api/leads/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "business_type": "Technology",
    "service_interest": "chatbot",
    "message": "Testing the API"
  }'
```

### Health Check

```bash
curl http://localhost:5000/api/health
```

---

## 🚀 Deployment

### Deploy to Render.com

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Set environment variables
6. Deploy!

### Deploy to Railway.app

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add environment: `railway variables set ...`
5. Deploy: `railway up`

### Deploy to Vercel (Serverless)

```bash
npm install -g vercel
vercel
```

---

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- Check `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in `.env`
- Ensure your IP is whitelisted in Supabase
- Test with: `curl https://your-url.supabase.co/rest/v1/users?limit=1`

### "Email not sending"
- Enable 2FA on Gmail account
- Create App Password (not regular password)
- Check SMTP credentials in `.env`
- Test with: `telnet smtp.gmail.com 587`

### "n8n webhook not working"
- Check `N8N_WEBHOOK_URL` is correct
- Ensure n8n instance is running
- Check n8n logs for webhook errors

### "CORS errors"
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Ensure backend CORS middleware is enabled

---

## 📚 File Structure

```
backend/
├── server.js              # Main server entry point
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── config/
│   └── db.js             # Supabase database connection
├── routes/
│   ├── leads.js          # Lead management routes
│   ├── trials.js         # Trial management routes
│   └── automation.js     # Automation routes
├── controllers/
│   ├── leadController.js
│   ├── trialController.js
│   └── automationController.js
├── middleware/
│   └── validation.js     # Input validation
├── utils/
│   ├── email.js          # Email service
│   └── n8n.js            # n8n workflow integration
└── database/
    └── schema.sql        # Database schema
```

---

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Express.js Docs**: https://expressjs.com
- **n8n Docs**: https://docs.n8n.io
- **Nodemailer**: https://nodemailer.com/about/

---

## 📝 License

MIT
