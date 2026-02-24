const supabase = require('../config/supabase');
const { executeWorkflow } = require('../services/workflow.engine');

exports.getUserWorkflows = async (req, res) => {
  const { data } = await supabase.from('workflows').select('*').eq('user_id', req.user.userId);
  res.json({ success: true, data });
};

exports.executeWorkflow = async (req, res) => {
  const { data: workflow } = await supabase.from('workflows').select('*').eq('id', req.params.workflow_id).eq('user_id', req.user.userId).single();
  if (!workflow) return res.status(404).json({ success: false, error: 'Workflow not found' });
  const result = await executeWorkflow(workflow, req.body.input_data || {});
  await supabase.from('workflow_executions').insert([{ workflow_id: workflow.id, execution_status: result.success ? 'success' : 'failed', input_data: req.body.input_data || {}, output_data: result.output || {} }]);
  res.json({ success: true, data: result });
};

exports.getWorkflowExecutions = async (req, res) => {
  const { data } = await supabase.from('workflow_executions').select('*').eq('workflow_id', req.params.workflow_id).order('created_at', { ascending: false });
  res.json({ success: true, data });
};

exports.toggleWorkflow = async (req, res) => {
  const { data } = await supabase.from('workflows').update({ status: req.body.status }).eq('id', req.params.workflow_id).eq('user_id', req.user.userId).select().single();
  res.json({ success: true, data });
};

exports.getUsageStats = async (req, res) => {
  const { data } = await supabase.from('usage_metrics').select('*').eq('user_id', req.user.userId);
  res.json({ success: true, data });
};
