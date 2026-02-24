const express = require('express');
const router = express.Router();
const c = require('../controllers/payments.controller');
const a = require('../middleware/authenticate');

router.post('/stripe/checkout', a, c.createStripeCheckout);
router.post('/razorpay/order', a, c.createRazorpayOrder);
router.post('/razorpay/verify', a, c.verifyRazorpayPayment);
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), c.stripeWebhook);

module.exports = router;
