const express = require('express');
const authenticate = require('../middleware/authenticate');
const supabase = require('../config/supabase');
const { getPlanLimits } = require('../utils/planLimits');

const router = express.Router();
router.use(authenticate);

router.get('/status', async (req, res) => {
  const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', req.user.id).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (error) return res.status(500).json({ success: false, error: error.message });
  return res.json({ success: true, data: { subscription: data, limits: getPlanLimits(data?.plan_name || 'trial') } });
});

module.exports = router;
