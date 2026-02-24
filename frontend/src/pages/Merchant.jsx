import React, { useState } from 'react';

const MERCHANT_ID = import.meta.env.VITE_MERCHANT_ID || 'nukoKk23721220820057';

export default function Merchant() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(MERCHANT_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(false);
    });
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f0f9ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 32, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <img
          src="/assets/merchant.jpg"
          alt="Merchant"
          style={{ width: '100%', maxWidth: 320, borderRadius: 12, marginBottom: 24, objectFit: 'contain' }}
        />
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1e1b4b', marginBottom: 8 }}>Merchant ID</h2>
        <p style={{ fontFamily: 'monospace', fontSize: 16, color: '#374151', background: '#f3f4f6', borderRadius: 8, padding: '10px 16px', marginBottom: 16, wordBreak: 'break-all' }}>
          {MERCHANT_ID}
        </p>
        <button
          onClick={handleCopy}
          style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, cursor: 'pointer', fontWeight: 600 }}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </main>
  );
}
