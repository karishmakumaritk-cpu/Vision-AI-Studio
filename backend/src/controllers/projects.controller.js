const supabase = require('../config/supabase');

exports.getMyProjects = async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*').eq('user_id', req.user.userId).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
};
