const supabase = require('../config/supabase');
const stripe = require('../config/stripe');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

exports.createStripeCheckout = async (req, res) => {
  const { product_id, user_product_id } = req.body;
  const { data: product } = await supabase.from('products').select('*').eq('id', product_id).single();
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: product.name }, unit_amount: Math.round(product.price * 100 / 80), ...(product.billing_type === 'monthly' ? { recurring: { interval: 'month' } } : {}) }, quantity: 1 }],
    mode: product.billing_type === 'monthly' ? 'subscription' : 'payment',
    success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment=cancelled`,
    metadata: { user_id: req.user.userId, product_id, user_product_id }
  });
  res.json({ success: true, data: { checkout_url: session.url } });
};

exports.createRazorpayOrder = async (req, res) => {
  const { product_id, user_product_id } = req.body;
  const { data: product } = await supabase.from('products').select('*').eq('id', product_id).single();
  const order = await razorpay.orders.create({ amount: Math.round(product.price * 100), currency: 'INR', receipt: `order_${Date.now()}`, notes: { user_id: req.user.userId, product_id, user_product_id } });
  res.json({ success: true, data: { order_id: order.id, amount: order.amount, currency: order.currency, key_id: process.env.RAZORPAY_KEY_ID } });
};

exports.verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_product_id } = req.body;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  if (expected !== razorpay_signature) return res.status(400).json({ success: false, error: 'Invalid signature' });
  await supabase.from('user_products').update({ status: 'active', payment_provider: 'razorpay' }).eq('id', user_product_id);
  res.json({ success: true, message: 'Payment verified' });
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    await supabase.from('user_products').update({ status: 'active', payment_provider: 'stripe', subscription_id: s.subscription || null }).eq('id', s.metadata.user_product_id);
  }
  res.json({ received: true });
};
