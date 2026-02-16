const { sendTrialExpiryEmail } = require('../utils/email');
const store = require('../storage/inMemoryStore');

const { users, automations } = store;

// Check expired trials (runs daily via cron)
exports.checkExpiredTrials = async () => {
  try {
    const now = new Date().toISOString();

    // Find users with expired trials
    const expiredUsers = users.filter((user) => (
      user.plan === 'free_trial'
      && user.status === 'active'
      && user.trial_end
      && new Date(user.trial_end).toISOString() < now
    ));

    console.log(`⏰ Found ${expiredUsers.length} expired trials`);

    if (expiredUsers.length === 0) {
      return { success: true, count: 0 };
    }

    // Update each user
    for (const user of expiredUsers) {
      // Update user status
      user.status = 'trial_expired';
      user.updated_at = new Date().toISOString();

      // Pause their automations
      automations
        .filter((automation) => automation.user_id === user.id)
        .forEach((automation) => {
          automation.status = 'paused';
          automation.updated_at = new Date().toISOString();
        });

      // Send expiry email (non-blocking)
      sendTrialExpiryEmail(user.email, user.name).catch(() => {});

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

    const user = users.find((entry) => entry.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const now = new Date();
    const trialEnd = user.trial_end ? new Date(user.trial_end) : null;
    const daysRemaining = trialEnd
      ? Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24))
      : 0;

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
    const data = [...users].sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
    );

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
