const supabase = require('../config/supabase');
const { executeWorkflow, checkTrialExpiration } = require('../services/workflow.engine');

exports.getUserWorkflows = async (req, res) => {
  const { data } = await supabase.from('workflows').select('*, products(name,slug), user_products(status,trial_end)').eq('user_id', req.user.userId).order('created_at', { ascending: false });
  res.json({ success: true, count: data?.length || 0, data: data || [] });
};

exports.executeWorkflow = async (req, res) => {
  const { data: workflow } = await supabase.from('workflows').select('*, user_products(*)').eq('id', req.params.workflow_id).eq('user_id', req.user.userId).single();
  if (!workflow) return res.status(404).json({ success: false, error: 'Workflow not found' });
  if (workflow.status !== 'active') return res.status(403).json({ success: false, error: 'Workflow not active' });

  const expired = await checkTrialExpiration(Array.isArray(workflow.user_products) ? workflow.user_products[0] : workflow.user_products);
  if (expired) return res.status(403).json({ success: false, error: 'Trial expired', code: 'TRIAL_EXPIRED' });

  const start = Date.now();
  const result = await executeWorkflow(workflow, req.body.input_data || {});
  const ms = Date.now() - start;
  await supabase.from('workflow_executions').insert([{ workflow_id: workflow.id, execution_status: result.success ? 'success' : 'failed', input_data: req.body.input_data || {}, output_data: result.output || {}, error_message: result.error || null, execution_time_ms: ms }]);

  res.json({ success: true, data: { output: result.output, execution_time_ms: ms } });
};

exports.getWorkflowExecutions = async (req, res) => {
  const limit = Number(req.query.limit || 50);
  const offset = Number(req.query.offset || 0);
  const { data } = await supabase.from('workflow_executions').select('*').eq('workflow_id', req.params.workflow_id).order('created_at', { ascending: false }).range(offset, offset + limit - 1);
  res.json({ success: true, count: data?.length || 0, data: data || [] });
};

exports.toggleWorkflow = async (req, res) => {
  const { status } = req.body;
  const { data } = await supabase.from('workflows').update({ status }).eq('id', req.params.workflow_id).eq('user_id', req.user.userId).select().single();
  res.json({ success: true, message: `Workflow ${status}`, data });
};

exports.getUsageStats = async (req, res) => {
  const { data } = await supabase.from('usage_metrics').select('*').eq('user_id', req.user.userId);
  res.json({ success: true, data: { by_product: data || [] } });
};
