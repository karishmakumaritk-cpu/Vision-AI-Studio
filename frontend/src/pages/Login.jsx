import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) nav('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100"><Navbar />
      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-14 card grid gap-3">
        <input placeholder="Email" type="email" className="bg-slate-800 p-2 rounded" onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" className="bg-slate-800 p-2 rounded" onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-indigo-600 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
