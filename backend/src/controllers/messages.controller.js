const { supabase } = require('../services/supabase.server');

async function listMessages(req, res) {
  const projectId = req.query.project_id;
  if (!projectId) return res.status(400).json({ error: 'project_id required' });
  if (!supabase) return res.json({ success: true, data: [] });
  try {
    const { data, error } = await supabase.from('messages').select('*').eq('project_id', projectId).order('timestamp', { ascending: true });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'listMessages failed' });
  }
}

async function postMessage(req, res) {
  const { project_id, sender, message } = req.body;
  if (!project_id || !sender || !message) return res.status(400).json({ error: 'project_id, sender, message required' });
  if (!supabase) return res.json({ success: true, data: { id: Math.random().toString(36).slice(2,9), project_id, sender, message, timestamp: new Date().toISOString() } });
  try {
    const { data, error } = await supabase.from('messages').insert([{ project_id, sender, message, timestamp: new Date().toISOString() }]).select().single();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'postMessage failed' });
  }
}

module.exports = { listMessages, postMessage };
