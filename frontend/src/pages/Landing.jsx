import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import PaymentModal from '../components/PaymentModal';

/* ── colour tokens ── */
const C = {
  bg: '#03030a', s1: '#080812', s2: '#0d0d1a', s3: '#121222',
  a1: '#6c47ff', a2: '#a855f7', a3: '#06b6d4', a4: '#f0abfc',
  ok: '#10b981', warn: '#f59e0b', txt: '#f0eeff', m1: '#9b97c0', m2: '#5c5880',
};

/* ── animated counter ── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(t); }
        else setVal(start);
      }, 20);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── workflow categories ── */
const workflows = [
  { icon: '💬', title: 'Lead Automation', desc: 'WhatsApp AI qualifies leads, syncs to CRM and fires personalised follow-ups — hands-free.', tags: ['WhatsApp', 'CRM', 'n8n'], price: '₹999' },
  { icon: '📦', title: 'Export Docs AI', desc: 'Auto-generate shipping bills, invoices, packing lists and HS-code lookups from a spreadsheet.', tags: ['Export', 'Docs', 'AI'], price: '₹1,499' },
  { icon: '🤖', title: 'AI Support Bot', desc: 'Deploy a trained WhatsApp / web chatbot that answers FAQs and escalates complex queries.', tags: ['Chatbot', 'WhatsApp', 'GPT'], price: '₹2,499' },
  { icon: '🎙', title: 'Voice Agent', desc: 'Outbound AI calling agent that handles sales scripts, appointments and order confirmations.', tags: ['Voice', 'AI', 'Calls'], price: '₹4,999' },
  { icon: '🛒', title: 'E-Commerce Suite', desc: 'Cart recovery, payment links, invoice generation and order confirmations — all on autopilot.', tags: ['Shopify', 'WooCommerce', 'UPI'], price: '₹1,999' },
  { icon: '📊', title: 'Data & Reports', desc: 'Auto-pull data from multiple sources, clean it, and email beautiful dashboards every morning.', tags: ['Analytics', 'Sheets', 'Email'], price: '₹999' },
];

/* ── how it works steps ── */
const steps = [
  { num: '01', title: 'Select Workflow Type', desc: 'Choose from 8 workflow categories. Each is optimised for specific business outcomes.' },
  { num: '02', title: 'Chat with AI Assistant', desc: 'AI collects your business details, tools used, integrations needed, and exact goals.' },
  { num: '03', title: 'Submit — 24h Timer Starts', desc: "Karishma's team sees your project instantly. A specialist is assigned within 2 hours." },
  { num: '04', title: 'Review Live Demo', desc: 'We deliver a working workflow demo. Request changes, then give final approval.' },
  { num: '05', title: 'Pay & Go Live', desc: 'Pay via UPI. Your automation goes live instantly. 30-day support included.' },
];

/* ── payment quick-cards ── */
const payCards = [
  { icon: '⚡', name: 'Lead Workflow', amount: 999, label: 'Single project' },
  { icon: '🚀', name: 'Pro Monthly', amount: 3999, label: 'Per month', pop: true },
  { icon: '📦', name: 'Export Suite', amount: 1999, label: 'Export Docs + HS' },
  { icon: '🎙', name: 'Voice Agent', amount: 4999, label: 'Monthly plan' },
];

