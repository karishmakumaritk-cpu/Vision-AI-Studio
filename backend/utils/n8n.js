const axios = require('axios');

const N8N_BASE_URL = process.env.N8N_WEBHOOK_URL;

const WEBHOOK_ENDPOINTS = {
  'workflow-activate': '/webhook/activate-workflow',
  'workflow-pause': '/webhook/pause-workflow',
  'lead-capture': '/webhook/lead-capture',
  'trial-expired': '/webhook/trial-expired',
  'payment-success': '/webhook/payment-success'
};

const triggerN8nWorkflow = async (eventType, data) => {
  try {
    if (!N8N_BASE_URL) {
      console.log(`[n8n MOCK] ${eventType}`, data);
      return { success: true, mock: true };
    }
    const endpoint = WEBHOOK_ENDPOINTS[eventType];
    if (!endpoint) throw new Error(`Unknown event type: ${eventType}`);

    const response = await axios.post(
      `${N8N_BASE_URL}${endpoint}`,
      { event: eventType, data, timestamp: new Date().toISOString() },
      { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error(`n8n error (${eventType}):`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { triggerN8nWorkflow };
