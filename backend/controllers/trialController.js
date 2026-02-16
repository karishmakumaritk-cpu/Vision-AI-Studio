const supabase = require('../config/db');
const { sendTrialExpiryEmail } = require('../utils/email');

// Check expired trials (runs daily via cron)
exports.checkExpiredTrials = async () => {
  try {
    const now = new Date().toISOString();

    // Find users with expired trials
    const { data: expiredUsers, error } = await supabase
      .from('users')
      .select('*')
      .eq('plan', 'free_trial')
      .lt('trial_end', now)
      .eq('status', 'active');

    if (error) throw error;

    console.log(`⏰ Found ${expiredUsers?.length || 0} expired trials`);

    if (!expiredUsers || expiredUsers.length === 0) {
      return { success: true, count: 0 };
    }

    // Update each user
    for (const user of expiredUsers) {
      // Update user status
      await supabase
        .from('users')
        .update({ status: 'trial_expired' })
        .eq('id', user.id);

      // Pause their automations
      await supabase
        .from('automations')
        .update({ status: 'paused' })
        .eq('user_id', user.id);

      // Send expiry email
      await sendTrialExpiryEmail(user.email, user.name);

      console.log(`✅ Trial expired for: ${user.email}`);
    }

    return { success: true, count: expiredUsers.length };
  } catch (error) {
    console.error('❌ Check expired trials error:', error);
    throw error;
  }
};

// Get trial status for a user
exports.getTrialStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .select('trial_start, trial_end, status, plan')
      .eq('id', userId)
      .single();

    if (error) throw error;

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const now = new Date();
    const trialEnd = new Date(user.trial_end);
    const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));

    res.json({
      success: true,
      data: {
        status: user.status,
        plan: user.plan,
        trial_end: user.trial_end,
        trial_start: user.trial_start,
        days_remaining: daysRemaining > 0 ? daysRemaining : 0,
        is_expired: daysRemaining <= 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
