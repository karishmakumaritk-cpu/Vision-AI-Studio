# 📊 Architecture & System Design

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    HerBalance AI Studio Platform               │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│   Frontend        │       │    Backend        │       │    Database      │
│   (React/Vite)    │◄────►│  (Node/Express)   │◄────►│   (Supabase)     │
│                   │       │                  │       │                  │
│ • Contact Form    │       │ • Lead API        │       │ • Users          │
│ • Home Page       │       │ • Trial API       │       │ • Leads          │
│ • Services        │       │ • Automation API  │       │ • Automations    │
│ • Products        │       │ • Validation      │       │ • Logs           │
│ • Dashboard       │       │ • Email Service   │       │ • Demo Data      │
│                   │       │ • n8n Webhooks    │       │                  │
└──────────────────┘       └──────────────────┘       └──────────────────┘
     :5173                        :5000                   Supabase Cloud
```

---

## Data Flow Diagram

### Lead Creation Flow

```
User fills Contact Form
         │
         ▼
Form Validation (Frontend)
         │
         ▼
POST /api/leads/create
         │
         ▼
Backend Validation (Joi)
         │
         ▼
┌─────────────────────────────────┐
│ Check if User Already Exists?   │
└─────────────────────────────────┘
         │
    ┌────┴───────┐
    │             │
   No            Yes
    │             │
    ▼             ▼
Create User   Get User ID
  + Trial
    │             │
    │    ┌────────┘
    │    │
    ▼    ▼
Create Lead Entry
         │
         ▼
Auto-assign Automation
         │
         ▼
Generate Demo Data
         │
         ▼
Send Welcome Email
         │
         ▼
Trigger n8n Workflow
         │
         ▼
Return Success Response
         │
         ▼
Update UI + Reset Form
```

---

## API Architecture

```
┌────────────────────────────────────────────┐
│              Express Server                │
├────────────────────────────────────────────┤
│           Routes (37 endpoints)            │
├────────────────────────────────────────────┤
│  /api/leads      /api/trials   /api/auto  │
├────────────────────────────────────────────┤
│         Controllers (Business Logic)       │
├────────────────────────────────────────────┤
│ Lead Controller │ Trial Controller | Auto  │
├────────────────────────────────────────────┤
│           Middleware (Validation)          │
├────────────────────────────────────────────┤
│  Joi Validation │ Error Handling │ CORS   │
├────────────────────────────────────────────┤
│            Utils (External Services)       │
├────────────────────────────────────────────┤
│  Email Service  │  n8n Webhooks │ DB Conn │
├────────────────────────────────────────────┤
│         Supabase PostgreSQL                │
└────────────────────────────────────────────┘
```

---

## Database Schema Relationships

```
┌─────────────────────┐
│       users         │
│─────────────────────│
│ id (PK)             │
│ email (UNIQUE)      │
│ name                │
│ plan                │
│ trial_start         │
│ trial_end           │
│ status              │
└─────────────────────┘
       │ 1:M
       │
       ├──────┬──────────┬──────────┐
       │      │          │          │
       ▼      ▼          ▼          ▼
    ┌──────┐ ┌──┐ ┌──────┐ ┌──────┐
    │leads │ │..│ │auto. │ │demo_ │
    └──────┘ └──┘ └──────┘ └──────┘
```

### Table Relationships

| Parent | Child | Relation | Cascade Delete |
|--------|-------|----------|-----------------|
| users | leads | 1:M | ✅ Yes |
| users | automations | 1:M | ✅ Yes |
| users | automation_logs | 1:M | ✅ Yes |
| users | subscriptions | 1:M | ✅ Yes |
| users | demo_data | 1:M | ✅ Yes |
| automations | automation_logs | 1:M | ✅ Yes |

---

## Authentication & Security

```
┌─────────────────────────────────────────────┐
│           Security Layers                   │
├─────────────────────────────────────────────┤
│  1. Input Validation (Joi)                  │
│     - Type checking                         │
│     - Length validation                     │
│     - Format validation                     │
├─────────────────────────────────────────────┤
│  2. CORS Protection                         │
│     - Whitelist allowed origins             │
│     - Only specific domains allowed         │
├─────────────────────────────────────────────┤
│  3. Email Validation                        │
│     - RFC 5321 standards                    │
│     - Duplicate prevention                  │
├─────────────────────────────────────────────┤
│  4. SQL Injection Prevention                │
│     - Parameterized queries                 │
│     - Supabase RLS (future)                 │
├─────────────────────────────────────────────┤
│  5. Rate Limiting (future)                  │
│     - Prevent brute force                   │
│     - API throttling                        │
├─────────────────────────────────────────────┤
│  6. TLS/SSL (Production)                    │
│     - HTTPS everywhere                      │
│     - Auto-renewal certificates             │
└─────────────────────────────────────────────┘
```

---

## Automation Assignment Logic

```
Service Interest Input
         │
    ┌────┼────┬─────┬─────┬──────────┐
    │    │    │     │     │          │
   web auto chat voice ig   custom
    │    │    │     │     │          │
    ▼    ▼    ▼     ▼     ▼          ▼
  AI_   Bus  WA_   AI_   INST_   CUSTOM_
  WEB   AUTO CHAT  VOICE AUTO    AUTO
    │    │    │     │     │          │
    └────┼────┼─────┼─────┼──────────┘
         │
         ▼
