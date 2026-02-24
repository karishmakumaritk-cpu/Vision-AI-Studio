const router = require('express').Router();
const c = require('../controllers/ai.controller');

router.post('/chat', c.chat);

module.exports = router;
