// API Helper Functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
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

// Dashboard API calls
export const dashboardAPI = {
  // Get user data
  getUser: (userId) => apiCall(`/users/${userId}`),
  
  // Get trial status
  getTrialStatus: (userId) => apiCall(`/trials/status/${userId}`),
  
  // Get user automations
  getAutomations: (userId) => apiCall(`/automation/user/${userId}`),
  
  // Get demo data
  getDemoData: (userId) => apiCall(`/demo-data/${userId}`),
  
  // Get automation logs
  getAutomationLogs: (userId, limit = 10) => 
    apiCall(`/automation/logs/${userId}?limit=${limit}`),
  
  // Get usage statistics
  getUsageStats: (userId) => apiCall(`/automation/stats/${userId}`),
  
  // Upgrade to paid plan
  upgradePlan: (userId, planData) => 
    apiCall(`/subscriptions/upgrade`, {
      method: 'POST',
      body: JSON.stringify({ userId, ...planData }),
    }),
};

export default apiCall;
