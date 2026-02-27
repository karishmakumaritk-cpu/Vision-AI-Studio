const router = require('express').Router();
const c = require('../controllers/ai.controller');

router.post('/chat', c.chat);
router.post('/generate', c.generate);

module.exports = router;
