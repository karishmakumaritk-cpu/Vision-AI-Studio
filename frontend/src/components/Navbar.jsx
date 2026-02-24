import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Automations', path: '/automations' },
    { name: 'Request Custom', path: '/request' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
        <Link to="/" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }} />
          <div style={{ fontWeight: 800 }}>Vision AI Studio</div>
        </Link>

        <div style={{ display: 'flex', gap: 16 }}>
          {navLinks.map(l => <Link key={l.path} to={l.path} style={{ color: isActive(l.path) ? '#a78bfa' : '#cbd5e1' }}>{l.name}</Link>)}
        </div>

        <button onClick={() => setIsOpen(v => !v)} style={{ display: 'none' }} aria-hidden>Menu</button>
      </div>

      {isOpen && (
        <div style={{ padding: 12 }}>
          {navLinks.map(l => <Link key={l.path} to={l.path} onClick={() => setIsOpen(false)} style={{ display: 'block', padding: 8 }}>{l.name}</Link>)}
        </div>
      )}
    </nav>
  );
}
