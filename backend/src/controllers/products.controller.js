const supabase = require('../config/supabase');

exports.getAllProducts = async (_req, res) => {
  const { data } = await supabase.from('products').select('*').eq('is_active', true);
  res.json({ success: true, data });
};

exports.getUserProducts = async (req, res) => {
  const { data } = await supabase.from('user_products').select('*, products(*)').eq('user_id', req.user.userId);
  res.json({ success: true, data });
};

exports.activateProduct = async (req, res) => {
  const productId = req.body.product_id;
  const { data: product } = await supabase.from('products').select('*').eq('id', productId).single();
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  const start = new Date();
  const end = new Date(Date.now() + (product.trial_days || 1) * 86400000);
  const { data } = await supabase.from('user_products').insert([{ user_id: req.user.userId, product_id: productId, status: 'trial', trial_start: start.toISOString(), trial_end: end.toISOString() }]).select().single();
  res.status(201).json({ success: true, message: 'Product activated', data });
};

exports.deactivateProduct = async (req, res) => {
  const { data } = await supabase.from('user_products').update({ status: 'cancelled' }).eq('id', req.params.user_product_id).eq('user_id', req.user.userId).select().single();
  res.json({ success: true, data });
};
