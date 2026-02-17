const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { checkExpiredTrials } = require('./utils/trialChecker');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean),
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

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), message: 'Vision AI Studio Backend Running' });
});

app.get('/', (req, res) => {
  res.json({
    api: 'Vision AI Studio Backend',
    version: '1.0.0',
    endpoints: [
      'POST /api/auth/signup',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/workflows',
      'POST /api/workflows/create',
      'GET /api/subscriptions/status',
      'GET /api/usage/stats'
    ]
  });
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
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
