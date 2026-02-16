const express = require('express');
const router = express.Router();
const automationController = require('../controllers/automationController');

// Get user automations
router.get('/user/:userId', automationController.getUserAutomations);

// Get automation by ID
router.get('/:id', automationController.getAutomationById);

// Update automation status
router.patch('/:id/status', automationController.updateAutomationStatus);

// Get automation logs
router.get('/:automationId/logs', automationController.getAutomationLogs);

// Log automation action
router.post('/:automationId/log', automationController.logAutomationAction);

// Get demo data
router.get('/demo/:userId', automationController.getDemoData);

module.exports = router;
