import React from 'react';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', fontFamily: 'Inter, system-ui, Arial', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Vision AI Studio</h1>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>AI Automation Marketplace — by Karishma Kumari</div>
        </div>
        <nav>
          <a href="/automations" style={{ color: '#cbd5e1', marginRight: 12 }}>Automations</a>
          <a href="/request" style={{ color: '#cbd5e1' }}>Request</a>
        </nav>
      </header>

      <main style={{ marginTop: 40 }}>
        <section>
          <h2 style={{ fontSize: 34, marginBottom: 8 }}>Transform your business with AI Automation</h2>
          <p style={{ color: '#9ca3af', maxWidth: 820 }}>
            Preview site: browse automations, request custom workflows, and track projects.
            Use the /automations and /request pages as a starting point. This is a lightweight static entry — replace with your full React/Next app when ready.
          </p>

          <div style={{ marginTop: 20 }}>
            <a href="/automations" style={{ display: 'inline-block', padding: '10px 18px', borderRadius: 999, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
              Explore Automations
            </a>
            <a href="/request" style={{ marginLeft: 12, display: 'inline-block', padding: '10px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.06)' }}>
              Request Custom Automation
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
