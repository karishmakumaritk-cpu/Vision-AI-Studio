import axios from 'axios';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export const api = {
  get: async (path, token) => (await client.get(path, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined)).data,
  post: async (path, body, token) => (await client.post(path, body, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined)).data,
  patch: async (path, body, token) => (await client.patch(path, body, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined)).data
};