export default function Landing() {
  const [modal, setModal] = useState({ open: false, service: '', amount: 999 });

  function openPay(service, amount) { setModal({ open: true, service, amount }); }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.txt, fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(108,71,255,.15),transparent 70%)', top: -100, left: -100, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.12),transparent 70%)', bottom: -100, right: -50, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,.1),transparent 70%)', top: '40%', left: '60%', filter: 'blur(80px)' }} />
      </div>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 5% 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 18px', borderRadius: 24, background: 'rgba(108,71,255,.1)', border: '1px solid rgba(108,71,255,.25)', fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.a4, marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.ok, boxShadow: `0 0 8px ${C.ok}`, display: 'inline-block' }} />
          India's #1 Export + AI Automation Platform
        </div>

        <h1 style={{ fontSize: 'clamp(48px,7.5vw,92px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-3px', marginBottom: 28 }}>
          Build Powerful<br />
          <span style={{ background: `linear-gradient(135deg,${C.a1} 0%,${C.a2} 40%,${C.a3} 80%,${C.a4} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 30px rgba(108,71,255,.4))' }}>AI Workflows</span>
          <br /><span style={{ fontWeight: 300, fontSize: '.95em', letterSpacing: '-2px', color: C.m1 }}>In 24 Hours</span>
        </h1>

        <p style={{ fontSize: 17, color: C.m1, maxWidth: 580, lineHeight: 1.8, marginBottom: 44, fontWeight: 300 }}>
          From Lead Automation to Export Documentation — Vision AI Studio designs, builds, and deploys custom AI workflows for your business. No code. No complexity. Pure results.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
          <Link to="/automations" style={{ padding: '16px 38px', fontSize: 16, borderRadius: 14, border: 'none', background: `linear-gradient(135deg,${C.a1},${C.a2})`, color: '#fff', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(108,71,255,.3)', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(108,71,255,.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,71,255,.3)'; }}>
            Start Your Workflow →
          </Link>
          <Link to="/automations" style={{ padding: '16px 38px', fontSize: 16, borderRadius: 14, border: '1px solid rgba(120,100,255,0.12)', background: 'transparent', color: C.txt, fontWeight: 600, textDecoration: 'none', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,71,255,.5)'; e.currentTarget.style.background = 'rgba(108,71,255,.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(120,100,255,0.12)'; e.currentTarget.style.background = 'transparent'; }}>
            Explore Workflows
          </Link>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(120,100,255,0.12)', borderRadius: 20, overflow: 'hidden', flexWrap: 'wrap' }}>
          {[
            { val: <Counter target={120} />, label: 'Workflows Built' },
            { val: <Counter target={85} />, label: 'Happy Clients' },
            { val: '24h', label: 'Delivery' },
            { val: <><Counter target={99} />%</>, label: 'Satisfaction' },
          ].map((s, i, arr) => (
            <div key={i} style={{ padding: '24px 40px', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(120,100,255,0.12)' : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', background: `linear-gradient(135deg,${C.a1},${C.a2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: C.m2, fontWeight: 500, marginTop: 2, letterSpacing: '.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKFLOWS ── */}
      <section id="workflows" style={{ padding: '100px 5%', position: 'relative', zIndex: 2 }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.a1, padding: '4px 14px', borderRadius: 20, background: 'rgba(108,71,255,.1)', border: '1px solid rgba(108,71,255,.2)', marginBottom: 12 }}>Workflows</span>
        <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 18 }}>All Workflow Categories</h2>
        <p style={{ fontSize: 16, color: C.m1, maxWidth: 540, fontWeight: 300, lineHeight: 1.8 }}>24 ready-to-deploy automations across every business function.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20, marginTop: 56 }}>
          {workflows.map(w => (
            <div key={w.title} style={{ background: C.s2, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28, cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all .3s' }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,71,255,.3)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.5)'; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>{w.icon}</div>
              <div style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'rgba(16,185,129,.15)', color: C.ok, border: '1px solid rgba(16,185,129,.25)', fontFamily: 'monospace' }}>{w.price}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: '-.3px' }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: C.m1, lineHeight: 1.65, marginBottom: 16 }}>{w.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {w.tags.map(t => <span key={t} style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500, background: 'rgba(108,71,255,.1)', color: C.a2, border: '1px solid rgba(108,71,255,.15)' }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: '100px 5%', position: 'relative', zIndex: 2 }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.a1, padding: '4px 14px', borderRadius: 20, background: 'rgba(108,71,255,.1)', border: '1px solid rgba(108,71,255,.2)', marginBottom: 12 }}>The Process</span>
        <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 18 }}>From Idea to Live in 24 Hours</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginTop: 60 }}>
          {/* Steps */}
          <div>
            {steps.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: 20, padding: '26px 0', borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg,${C.a1},${C.a2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, boxShadow: '0 4px 16px rgba(108,71,255,.3)' }}>{step.num}</div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{step.title}</h4>
                  <p style={{ fontSize: 13, color: C.m1, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat demo */}
          <div style={{ background: C.s2, border: '1px solid rgba(120,100,255,0.12)', borderRadius: 20, padding: 24, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${C.a1},${C.a2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Vision AI</div>
                <div style={{ fontSize: 11, color: C.ok }}>● Online — Collecting Requirements</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { me: false, text: 'Namaste! What type of workflow do you need?' },
                { me: true, text: 'Lead automation for export business' },
                { me: false, text: 'Which tools do you use? WhatsApp, Shopify, CRM?' },
                { me: true, text: 'WhatsApp Business + Excel' },
                { me: false, text: 'Perfect! WhatsApp → AI Qualifier → Sheets sync. Est: ₹1,499. Proceed? ✓' },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: msg.me ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: msg.me ? `${C.s3}` : `linear-gradient(135deg,${C.a1},${C.a2})`, border: msg.me ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: msg.me ? C.m1 : '#fff' }}>{msg.me ? 'K' : 'V'}</div>
                  <div style={{ background: msg.me ? 'rgba(108,71,255,.2)' : C.s3, border: `1px solid ${msg.me ? 'rgba(108,71,255,.3)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, borderBottomRightRadius: msg.me ? 4 : 14, borderBottomLeftRadius: msg.me ? 14 : 4, padding: '10px 14px', fontSize: 13, maxWidth: 230, lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '100px 5%', position: 'relative', zIndex: 2, background: C.s1, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.a1, padding: '4px 14px', borderRadius: 20, background: 'rgba(108,71,255,.1)', border: '1px solid rgba(108,71,255,.2)', marginBottom: 12 }}>Pricing</span>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 18 }}>Simple, Transparent Pricing</h2>
          <p style={{ fontSize: 16, color: C.m1, maxWidth: 540, margin: '0 auto', fontWeight: 300, lineHeight: 1.8 }}>Pay per project or subscribe monthly. No hidden costs, no surprises.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
          {[
            { name: 'Starter', price: '₹999', period: '/ project', desc: 'Perfect for single automation needs', feats: ['1 Workflow Type', 'Basic AI Integration', '24h Delivery', '7-day Support', '1 Revision'], amount: 999 },
            { name: 'Pro', price: '₹3,999', period: '/ month', desc: 'For growing businesses needing multiple automations', feats: ['3 Workflows / month', 'Priority 12h Support', 'Advanced Integrations', 'Unlimited Revisions', 'AI Voice Credits', 'Dashboard Access'], amount: 3999, featured: true, badge: 'Most Popular' },
            { name: 'Enterprise', price: 'Custom', period: '', desc: 'For agencies, freight forwarders & large exporters', feats: ['Unlimited Workflows', 'White-label Option', 'Dedicated Worker', 'Custom Integrations', 'SLA Guarantee'], amount: null },
          ].map(plan => (
            <div key={plan.name} style={{ background: plan.featured ? `linear-gradient(135deg,rgba(108,71,255,.1),rgba(168,85,247,.06))` : C.s2, border: `1px solid ${plan.featured ? 'rgba(168,85,247,.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 22, padding: 32, position: 'relative', overflow: 'hidden', transition: 'all .3s' }}
                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.5)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              {plan.badge && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 18px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `linear-gradient(135deg,${C.a1},${C.a2})`, color: '#fff', whiteSpace: 'nowrap' }}>{plan.badge}</div>}
              <div style={{ fontSize: 13, color: C.m1, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', marginBottom: 4 }}>{plan.price} <small style={{ fontSize: 16, fontWeight: 400, color: C.m1 }}>{plan.period}</small></div>
              <div style={{ fontSize: 13, color: C.m1, paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{plan.desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.feats.map(f => <div key={f} style={{ display: 'flex', gap: 10, fontSize: 13 }}><span style={{ color: C.ok, fontWeight: 700 }}>✓</span>{f}</div>)}
              </div>
              <button onClick={() => plan.amount ? openPay(`${plan.name} Plan`, plan.amount) : window.open('https://wa.me/919818691915', '_blank')} style={{ width: '100%', padding: 12, borderRadius: 12, border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.12)', background: plan.featured ? `linear-gradient(135deg,${C.a1},${C.a2})` : 'transparent', color: plan.featured ? '#fff' : C.txt, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {plan.featured ? 'Start Pro Plan →' : plan.amount ? 'Get Started' : 'Talk to Us'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── PAYMENT CTA ── */}
      <section id="pay-section" style={{ padding: '100px 5%', textAlign: 'center', position: 'relative', zIndex: 2, background: `linear-gradient(180deg,transparent,rgba(108,71,255,.05) 50%,transparent)` }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.a1, padding: '4px 14px', borderRadius: 20, background: 'rgba(108,71,255,.1)', border: '1px solid rgba(108,71,255,.2)', marginBottom: 12 }}>Secure Checkout</span>
        <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 18 }}>Ready to Automate?<br />Pay & Go Live in Minutes</h2>
        <p style={{ fontSize: 16, color: C.m1, maxWidth: 540, margin: '0 auto 52px', fontWeight: 300, lineHeight: 1.8 }}>UPI · Paytm · PhonePe · GPay — All supported. Instant confirmation &amp; 24h delivery guaranteed.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 52 }}>
          {payCards.map(p => (
            <div key={p.name} onClick={() => openPay(p.name, p.amount)} style={{ background: p.pop ? 'rgba(108,71,255,.07)' : C.s2, border: `1px solid ${p.pop ? 'rgba(168,85,247,.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 22, padding: '28px 24px', width: 200, cursor: 'pointer', transition: 'all .3s', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.5)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>{p.icon}</div>
              <div style={{ fontSize: 12, color: C.m1, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px', marginBottom: 4 }}>₹{p.amount.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: 11, color: C.m2, marginBottom: 18 }}>{p.label}</div>
              <button style={{ width: '100%', padding: 10, borderRadius: 10, border: `1px solid ${p.pop ? 'none' : 'rgba(108,71,255,.35)'}`, background: p.pop ? `linear-gradient(135deg,${C.a1},${C.a2})` : 'rgba(108,71,255,.1)', color: p.pop ? '#fff' : C.a2, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Pay Now →</button>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 30, fontSize: 13, color: C.m2 }}>
          <span style={{ color: C.ok }}>✓ UPI Verified Merchant</span> &nbsp;·&nbsp;
          <span style={{ color: C.a4 }}>24h Money Back Guarantee</span> &nbsp;·&nbsp;
          100% Secure
        </p>
      </section>

      <Footer />
      <AIAssistant />
      <PaymentModal open={modal.open} onClose={() => setModal(m => ({ ...m, open: false }))} service={modal.service} amount={modal.amount} />
    </div>
  );
}
