import React from 'react';

export default function Header() {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <img
        src="/assets/logo.png"
        alt="Vision AI Studio"
        style={{ height: 48, width: 'auto', objectFit: 'contain' }}
      />
      <span style={{ fontSize: 20, fontWeight: 700, color: '#1e1b4b' }}>Vision AI Studio</span>
    </header>
  );
}
