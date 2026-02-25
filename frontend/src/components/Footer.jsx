export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 5%',
      position: 'relative', zIndex: 2,
      background: '#080812',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: 40,
        marginBottom: 40,
      }}>
        {/* Brand */}
        <div>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg,#6c47ff,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 900, color: '#fff',
            }}>V</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: '#f0eeff' }}>Vision AI Studio</span>
          </a>
          <p style={{ fontSize: 13, color: '#9b97c0', lineHeight: 1.8, fontWeight: 300, marginTop: 12 }}>
            India's leading Export + AI Automation platform. We build custom workflows that save time, reduce errors, and grow revenue.
          </p>
        </div>

        {/* Workflows */}
        <div>
          <h5 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5c5880', marginBottom: 16 }}>Workflows</h5>
          {['Lead Automation', 'Export Docs AI', 'AI Support Bot', 'Voice Agent'].map(item => (
            <a key={item} href="#" style={{ display: 'block', fontSize: 13, color: '#9b97c0', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
               onMouseEnter={e => e.target.style.color = '#f0abfc'}
               onMouseLeave={e => e.target.style.color = '#9b97c0'}>{item}</a>
          ))}
        </div>

        {/* Company */}
        <div>
          <h5 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5c5880', marginBottom: 16 }}>Company</h5>
          {[
            { label: 'About Karishma', href: '#' },
            { label: 'How It Works', href: '#' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Reviews', href: '#' },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ display: 'block', fontSize: 13, color: '#9b97c0', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
               onMouseEnter={e => e.target.style.color = '#f0abfc'}
               onMouseLeave={e => e.target.style.color = '#9b97c0'}>{item.label}</a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h5 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5c5880', marginBottom: 16 }}>Contact</h5>
          {[
            { label: 'WhatsApp Us', href: 'https://wa.me/919818691915' },
            { label: '9818691915', href: 'tel:919818691915' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Use', href: '#' },
          ].map(item => (
            <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
               style={{ display: 'block', fontSize: 13, color: '#9b97c0', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
               onMouseEnter={e => e.target.style.color = '#f0abfc'}
               onMouseLeave={e => e.target.style.color = '#9b97c0'}>{item.label}</a>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: 12, color: '#5c5880' }}>© {new Date().getFullYear()} Vision AI Studio · Built by Karishma Kumari</p>
        <p style={{ fontSize: 12, color: '#f0abfc' }}>Made with AI + Passion in India 🇮🇳</p>
      </div>
    </footer>
  );
}
