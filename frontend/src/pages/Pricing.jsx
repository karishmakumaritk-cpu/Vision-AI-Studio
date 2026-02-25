import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentModal from '../components/PaymentModal';

const plans = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/ project',
    desc: 'Perfect for single automation needs',
    features: ['1 Workflow Type', 'Basic AI Integration', '24h Delivery', '7-day Support', '1 Revision'],
    cta: 'Get Started',
    featured: false,
    amount: 999,
  },
  {
    name: 'Pro',
    price: '₹3,999',
    period: '/ month',
    desc: 'For growing businesses needing multiple automations',
    features: ['3 Workflows / month', 'Priority 12h Support', 'Advanced Integrations', 'Unlimited Revisions', 'AI Voice Credits', 'Dashboard Access'],
    cta: 'Start Pro Plan →',
    featured: true,
    badge: 'Most Popular',
    amount: 3999,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For agencies, freight forwarders & large exporters',
    features: ['Unlimited Workflows', 'White-label Option', 'Dedicated Worker', 'Custom Integrations', 'SLA Guarantee'],
    cta: 'Talk to Us',
    featured: false,
    amount: null,
  },
];

const cardStyle = (featured) => ({
  background: featured ? 'linear-gradient(135deg,rgba(108,71,255,.1),rgba(168,85,247,.06))' : '#0d0d1a',
  border: `1px solid ${featured ? 'rgba(168,85,247,.4)' : 'rgba(255,255,255,0.06)'}`,
  borderRadius: 22,
  padding: 32,
  position: 'relative',
  transition: 'all .3s',
  overflow: 'hidden',
});

export default function Pricing() {
  const [modal, setModal] = useState({ open: false, service: '', amount: 999 });

  function openPay(plan) {
    if (!plan.amount) {
      window.open('https://wa.me/919818691915?text=' + encodeURIComponent('Hi! I am interested in the Enterprise plan.'), '_blank');
      return;
    }
    setModal({ open: true, service: `${plan.name} Plan`, amount: plan.amount });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#03030a', color: '#f0eeff', fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />
      <section style={{ padding: '120px 5% 80px', position: 'relative', zIndex: 2 }}>
        {/* Background orbs */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(108,71,255,0.12),transparent 70%)', top: -100, left: -100, filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,0.1),transparent 70%)', bottom: -100, right: -50, filter: 'blur(80px)' }} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 52, position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6c47ff', padding: '4px 14px', borderRadius: 20, background: 'rgba(108,71,255,.1)', border: '1px solid rgba(108,71,255,.2)', marginBottom: 12 }}>Pricing</span>
          <h1 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 18 }}>Simple, Transparent Pricing</h1>
          <p style={{ fontSize: 16, color: '#9b97c0', maxWidth: 540, margin: '0 auto', fontWeight: 300, lineHeight: 1.8 }}>Pay per project or subscribe monthly. No hidden costs, no surprises.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {plans.map(plan => (
            <div key={plan.name} style={cardStyle(plan.featured)}
                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.5)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              {plan.badge && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'linear-gradient(135deg,#6c47ff,#a855f7)', color: '#fff', boxShadow: '0 4px 20px rgba(108,71,255,.3)', whiteSpace: 'nowrap' }}>{plan.badge}</div>
              )}
              <div style={{ fontSize: 13, color: '#9b97c0', marginBottom: 8, fontWeight: 500 }}>{plan.name}</div>
              <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', marginBottom: 4 }}>
                {plan.price} <small style={{ fontSize: 16, fontWeight: 400, color: '#9b97c0', letterSpacing: 0 }}>{plan.period}</small>
              </div>
              <div style={{ fontSize: 13, color: '#9b97c0', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{plan.desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, fontSize: 13, alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', flexShrink: 0, fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => openPay(plan)} style={{
                width: '100%', padding: 12, borderRadius: 12, border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.12)',
                background: plan.featured ? 'linear-gradient(135deg,#6c47ff,#a855f7)' : 'transparent',
                color: plan.featured ? '#fff' : '#f0eeff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'all .25s',
              }}
              onMouseEnter={e => { if (!plan.featured) { e.currentTarget.style.borderColor = 'rgba(108,71,255,.5)'; e.currentTarget.style.background = 'rgba(108,71,255,.08)'; }}}
              onMouseLeave={e => { if (!plan.featured) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'transparent'; }}}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <PaymentModal open={modal.open} onClose={() => setModal(m => ({ ...m, open: false }))} service={modal.service} amount={modal.amount} />
    </div>
  );
}
