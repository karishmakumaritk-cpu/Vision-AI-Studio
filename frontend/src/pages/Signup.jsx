import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { signup } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.success) nav('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100"><Navbar />
      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-14 card grid gap-3">
        <input placeholder="Name" className="bg-slate-800 p-2 rounded" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" className="bg-slate-800 p-2 rounded" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" className="bg-slate-800 p-2 rounded" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="bg-indigo-600 py-2 rounded">Create Account</button>
      </form>
    </div>
  );
}
