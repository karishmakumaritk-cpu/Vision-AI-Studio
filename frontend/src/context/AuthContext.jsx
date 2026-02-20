import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { token ? verify() : setLoading(false); }, [token]);

  const verify = async () => {
    try {
      const res = await api.get('/auth/me', token);
      setUser(res.data.user);
    } catch {
      localStorage.removeItem('token');
      setToken(null);
    } finally { setLoading(false); }
  };

  const signup = async (payload) => {
    const res = await api.post('/auth/signup', payload);
    if (res.success) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      toast.success('Signup successful');
    }
    return res;
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      toast.success('Login successful');
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  };

  return <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
