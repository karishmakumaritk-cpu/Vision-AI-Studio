const router = require('express').Router();
const c = require('../controllers/auth.controller');
const a = require('../middleware/authenticate');
const { signupValidation, loginValidation } = require('../middleware/validateInput');

router.post('/signup', signupValidation, c.signup);
// Alias for /api/auth/register used by the frontend
router.post('/register', signupValidation, c.signup);
router.post('/login', loginValidation, c.login);
router.get('/me', a, c.me);
router.post('/refresh', c.refreshToken);

module.exports = router;
