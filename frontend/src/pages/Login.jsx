import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6" onSubmit={async (e) => { e.preventDefault(); await login(email, password); nav('/dashboard'); }}>
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        <input className="mb-3 w-full rounded bg-slate-800 p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-4 w-full rounded bg-slate-800 p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-indigo-600 py-2">Login</button>
      </form>
    </div>
  );
}
