const PLAN_LIMITS = {
  trial: { workflows: 1, leads_per_month: 10, calls_per_month: 5, messages_per_month: 20, emails_per_month: 10, duration_hours: 24 },
  starter: { workflows: 3, leads_per_month: 100, calls_per_month: 0, messages_per_month: 1000, emails_per_month: 500, price_inr: 999 },
  growth: { workflows: 5, leads_per_month: 500, calls_per_month: 50, messages_per_month: 10000, emails_per_month: 5000, price_inr: 2999 },
  pro: { workflows: 999, leads_per_month: 9999, calls_per_month: 9999, messages_per_month: 99999, emails_per_month: 99999, price_inr: 9999 }
};

const getPlanLimits = (planName) => PLAN_LIMITS[planName] || PLAN_LIMITS.trial;

const checkLimit = (planName, usageType, currentCount) => {
  const limits = getPlanLimits(planName);
  const limitKey = `${usageType}_per_month`;
  const limit = limits[limitKey];
  if (limit === undefined) return { allowed: true };
  return {
    allowed: currentCount < limit,
    current: currentCount,
    limit,
    percentage: limit === 0 ? 100 : Math.round((currentCount / limit) * 100)
  };
};

module.exports = { PLAN_LIMITS, getPlanLimits, checkLimit };
