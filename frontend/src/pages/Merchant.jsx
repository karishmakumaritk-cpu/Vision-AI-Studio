import React, { useState } from 'react';

const MERCHANT_ID = import.meta.env.VITE_MERCHANT_ID;

export default function Merchant() {
  const [copied, setCopied] = useState(false);

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 480, width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
        <img
          src="/assets/merchant.jpg"
          alt="Merchant"
          style={{ width: 160, height: 160, borderRadius: 12, objectFit: 'cover', marginBottom: 24 }}
        />
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Merchant Profile</h1>
        {MERCHANT_ID ? (
          <>
            <p style={{ color: '#94a3b8', marginBottom: 16 }}>Merchant ID</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <code style={{ background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 8, fontSize: 14, letterSpacing: 1 }}>{MERCHANT_ID}</code>
              <button
                onClick={handleCopy}
                style={{ padding: '6px 14px', borderRadius: 8, background: copied ? '#10b981' : 'linear-gradient(90deg,#7c3aed,#06b6d4)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: '#f87171' }}>Merchant ID not configured</p>
        )}
      </div>
    </div>
  );
}
