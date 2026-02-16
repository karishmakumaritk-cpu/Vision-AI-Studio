const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const leadRoutes = require('./routes/leads');
const trialRoutes = require('./routes/trials');
const automationRoutes = require('./routes/automation');

// API Routes
app.use('/api/leads', leadRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/automation', automationRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'HerBalance AI Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Cron Jobs
// Check trial expiry every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running trial expiry check...');
  const trialController = require('./controllers/trialController');
  try {
    await trialController.checkExpiredTrials();
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});

module.exports = app;
