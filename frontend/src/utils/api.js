import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const api = {
  async get(path, token) {
    const { data } = await client.get(path, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return data.data || data;
  },
  async post(path, body, token) {
    const { data } = await client.post(path, body, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return data.data || data;
  }
};
