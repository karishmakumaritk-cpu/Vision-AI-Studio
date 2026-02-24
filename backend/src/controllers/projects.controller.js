const { supabase } = require('../services/supabase.server');
const { generateFromPrompt } = require('../services/ai.service');

/*
  Basic endpoints:
  - GET /api/projects -> list (admin or user's projects)
  - POST /api/projects -> create new project (saves to Supabase if configured)
  - GET /api/projects/:id -> fetch single project
*/
async function listProjects(req, res) {
  if (!supabase) return res.json({ success: true, data: [] });
  try {
    // For MVP: return all projects (admin can filter). Add auth/row-level policies later.
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'listProjects failed' });
  }
}

async function createProject(req, res) {
  try {
    const payload = req.body;
    // minimal validation
    if (!payload || !payload.user_id) return res.status(400).json({ error: 'user_id required' });

    // if supabase configured, insert record; otherwise return created object
    if (supabase) {
      const insert = {
        user_id: payload.user_id,
        workflow_type: payload.workflow_type || 'custom',
        requirements_json: payload.requirements_json || {},
        status: 'pending',
        deadline: payload.deadline || null,
        price: payload.price || null,
        created_at: new Date().toISOString(),
      };
      const { data, error } = await supabase.from('projects').insert([insert]).select().single();
      if (error) throw error;
      // notify admin placeholder (jobs)
      // TODO: enqueue 24h timer job
      res.json({ success: true, data });
    } else {
      // fallback: echo back
      const project = { id: Math.random().toString(36).slice(2,9), ...payload, status: 'pending', created_at: new Date().toISOString() };
      res.json({ success: true, data: project });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'createProject failed' });
  }
}

async function getProject(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: 'id required' });
  if (!supabase) return res.json({ success: true, data: { id, message: 'no supabase configured' } });
  try {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'getProject failed' });
  }
}

module.exports = { listProjects, createProject, getProject };
