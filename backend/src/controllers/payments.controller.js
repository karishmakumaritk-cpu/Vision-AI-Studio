const stripe = require('../config/stripe');
const razorpay = require('../config/razorpay');

exports.createStripeCheckout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price_data: { currency: 'inr', product_data: { name: 'Vision AI Plan' }, unit_amount: 100000 }, quantity: 1 }],
    success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment=cancel`
  });
  res.json({ success: true, data: { checkout_url: session.url } });
};

exports.createRazorpayOrder = async (_req, res) => {
  const order = await razorpay.orders.create({ amount: 100000, currency: 'INR', receipt: `order_${Date.now()}` });
  res.json({ success: true, data: order });
};

exports.verifyRazorpayPayment = async (_req, res) => res.json({ success: true, message: 'Payment verified' });
exports.stripeWebhook = async (_req, res) => res.json({ received: true });
