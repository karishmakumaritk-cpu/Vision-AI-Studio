const supabase = require('../config/db');

// Get user automations
exports.getUserAutomations = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('user_id', userId)
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

// Get automation by ID
exports.getAutomationById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update automation status
exports.updateAutomationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['active', 'paused', 'stopped'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Valid statuses: ${validStatuses.join(', ')}`
      });
    }

    const { data, error } = await supabase
      .from('automations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Automation status updated',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get automation logs
exports.getAutomationLogs = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const { data, error, count } = await supabase
      .from('automation_logs')
      .select('*', { count: 'exact' })
      .eq('automation_id', automationId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      total: count,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get demo data for automation
exports.getDemoData = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('demo_data')
      .select('*')
      .eq('user_id', userId)
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

// Log automation action
exports.logAutomationAction = async (req, res) => {
  try {
    const { automationId } = req.params;
    const { userId, actionType, details } = req.body;

    const { data, error } = await supabase
      .from('automation_logs')
      .insert([{
        user_id: userId,
        automation_id: automationId,
        action_type: actionType,
        details: details || {}
      }])
      .select()
      .single();

    if (error) throw error;

    // Update automation usage count
    await supabase.rpc('increment_automation_usage', {
      automation_id: automationId
    }).catch(() => {
      // Fallback if RPC function doesn't exist
      supabase
        .from('automations')
        .select('usage_count')
        .eq('id', automationId)
        .single()
        .then(({ data: auto }) => {
          supabase
            .from('automations')
            .update({ usage_count: (auto.usage_count || 0) + 1 })
            .eq('id', automationId);
        });
    });

    res.status(201).json({
      success: true,
      message: 'Action logged',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
