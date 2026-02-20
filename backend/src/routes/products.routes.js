const router = require('express').Router();
const c = require('../controllers/products.controller');
const auth = require('../middleware/authenticate');

router.get('/', c.getAllProducts);
router.get('/my-products', auth, c.getUserProducts);
router.post('/activate', auth, c.activateProduct);
router.delete('/:user_product_id', auth, c.deactivateProduct);

module.exports = router;
