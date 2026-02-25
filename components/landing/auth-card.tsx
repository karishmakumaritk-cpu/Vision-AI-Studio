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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 2 }}>
      <form onSubmit={onSubmit} className="card" style={{ width: '100%', maxWidth: '420px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--txt)', marginBottom: '4px' }}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h1>
        {mode === 'signup' && (
          <input
            name="name"
            placeholder="Name"
            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--bd2)', background: 'var(--s3)', padding: '10px 14px', color: 'var(--txt)', fontSize: '14px', outline: 'none' }}
          />
        )}
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--bd2)', background: 'var(--s3)', padding: '10px 14px', color: 'var(--txt)', fontSize: '14px', outline: 'none' }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--bd2)', background: 'var(--s3)', padding: '10px 14px', color: 'var(--txt)', fontSize: '14px', outline: 'none' }}
        />
        {error && <p style={{ fontSize: '13px', color: 'var(--err)' }}>{error}</p>}
        <button
          className="btn-primary"
          disabled={loading}
          style={{ width: '100%', padding: '12px' }}
        >
          <span>{loading ? 'Please wait…' : (mode === 'signin' ? 'Sign in' : 'Sign up')}</span>
        </button>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="btn-ghost"
          style={{ width: '100%', padding: '12px' }}
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
