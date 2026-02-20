const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.post('/api/payments/stripe/webhook', express.raw({ type: 'application/json' }), require('./controllers/payments.controller').stripeWebhook);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/workflows', require('./routes/workflows.routes'));
app.use('/api/payments', require('./routes/payments.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.get('/api/health', (_req, res) => res.json({ status: 'OK', environment: process.env.NODE_ENV || 'development', timestamp: new Date().toISOString() }));
app.get('/', (_req, res) => res.json({ service: 'Vision AI Studio API', version: '1.0.0', status: 'running' }));

app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found', path: req.path }));
app.use((err, _req, res, _next) => res.status(err.status || 500).json({ success: false, error: err.message || 'Internal server error' }));

cron.schedule('0 * * * *', async () => {
  const { checkTrialExpirations } = require('./services/workflow.engine');
  await checkTrialExpirations();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Vision AI backend running on ${PORT}`));

module.exports = app;
