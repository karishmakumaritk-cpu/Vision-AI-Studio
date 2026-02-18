const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { checkExpiredTrials } = require('./utils/trialChecker');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  'https://vision-ai-studio.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/workflows', require('./routes/workflows'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/usage', require('./routes/usage'));
app.use('/api/payments', require('./routes/payments'));

const healthPayload = () => ({
  status: 'OK',
  timestamp: new Date().toISOString(),
  service: 'Vision AI Studio Backend',
  env: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || null,
  supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY),
  jwtConfigured: Boolean(process.env.JWT_SECRET)
});

app.get('/api/health', (req, res) => {
  res.json(healthPayload());
});

app.get('/health', (req, res) => {
  res.json(healthPayload());
});

app.get('/api', (req, res) => {
  res.json({
    api: 'Vision AI Studio Backend',
    version: '1.1.0',
    endpoints: [
      'GET /api/health',
      'POST /api/auth/signup',
      'POST /api/auth/login',
      'POST /api/auth/request-otp',
      'POST /api/auth/verify-otp',
      'POST /api/auth/google',
      'GET /api/auth/me',
      'GET /api/workflows',
      'POST /api/workflows/create',
      'GET /api/subscriptions/status',
      'GET /api/usage/stats'
    ]
  });
});

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

cron.schedule('0 * * * *', async () => {
  try {
    console.log('Running trial expiry check...');
    await checkExpiredTrials();
  } catch (error) {
    console.error('Trial checker cron failed:', error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'not-set'}`);
});

module.exports = app;
