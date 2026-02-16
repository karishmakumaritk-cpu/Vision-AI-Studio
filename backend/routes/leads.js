const express = require('express');
const router = express.Router();

// Check if controller exists
let leadController;
try {
  leadController = require('../controllers/leadController');
  console.log('✅ Lead controller loaded');
} catch (error) {
  console.error('⚠️ Lead controller not found, using fallback');

  // Fallback controller
  leadController = {
    createLead: (req, res) => {
      res.status(201).json({
        success: true,
        message: 'Lead created (fallback)',
        data: req.body
      });
    },
    getAllLeads: (req, res) => {
      res.json({
        success: true,
        count: 0,
        data: []
      });
    }
  };
}

// Validation middleware (simple version)
const validateLead = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      required: ['name', 'email', 'message']
    });
  }

  next();
};

// Routes
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: '✅ Lead routes are working!',
    timestamp: new Date().toISOString()
  });
});

router.post('/create', validateLead, leadController.createLead);

router.get('/', leadController.getAllLeads);

module.exports = router;
