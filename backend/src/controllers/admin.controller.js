const supabase = require('../config/supabase');

exports.getAllUsers = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const offset = (page - 1) * limit;
  const { data, count } = await supabase.from('users').select('id,name,email,role,business_name,created_at', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + limit - 1);
  res.json({ success: true, data: { users: data || [], pagination: { total: count || 0, page, limit } } });
};

exports.getRevenueAnalytics = async (_req, res) => {
  const { data: payments } = await supabase.from('payments').select('amount,status').eq('status', 'succeeded');
  const total = (payments || []).reduce((a, p) => a + Number(p.amount || 0), 0);
  res.json({ success: true, data: { total_revenue: total, monthly_recurring_revenue: total * 0.7 } });
};

exports.toggleUserSubscription = async (req, res) => {
  const { user_product_id, status } = req.body;
  const { data } = await supabase.from('user_products').update({ status }).eq('id', user_product_id).select().single();
  res.json({ success: true, message: `Subscription ${status}`, data });
};
