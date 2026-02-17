const supabase = require('../config/supabase');
const { triggerN8nWorkflow } = require('./n8n');

const checkExpiredTrials = async () => {
  const now = new Date().toISOString();
  const { data: expiredTrials, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('status', 'trial')
    .lt('trial_end', now);

  if (error) throw error;
  if (!expiredTrials?.length) return;

  for (const subscription of expiredTrials) {
    await supabase.from('subscriptions').update({ status: 'expired', updated_at: new Date().toISOString() }).eq('id', subscription.id);
    await supabase.from('workflows').update({ status: 'disabled' }).eq('user_id', subscription.user_id).in('status', ['active', 'paused']);
    await triggerN8nWorkflow('trial-expired', { user_id: subscription.user_id });
  }
};

module.exports = { checkExpiredTrials };
