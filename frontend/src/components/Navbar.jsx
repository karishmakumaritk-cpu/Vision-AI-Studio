import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Workflows', path: '/automations' },
    { name: 'Process', path: '/#how' },
    { name: 'Platform', path: '/#dashboard' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Pay', path: '/#pay-section' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%',
      background: scrolled ? 'rgba(3,3,10,0.92)' : 'rgba(3,3,10,0.7)',
      backdropFilter: 'blur(24px) saturate(180%)',
      borderBottom: '1px solid rgba(120,100,255,0.12)',
      boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,.6)' : 'none',
      transition: 'all .3s',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 10 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: 'linear-gradient(135deg,#6c47ff,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 900, color: '#fff',
          boxShadow: '0 0 16px rgba(108,71,255,.5)',
        }}>V</div>
        <span style={{ fontWeight: 800, fontSize: 16, color: '#f0eeff', letterSpacing: '-0.5px' }}>Vision AI Studio</span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}
           className="nav-links-desktop">
        {navLinks.map(l => (
          <Link key={l.name} to={l.path} style={{
            color: location.pathname === l.path ? '#f0eeff' : '#9b97c0',
            textDecoration: 'none', fontSize: 14, fontWeight: 500,
            letterSpacing: '.3px', transition: 'color .2s',
          }}
          onMouseEnter={e => e.target.style.color = '#f0eeff'}
          onMouseLeave={e => e.target.style.color = location.pathname === l.path ? '#f0eeff' : '#9b97c0'}>
            {l.name}
          </Link>
        ))}
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link to="/login" style={{
          padding: '9px 20px', borderRadius: 10, border: '1px solid rgba(120,100,255,0.12)',
          background: 'transparent', color: '#f0eeff', fontSize: 13, fontWeight: 500,
          textDecoration: 'none', transition: 'all .25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,71,255,.5)'; e.currentTarget.style.background = 'rgba(108,71,255,.08)'; e.currentTarget.style.color = '#a855f7'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(120,100,255,0.12)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f0eeff'; }}>
          Login
        </Link>
        <Link to="/signup" style={{
          padding: '10px 22px', borderRadius: 10, border: 'none',
          background: 'linear-gradient(135deg,#6c47ff,#a855f7)',
          color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
          transition: 'all .25s', boxShadow: '0 4px 16px rgba(108,71,255,.3)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,71,255,.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(108,71,255,.3)'; }}>
          Get Started →
        </Link>
      </div>
    </nav>
  );
}
