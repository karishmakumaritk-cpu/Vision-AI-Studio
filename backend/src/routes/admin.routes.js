const router = require('express').Router();
const c = require('../controllers/admin.controller');
const auth = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');

router.use(auth, checkRole(['admin']));
router.get('/users', c.getAllUsers);
router.get('/revenue', c.getRevenueAnalytics);
router.patch('/subscription/toggle', c.toggleUserSubscription);

module.exports = router;
