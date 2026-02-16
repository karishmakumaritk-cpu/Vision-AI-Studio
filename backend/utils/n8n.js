const axios = require('axios');

// Trigger n8n workflow via webhook
exports.triggerN8nWorkflow = async (workflowName, data) => {
  try {
    if (!process.env.N8N_WEBHOOK_URL) {
      console.warn('⚠️  N8N_WEBHOOK_URL not configured. Workflows won\'t be triggered.');
      return null;
    }

    const webhookUrl = `${process.env.N8N_WEBHOOK_URL}/${workflowName}`;

    const response = await axios.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    console.log(`✅ n8n workflow triggered: ${workflowName}`);
    return response.data;
  } catch (error) {
    console.warn(`⚠️  n8n workflow error (${workflowName}): ${error.message}`);
    // Don't throw - automation failure shouldn't break the main flow
    return null;
  }
};
