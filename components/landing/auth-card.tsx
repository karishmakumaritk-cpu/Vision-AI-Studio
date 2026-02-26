'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function AuthCard({ mode }: { mode: 'signin' | 'signup' }) {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect already-authenticated users (handles Google OAuth callback and page revisits)
  useEffect(() => {
    if (status === 'authenticated') router.replace('/dashboard');
  }, [status, router]);

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
    else router.replace('/dashboard');
    setLoading(false);
  };

  return (
    <div className="container-shell flex min-h-[88vh] items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-bold shadow-xl shadow-indigo-500/30">V</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {mode === 'signin' ? 'Sign in to Vision AI Studio' : 'Start building AI workflows today'}
          </p>
        </div>

        <form onSubmit={onSubmit} className="card space-y-4 p-7">
          {mode === 'signup' && (
            <div>
              <label htmlFor="full-name" className="mb-1.5 block text-xs font-medium text-slate-400">Full Name</label>
              <input id="full-name" name="name" placeholder="Your name" className="field" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">Email Address</label>
            <input id="email" name="email" placeholder="you@example.com" type="email" className="field" required />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-slate-400">Password</label>
            <input id="password" name="password" placeholder="••••••••" type="password" className="field" required />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            className="btn-primary mt-1 w-full justify-center py-3"
            disabled={loading}
          >
            {loading ? 'Please wait…' : (mode === 'signin' ? 'Sign in →' : 'Create account →')}
          </button>

          <div className="relative flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-600">or continue with</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="btn-outline w-full justify-center py-3"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          {mode === 'signin' ? (
            <>Don&apos;t have an account?{' '}<Link href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">Sign up</Link></>
          ) : (
            <>Already have an account?{' '}<Link href="/signin" className="font-medium text-indigo-400 hover:text-indigo-300">Sign in</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
