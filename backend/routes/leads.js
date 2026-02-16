const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { validateLead } = require('../middleware/validation');

// Create new lead (from contact form)
router.post('/create', validateLead, leadController.createLead);

// Get all leads (admin)
router.get('/', leadController.getAllLeads);

// Get lead by ID
router.get('/:id', leadController.getLeadById);

// Update lead status
router.patch('/:id/status', leadController.updateLeadStatus);

module.exports = router;
