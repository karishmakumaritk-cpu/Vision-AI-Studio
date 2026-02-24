const router = require('express').Router();
const c = require('../controllers/automation.controller');
const a = require('../middleware/authenticate');

router.post('/request', c.submitAutomationRequest);
router.get('/my-requests', a, c.getMyRequests);

module.exports = router;
