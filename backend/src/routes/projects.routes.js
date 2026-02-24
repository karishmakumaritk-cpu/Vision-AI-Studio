const router = require('express').Router();
const c = require('../controllers/projects.controller');
const a = require('../middleware/authenticate');

router.get('/', a, c.getMyProjects);

module.exports = router;
