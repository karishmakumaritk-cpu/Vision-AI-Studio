import React, { useState } from 'react';

const MERCHANT_ID = import.meta.env.VITE_MERCHANT_ID;

const paymentScenarios = [
  { id: 1, label: 'Standard Payment', description: 'One-time payment for automation package', icon: '💳' },
  { id: 2, label: 'Subscription', description: 'Monthly recurring automation maintenance', icon: '🔄' },
  { id: 3, label: 'Custom Project', description: 'Milestone-based payment for custom builds', icon: '🚀' },
];

export default function Merchant() {
  const [copied, setCopied] = useState(false);
  const [activeScenario, setActiveScenario] = useState(1);

  function handleCopy() {
    if (!MERCHANT_ID) return;
    navigator.clipboard.writeText(MERCHANT_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(false);
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Merchant Payment Portal</h1>
          <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 14 }}>Vision AI Studio · Karishma Kumari</p>

          <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 10, padding: '12px 20px', marginBottom: 20 }}>
            <div style={{ color: '#a78bfa', fontSize: 12, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>Merchant Scenario ID</div>
            {MERCHANT_ID ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <code style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: 8, fontSize: 14, letterSpacing: 1, color: '#e2e8f0' }}>{MERCHANT_ID}</code>
                <button
                  onClick={handleCopy}
                  style={{ padding: '6px 14px', borderRadius: 8, background: copied ? '#10b981' : 'linear-gradient(90deg,#7c3aed,#06b6d4)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ) : (
              <p style={{ color: '#f87171', margin: 0 }}>Merchant ID not configured</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <a href="mailto:karishmakumaritk@gmail.com" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: 13 }}>📧 karishmakumaritk@gmail.com</a>
            <span style={{ color: '#475569' }}>·</span>
            <a href="https://wa.me/919818691915" target="_blank" rel="noreferrer" style={{ color: '#34d399', textDecoration: 'none', fontSize: 13 }}>📱 WhatsApp</a>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Payment Scenarios</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {paymentScenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10,
                  background: activeScenario === scenario.id ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                  border: activeScenario === scenario.id ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  color: '#fff', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: 24 }}>{scenario.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{scenario.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{scenario.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
