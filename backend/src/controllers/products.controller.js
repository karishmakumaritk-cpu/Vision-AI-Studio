const supabase = require('../config/supabase');
const crypto = require('crypto');
const { calculateTrialEnd } = require('../utils/helpers');

exports.getAllProducts = async (_req, res) => {
  const { data } = await supabase.from('products').select('*').eq('is_active', true).order('created_at');
  res.json({ success: true, count: data?.length || 0, data: data || [] });
};

exports.getUserProducts = async (req, res) => {
  const { data } = await supabase.from('user_products').select('*, products(*)').eq('user_id', req.user.userId).order('created_at', { ascending: false });
  const now = Date.now();
  const enriched = (data || []).map((x) => ({ ...x, trial_hours_remaining: Math.max(0, Math.floor((new Date(x.trial_end).getTime() - now)/3600000)), trial_active: x.status === 'trial' && new Date(x.trial_end).getTime() > now }));
  res.json({ success: true, count: enriched.length, data: enriched });
};

exports.activateProduct = async (req, res) => {
  const { product_id, config } = req.body;
  const { data: product } = await supabase.from('products').select('*').eq('id', product_id).eq('is_active', true).single();
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

  const { data: existing } = await supabase.from('user_products').select('*').eq('user_id', req.user.userId).eq('product_id', product_id).maybeSingle();
  if (existing) return res.status(400).json({ success: false, error: 'Product already activated', data: existing });

  const trial_start = new Date();
  const trial_end = calculateTrialEnd(product.trial_days);
  const { data: userProduct } = await supabase.from('user_products').insert([{ user_id: req.user.userId, product_id, status: 'trial', trial_start, trial_end }]).select().single();

  const api_key = `vais_${crypto.randomBytes(24).toString('hex')}`;
  const { data: workflow } = await supabase.from('workflows').insert([{ user_id: req.user.userId, product_id, workflow_type: product.slug, config_json: config || {}, status: 'active', api_key }]).select().single();

  await supabase.from('usage_metrics').insert([{ user_id: req.user.userId, product_id, billing_cycle_start: trial_start, billing_cycle_end: trial_end }]);
  res.status(201).json({ success: true, message: `${product.name} activated`, data: { userProduct, workflow, trial_end, api_key } });
};

exports.deactivateProduct = async (req, res) => {
  const { data } = await supabase.from('user_products').update({ status: 'cancelled' }).eq('id', req.params.user_product_id).eq('user_id', req.user.userId).select().single();
  res.json({ success: true, message: 'Product deactivated', data });
};
