const router = require('express').Router();
const c = require('../controllers/auth.controller');
const auth = require('../middleware/authenticate');
const { signupValidation, loginValidation } = require('../middleware/validateInput');

router.post('/signup', signupValidation, c.signup);
router.post('/login', loginValidation, c.login);
router.get('/me', auth, c.me);
router.post('/refresh', c.refreshToken);

module.exports = router;
