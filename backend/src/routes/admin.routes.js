const router = require('express').Router();
const c = require('../controllers/admin.controller');
const a = require('../middleware/authenticate');
const r = require('../middleware/checkRole');

router.use(a, r(['admin']));
router.get('/users', c.getAllUsers);
router.get('/revenue', c.getRevenueAnalytics);
router.patch('/subscription/toggle', c.toggleUserSubscription);

module.exports = router;
