const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const dashboardAPI = {
  getTrialStatus: (userId) => apiCall(`/trials/status/${userId}`),
  getAutomations: (userId) => apiCall(`/automation/user/${userId}`),
  getDemoData: (userId) => apiCall(`/automation/demo/${userId}`),
  getAutomationLogs: (automationId, limit = 10, offset = 0) =>
    apiCall(`/automation/${automationId}/logs?limit=${limit}&offset=${offset}`),
  updateAutomationStatus: (automationId, status) =>
    apiCall(`/automation/${automationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export default apiCall;
