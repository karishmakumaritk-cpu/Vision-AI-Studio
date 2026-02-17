const supabase = require('../config/supabase');
const { getPlanLimits } = require('../utils/planLimits');

const checkPlanLimits = (usageType) => async (req, res, next) => {
  try {
    const limits = getPlanLimits(req.subscription.plan_name);
    const limitKey = `${usageType}_per_month`;
    const monthlyLimit = limits[limitKey];

    if (monthlyLimit === undefined) return next();

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const { data: rows, error } = await supabase
      .from('usage_logs')
      .select('count')
      .eq('user_id', req.user.id)
      .eq('usage_type', usageType)
      .gte('created_at', monthStart.toISOString());

    if (error) throw error;

    const used = (rows || []).reduce((sum, row) => sum + (row.count || 1), 0);
    if (used >= monthlyLimit) {
      return res.status(403).json({ success: false, error: `Monthly ${usageType} limit reached for ${req.subscription.plan_name} plan.`, code: 'PLAN_LIMIT_REACHED' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to verify plan limits' });
  }
};

module.exports = checkPlanLimits;
