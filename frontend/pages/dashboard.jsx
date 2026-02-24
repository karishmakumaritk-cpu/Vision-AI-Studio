import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  const callAi = async () => {
    setResult(null);
    try {
      const res = await fetch(`${apiBase}/api/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult({ status: res.status, body: data });
    } catch (err) {
      setResult({ status: 0, body: { error: 'Request failed' } });
    }
  };

  if (!session) return (
    <div style={{ padding: 20 }}>
      <p>You are not signed in. <a href="/login">Login</a></p>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Signed in as: {session.user?.email}</p>
      <div>
        <h2>Ask AI</h2>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} cols={60} />
        <br />
        <button onClick={callAi}>Send to AI</button>
        {result && (
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
