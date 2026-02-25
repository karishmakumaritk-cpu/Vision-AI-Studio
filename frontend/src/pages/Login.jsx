import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) return setError(err.message);
    nav('/dashboard');
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
        <input className="mb-3 w-full rounded bg-slate-800 p-2" placeholder="Email" type="email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-4 w-full rounded bg-slate-800 p-2" type="password" placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-indigo-600 py-2" type="submit">Login</button>
        <p className="mt-4 text-center text-slate-400 text-sm">No account? <Link to="/signup" className="text-indigo-400 underline">Sign up</Link></p>
      </form>
    </div>
  );
}
