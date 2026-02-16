const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// ==========================================
// CORS Configuration
// ==========================================
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://zany-bassoon-v6776prg4gjxh5x4-5173.app.github.dev',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);

    // Allow all origins for now (remove in production)
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ==========================================
// Middleware
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// ==========================================
// HEALTH CHECK (Before routes)
// ==========================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: '✅ HerBalance AI Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    storage: 'in-memory',
    port: process.env.PORT || 10000
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 HerBalance AI Backend API',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      health: '/api/health',
      createLead: 'POST /api/leads/create',
      getAllLeads: 'GET /api/leads',
      testLeads: 'GET /api/leads/test'
    }
  });
});

// ==========================================
// API ROUTES
// ==========================================

// Check if routes file exists
try {
  const leadRoutes = require('./routes/leads');
  app.use('/api/leads', leadRoutes);
  console.log('✅ Lead routes loaded');
} catch (error) {
  console.error('❌ Error loading lead routes:', error.message);

  // Fallback manual routes if file not found
  app.post('/api/leads/create', (req, res) => {
    console.log('Fallback route - lead creation');
    res.status(201).json({
      success: true,
      message: 'Lead received (fallback mode)',
      data: req.body
    });
  });

  app.get('/api/leads/test', (req, res) => {
    res.json({ success: true, message: 'Test route working!' });
  });
}

try {
  const trialRoutes = require('./routes/trials');
  app.use('/api/trials', trialRoutes);
  console.log('✅ Trial routes loaded');
} catch (error) {
  console.error('❌ Error loading trial routes:', error.message);
}

try {
  const automationRoutes = require('./routes/automation');
  app.use('/api/automation', automationRoutes);
  console.log('✅ Automation routes loaded');
} catch (error) {
  console.error('❌ Error loading automation routes:', error.message);
}

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 Handler - MUST BE AFTER ALL ROUTES
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method,
    message: `Cannot ${req.method} ${req.path}`,
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'POST /api/leads/create',
      'GET /api/leads',
      'GET /api/leads/test',
      'GET /api/trials',
      'GET /api/trials/status/:userId',
      'GET /api/automation/user/:userId',
      'GET /api/automation/demo/:userId',
      'GET /api/automation/:id'
    ]
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    path: req.path
  });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 HerBalance AI Backend Server Started!');
  console.log('='.repeat(60));
  console.log(`📍 Port:        ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log('📍 Storage:     In-Memory');
  console.log(`📍 CORS:        ${allowedOrigins.length} origins allowed`);
  console.log('='.repeat(60));
  console.log('Available Routes:');
  console.log('  GET  /');
  console.log('  GET  /api/health');
  console.log('  POST /api/leads/create');
  console.log('  GET  /api/leads');
  console.log('  GET  /api/leads/test');
  console.log('  GET  /api/trials');
  console.log('  GET  /api/trials/status/:userId');
  console.log('  GET  /api/automation/user/:userId');
  console.log('  GET  /api/automation/demo/:userId');
  console.log('  GET  /api/automation/:id');
  console.log('='.repeat(60) + '\n');
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;
