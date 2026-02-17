const supabase = require('../config/supabase');

const checkSubscription = async (req, res, next) => {
  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !subscription) {
      return res.status(403).json({ success: false, error: 'No subscription found.', code: 'NO_SUBSCRIPTION' });
    }

    const now = new Date();
    if (subscription.status === 'trial' && now > new Date(subscription.trial_end)) {
      await supabase.from('subscriptions').update({ status: 'expired', updated_at: now.toISOString() }).eq('id', subscription.id);
      await supabase.from('workflows').update({ status: 'disabled' }).eq('user_id', req.user.id).eq('status', 'active');
      return res.status(403).json({ success: false, error: 'Your trial has expired. Please upgrade.', code: 'TRIAL_EXPIRED', upgradeUrl: '/pricing' });
    }

    req.subscription = subscription;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to verify subscription' });
  }
};

module.exports = checkSubscription;
