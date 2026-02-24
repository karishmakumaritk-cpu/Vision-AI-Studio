import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: 96 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 40, margin: 0 }}>Vision AI Studio</h1>
          <p style={{ color: '#94a3b8' }}>Premium AI automation marketplace by Karishma Kumari</p>
        </div>
        <div>
          <Link to="/automations" style={{ marginRight: 12 }}>Automations</Link>
          <Link to="/request">Request</Link>
        </div>
      </div>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 28 }}>Transform Your Business with AI Automation</h2>
        <p style={{ color: '#9ca3af', maxWidth: 800 }}>
          Custom automations built with n8n + AI. Explore 24 ready solutions or request a custom automation.
        </p>
        <div style={{ marginTop: 18 }}>
          <Link to="/automations">
            <button style={{ padding: '12px 20px', borderRadius: 999, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', border: 'none' }}>
              Explore Automations
            </button>
          </Link>
          <Link to="/request" style={{ marginLeft: 12 }}>
            <button style={{ padding: '12px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>
              Request Custom
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
