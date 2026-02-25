import React from 'react';

export default function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <img src="/assets/logo.png" alt="Vision AI Studio logo" style={{ width: 40, height: 40, borderRadius: 8 }} />
      <span style={{ fontWeight: 800, fontSize: 18 }}>Vision AI Studio</span>
    </header>
  );
}
