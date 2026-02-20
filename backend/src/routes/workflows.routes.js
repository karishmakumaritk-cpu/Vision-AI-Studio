const router = require('express').Router();
const c = require('../controllers/workflows.controller');
const auth = require('../middleware/authenticate');
const checkSubscription = require('../middleware/checkSubscription');

router.get('/', auth, c.getUserWorkflows);
router.post('/:workflow_id/execute', auth, checkSubscription, c.executeWorkflow);
router.get('/:workflow_id/executions', auth, c.getWorkflowExecutions);
router.patch('/:workflow_id/toggle', auth, c.toggleWorkflow);
router.get('/usage-stats', auth, c.getUsageStats);

module.exports = router;
