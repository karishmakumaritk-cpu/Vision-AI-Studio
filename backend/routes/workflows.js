const express = require('express');
const authenticate = require('../middleware/authenticate');
const checkSubscription = require('../middleware/checkSubscription');
const supabase = require('../config/supabase');
const { triggerN8nWorkflow } = require('../utils/n8n');
const { getPlanLimits } = require('../utils/planLimits');

const router = express.Router();
router.use(authenticate, checkSubscription);

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('workflows').select('*').eq('user_id', req.user.id).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  return res.json({ success: true, count: data.length, data });
});

router.post('/create', async (req, res) => {
  try {
    const { workflow_type, config } = req.body;
    const limits = getPlanLimits(req.subscription.plan_name);
    const { data: existing } = await supabase.from('workflows').select('id').eq('user_id', req.user.id).in('status', ['active', 'paused']);
    if ((existing || []).length >= limits.workflows) {
      return res.status(403).json({ success: false, error: `Your ${req.subscription.plan_name} plan allows only ${limits.workflows} workflow(s).`, code: 'PLAN_LIMIT_REACHED', upgradeUrl: '/pricing' });
    }

    const { data: workflow, error } = await supabase
      .from('workflows')
      .insert([{ user_id: req.user.id, workflow_type, status: 'active', config_json: config || {} }])
      .select('*')
      .single();

    if (error) throw error;
    triggerN8nWorkflow('workflow-activate', { user_id: req.user.id, workflow_id: workflow.id, workflow_type, config }).catch(() => {});
    return res.status(201).json({ success: true, message: `${workflow_type} automation is now LIVE!`, data: workflow });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.patch('/:id/pause', async (req, res) => {
  const { data, error } = await supabase.from('workflows').update({ status: 'paused' }).eq('id', req.params.id).eq('user_id', req.user.id).select('*').single();
  if (error) return res.status(500).json({ success: false, error: error.message });
  return res.json({ success: true, message: 'Workflow paused', data });
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('workflows').delete().eq('id', req.params.id).eq('user_id', req.user.id);
  if (error) return res.status(500).json({ success: false, error: error.message });
  return res.json({ success: true, message: 'Workflow deleted' });
});

module.exports = router;
