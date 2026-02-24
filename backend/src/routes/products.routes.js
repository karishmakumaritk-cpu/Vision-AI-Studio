const router = require('express').Router();
const c = require('../controllers/products.controller');
const a = require('../middleware/authenticate');

router.get('/', c.getAllProducts);
router.get('/my-products', a, c.getUserProducts);
router.post('/activate', a, c.activateProduct);
router.delete('/:user_product_id', a, c.deactivateProduct);

module.exports = router;
