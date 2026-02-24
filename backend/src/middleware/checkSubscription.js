const supabase = require('../config/supabase');

module.exports = async (req, res, next) => {
  const { data } = await supabase.from('user_products').select('*').eq('user_id', req.user.userId).in('status', ['trial', 'active']);
  if (!data?.length) return res.status(403).json({ success: false, error: 'No active subscription' });
  next();
};
