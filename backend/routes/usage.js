const express = require('express');
const authenticate = require('../middleware/authenticate');
const checkSubscription = require('../middleware/checkSubscription');
const supabase = require('../config/supabase');

const router = express.Router();
router.use(authenticate, checkSubscription);

router.get('/stats', async (req, res) => {
  const { data, error } = await supabase.from('usage_logs').select('usage_type,count,created_at').eq('user_id', req.user.id).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });

  const summary = (data || []).reduce((acc, row) => {
    acc[row.usage_type] = (acc[row.usage_type] || 0) + (row.count || 1);
    return acc;
  }, {});

  return res.json({ success: true, data: { summary, logs: data || [] } });
});

module.exports = router;
