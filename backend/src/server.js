const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { checkTrialExpirations } = require('./services/workflow.engine');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean), credentials: true }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/workflows', require('./routes/workflows.routes'));
app.use('/api/payments', require('./routes/payments.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/ai', require('./routes/ai.routes'));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/automation', require('./routes/automation.routes'));

app.get('/api/health', (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));
app.get('/', (_req, res) => res.json({ service: 'Vision AI Studio API', status: 'running' }));

app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found', path: req.path }));
app.use((err, _req, res, _next) => res.status(err.status || 500).json({ success: false, error: err.message || 'Internal server error' }));

cron.schedule('0 * * * *', async () => { await checkTrialExpirations(); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Vision AI backend running on :${PORT}`));

module.exports = app;
