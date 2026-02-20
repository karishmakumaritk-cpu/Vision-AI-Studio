'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AuthCard({ mode }: { mode: 'signin' | 'signup' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(event.currentTarget);

    if (mode === 'signup') {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password')
        })
      });
      if (!response.ok) {
        setError('Registration failed');
        setLoading(false);
        return;
      }
    }

    const result = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false
    });

    if (result?.error) setError(result.error);
    else router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="container-shell flex min-h-[80vh] items-center justify-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-semibold">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
        {mode === 'signup' && <input name="name" placeholder="Name" className="w-full rounded-md border border-slate-700 bg-slate-900 p-2" />}
        <input name="email" placeholder="Email" type="email" className="w-full rounded-md border border-slate-700 bg-slate-900 p-2" required />
        <input name="password" placeholder="Password" type="password" className="w-full rounded-md border border-slate-700 bg-slate-900 p-2" required />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-md bg-indigo-600 p-2" disabled={loading}>{loading ? 'Please wait…' : (mode === 'signin' ? 'Sign in' : 'Sign up')}</button>
        <button type="button" onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="w-full rounded-md border border-slate-700 p-2">Continue with Google</button>
      </form>
    </div>
  );
}
