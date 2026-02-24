import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, rRes] = await Promise.all([axios.get(`${API_URL}/projects`), axios.get(`${API_URL}/automation/my-requests`)]);
        setProjects(pRes.data?.data || []);
        setRequests(rRes.data?.data || []);
      } catch (e) {
        console.error('Failed to fetch dashboard data', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ paddingTop: 96, background: '#0A0A0A', minHeight: '100vh', color: '#fff' }}>
      <div className="container">
        <h1 style={{ fontSize: 28 }}>Your Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#9ca3af' }}>Total Requests</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{requests.length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#9ca3af' }}>Active Projects</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{projects.filter(p => p.status === 'in_progress').length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#9ca3af' }}>Completed</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{projects.filter(p => p.status === 'completed').length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
            <div style={{ color: '#9ca3af' }}>Total Spent</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>₹{projects.reduce((s, p) => s + (p.price_paid || 0), 0).toLocaleString()}</div>
          </div>
        </div>

        <section style={{ marginTop: 24 }}>
          <h2>Active Projects</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {projects.length ? projects.map(p => (
              <div key={p.id} style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.project_name}</div>
                    <div style={{ color: '#9ca3af', fontSize: 13 }}>Created: {p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800 }}>₹{p.price_quoted?.toLocaleString() || '—'}</div>
                    <div style={{ color: '#9ca3af', fontSize: 13 }}>{p.payment_status === 'paid' ? 'Paid' : 'Pending'}</div>
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ color: '#9ca3af', fontSize: 13 }}>Progress: {p.progress_percentage || 0}%</div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 999, marginTop: 6 }}>
                    <div style={{ height: '100%', width: `${p.progress_percentage || 0}%`, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            )) : <div style={{ color: '#9ca3af' }}>No active projects</div>}
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Your Requests</h2>
          <div style={{ marginTop: 12 }}>
            {requests.length ? requests.map(r => (
              <div key={r.id} style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{r.automation_category}</div>
                <div style={{ color: '#9ca3af', fontSize: 13 }}>{r.description}</div>
                <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 8 }}>Submitted: {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'} • Status: {r.status?.toUpperCase()}</div>
              </div>
            )) : <div style={{ color: '#9ca3af' }}>No requests yet</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
