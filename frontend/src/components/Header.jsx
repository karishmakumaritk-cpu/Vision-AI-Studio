import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img
            src="/assets/logo.png"
            alt="Vision AI Studio logo"
            style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }}
          />
          <span style={{ fontWeight: 800, fontSize: 18, color: '#f1f5f9' }}>Vision AI Studio</span>
        </Link>
      </div>
    </header>
  );
}
