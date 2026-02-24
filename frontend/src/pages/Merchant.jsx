import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const MERCHANT_ID = import.meta.env.VITE_MERCHANT_ID || '';
const NAVBAR_HEIGHT = 80;

export default function Merchant() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!MERCHANT_ID) return;
    navigator.clipboard.writeText(MERCHANT_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert('Failed to copy. Please copy the ID manually.');
    });
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div style={{ paddingTop: NAVBAR_HEIGHT, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '32px 40px',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center'
        }}>
          <img
            src="/assets/merchant.png"
            alt="Merchant"
            style={{ width: '100%', borderRadius: 10, marginBottom: 24, objectFit: 'cover', maxHeight: 200 }}
          />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>Merchant Info</h1>
          {MERCHANT_ID ? (
            <>
              <p style={{ color: '#94a3b8', marginBottom: 16 }}>Your public Merchant ID:</p>
              <div style={{
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: 8,
                padding: '12px 16px',
                fontFamily: 'monospace',
                fontSize: 15,
                color: '#a78bfa',
                letterSpacing: '0.04em',
                marginBottom: 20,
                wordBreak: 'break-all'
              }}>
                {MERCHANT_ID}
              </div>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#22c55e' : 'linear-gradient(90deg,#7c3aed,#06b6d4)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </>
          ) : (
            <p style={{ color: '#94a3b8' }}>Merchant ID not configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}
