const { randomUUID } = require('crypto');
const store = require('../storage/inMemoryStore');

const { automations, demoData, automationLogs } = store;

// Get user automations
exports.getUserAutomations = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = automations
      .filter((automation) => automation.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

    const data = automations.find((automation) => automation.id === id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Automation not found'
      });
    }

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

    const data = automations.find((automation) => automation.id === id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Automation not found'
      });
    }

    data.status = status;
    data.updated_at = new Date().toISOString();

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

    const allLogs = automationLogs
      .filter((log) => log.automation_id === automationId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const start = Number(offset);
    const end = start + Number(limit);
    const data = allLogs.slice(start, end);
    const count = allLogs.length;

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

    const data = demoData
      .filter((entry) => entry.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

    const data = {
      id: randomUUID(),
      user_id: userId,
      automation_id: automationId,
      action_type: actionType,
      details: details || {},
      created_at: new Date().toISOString(),
    };

    automationLogs.push(data);

    // Update automation usage count
    const automation = automations.find((entry) => entry.id === automationId);
    if (automation) {
      automation.usage_count = (automation.usage_count || 0) + 1;
      automation.updated_at = new Date().toISOString();
    }

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
