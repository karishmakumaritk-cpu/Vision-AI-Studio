const express = require('express');
const router = express.Router();
const trialController = require('../controllers/trialController');

// Get trial status for a user
router.get('/status/:userId', trialController.getTrialStatus);

// Get all users (admin)
router.get('/', trialController.getAllUsers);

module.exports = router;