Auto-Create Automation Record
         │
         ├─→ Set usage_limit to 50
         ├─→ Set status to "active"
         ├─→ Set demo_mode to true
         │
         ▼
Generate Sample Data
         │
         └─→ Based on automation_type
```

---

## Email Notification Flows

### Flow 1: Welcome Email (On Lead Creation)

```
New Lead Created
         │
         ▼
Check if New User
    │
    ├─ Yes: Create nodemailer transport
    │       │
    │       ▼
    │   Build HTML email template
    │       │
    │       ├─ Welcome message
    │       ├─ Trial duration (7 days)
    │       ├─ Feature list
    │       ├─ Dashboard link
    │       └─ CTA button
    │       │
    │       ▼
    │   Send via SMTP
    │       │
    │       ▼
    │   Log success/error
    │
    └─ No: Continue without email
```

### Flow 2: Trial Expiry Email (Cron Job 00:00)

```
Daily Cron Job Triggered
         │
         ▼
Query users WHERE
   - plan = 'free_trial'
   - trial_end < NOW()
   - status = 'active'
         │
         ▼
For Each Expired User:
   │
   ├─ Update status → 'trial_expired'
   ├─ Pause all automations
   ├─ Send expiry email
   │  - Special offer (20% discount)
   │  - Upgrade CTA
   │  - Thank you message
   │
   └─ Log action
```

---

## Scalability & Performance

### Current Architecture Limits
- **Users**: ~1,000 concurrent
- **Requests/Second**: ~100 RPS
- **Database**: 500MB (free tier)
- **Storage**: 1GB (free tier)

### Optimization Strategies

#### Level 1: Code Optimization
- ✅ Connection pooling (built-in Supabase)
- ✅ Async/await for non-blocking I/O
- ✅ Index on frequently queried fields
- ✅ Pagination for large datasets

#### Level 2: Infrastructure Scaling
- Scale backend: Add more Render replicas
- Scale database: Upgrade Supabase plan
- CDN: Vercel provides Cloudflare CDN

#### Level 3: Advanced Optimizations
- Redis caching (future)
- Message queues for emails (future)
- Database read replicas (future)
- Monitoring & alerting (future)

---

## Error Handling

```
Request
   │
   ├─→ Try Block
   │     │
   │     ├─ Validation passes? ✓
   │     │
   │     ├─ Supabase query succeeds? ✓
   │     │
   │     └─ Email sends? (non-critical)
   │
   └─→ Catch Block
         │
         ├─ Log error to console
         │
         ├─ Build error response
         │
         └─ Return JSON error
             {
               "success": false,
               "error": "User-friendly message",
               "message": "Detailed error"
             }
```

---

## Deployment Architecture

### Development
```
localhost:3000 / 5173  ←→  localhost:5000  ←→  Supabase Cloud
```

### Production
```
Vercel / Netlify  ←→  Render / Railway  ←→  Supabase Cloud
https://frontend     https://backend       Production DB
```

---

## Monitoring & Observability

```
Frontend
├─ Browser Console Errors
├─ Network Tab (API calls)
├─ Vercel Analytics
└─ Error Boundaries (React)

Backend
├─ Console Logs
├─ Render/Railway Logs
├─ Error Stack Traces
└─ Request/Response Timing

Database
├─ Supabase Query Logs
├─ Table Row Counts
├─ Storage Usage
└─ Active Connections
```

---

## Security Best Practices

### ✅ Implemented
- Input validation with Joi
- CORS protection
- Parameterized database queries
- Error messages (non-revealing)
- Environment variables for secrets

### 🔄 In Development
- JWT authentication (future)
- Rate limiting
- Request signing
- Audit logs

### 📋 Environment Separation
```
Development
├─ localhost URLs
├─ Demo/test data
└─ Lenient validation

Production
├─ HTTPS URLs
├─ Real data
├─ Strict validation
└─ Error logging
```

---

## Future Architecture Enhancements

### Phase 2: Advanced Features
- ✨ User authentication (JWT + OAuth)
- ✨ Payment gateway integration (Razorpay)
- ✨ Dashboard for users
- ✨ Admin panel
- ✨ Real-time notifications (WebSockets)

### Phase 3: Scalability
- 📈 Redis caching layer
- 📈 Message queues (Bull/BullMQ)
- 📈 Database read replicas
- 📈 Load balancing
- 📈 CDN integration

### Phase 4: Enterprise Features
- 🏢 Multi-tenancy support
- 🏢 Advanced analytics
- 🏢 Custom integrations
- 🏢 SLA support
- 🏢 Compliance (GDPR, SOC 2)

---

## Cost Breakdown (Annual)

| Component | Free | Starter | Professional |
|-----------|------|---------|--------------|
| **Vercel Frontend** | $0 | $20 | $150+ |
| **Render Backend** | $0* | $96 | $500+ |
| **Supabase Database** | $0 | $480 | $1500+ |
| **Gmail SMTP** | $0 | $0 | $0 |
| **Domain** | - | $12 | $12 |
| **Total/Year** | **$0** | **$608** | **$2162+** |

*Free tier auto-sleeps after inactivity

---

## Conclusion

This architecture is designed for:
- ✅ **Simplicity**: Easy to understand & modify
- ✅ **Scalability**: Grows with your business
- ✅ **Cost-Efficiency**: Start free, scale intelligently
- ✅ **Maintainability**: Clean, documented code
- ✅ **Security**: Best practices implemented

Perfect for startups & MVPs! 🚀
