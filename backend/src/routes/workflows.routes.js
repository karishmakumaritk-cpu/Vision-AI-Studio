const router = require('express').Router();
const c = require('../controllers/workflows.controller');
const a = require('../middleware/authenticate');
const s = require('../middleware/checkSubscription');

router.get('/', a, c.getUserWorkflows);
router.post('/:workflow_id/execute', a, s, c.executeWorkflow);
router.get('/:workflow_id/executions', a, c.getWorkflowExecutions);
router.patch('/:workflow_id/toggle', a, c.toggleWorkflow);
router.get('/usage-stats', a, c.getUsageStats);

module.exports = router;
