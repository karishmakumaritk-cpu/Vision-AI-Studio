const supabase = require('../config/supabase');

exports.getAllUsers = async (_req, res) => {
  const { data } = await supabase.from('users').select('id,name,email,role,created_at').order('created_at', { ascending: false });
  res.json({ success: true, data: { users: data } });
};

exports.getRevenueAnalytics = async (_req, res) => {
  const { data } = await supabase.from('payments').select('amount,status').eq('status', 'succeeded');
  const total = (data || []).reduce((acc, item) => acc + Number(item.amount || 0), 0);
  res.json({ success: true, data: { total_revenue: total } });
};

exports.toggleUserSubscription = async (req, res) => {
  const { data } = await supabase.from('user_products').update({ status: req.body.status }).eq('id', req.body.user_product_id).select().single();
  res.json({ success: true, data });
};
