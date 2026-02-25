import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });
    if (err) return setError(err.message);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen grid place-items-center p-4">
        <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
          <h1 className="mb-4 text-2xl font-semibold">Check your email</h1>
          <p className="mb-4 text-slate-400">A confirmation link was sent to <strong>{form.email}</strong>. Confirm your email then log in.</p>
          <Link to="/login" className="text-indigo-400 underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-2xl font-semibold">Sign up</h1>
        {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
        <input className="mb-3 w-full rounded bg-slate-800 p-2" placeholder="Name" aria-label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="mb-3 w-full rounded bg-slate-800 p-2" placeholder="Email" type="email" aria-label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="mb-4 w-full rounded bg-slate-800 p-2" type="password" placeholder="Password" aria-label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full rounded bg-indigo-600 py-2" type="submit">Create account</button>
        <p className="mt-4 text-center text-slate-400 text-sm">Already have an account? <Link to="/login" className="text-indigo-400 underline">Log in</Link></p>
      </form>
    </div>
  );
}
