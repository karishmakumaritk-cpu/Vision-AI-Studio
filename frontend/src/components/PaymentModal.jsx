import { useState } from 'react';

const UPI_ID = 'paytmqr5trrzi@ptys';
const MERCHANT_NAME = 'Karishma Kumari';
const PHONE = '9818691915';

const s = {
  overlay: { position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modal: { background: '#0d0d1a', border: '1px solid rgba(168,85,247,.3)', borderRadius: 26, width: '100%', maxWidth: 500, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(108,71,255,.1)' },
  hdr: { padding: '22px 26px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'linear-gradient(135deg,rgba(108,71,255,.12),rgba(168,85,247,.06))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  body: { padding: '22px 26px' },
  closeBtn: { width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', background: '#121222', color: '#9b97c0', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  orderSum: { background: '#121222', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 20 },
  orow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13 },
  tabs: { display: 'flex', gap: 8, marginBottom: 18 },
  tab: (active) => ({ flex: 1, padding: 10, borderRadius: 10, border: active ? '1px solid rgba(108,71,255,.4)' : '1px solid rgba(255,255,255,0.06)', background: active ? 'rgba(108,71,255,.15)' : '#121222', color: active ? '#f0abfc' : '#9b97c0', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }),
  ctaBtn: { width: '100%', padding: 15, borderRadius: 13, border: 'none', background: 'linear-gradient(135deg,#6c47ff,#a855f7)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 32px rgba(108,71,255,.3)' },
  upiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 },
  uapp: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: '#121222', cursor: 'pointer', fontSize: 11, color: '#9b97c0' },
  copyBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#121222', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, cursor: 'pointer' },
  successRing: { width: 80, height: 80, borderRadius: '50%', margin: '0 auto 22px', background: 'linear-gradient(135deg,#10b981,#0aab6c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 900, boxShadow: '0 0 0 12px rgba(16,185,129,.12),0 0 40px rgba(16,185,129,.3)' },
};

const UPI_APPS = [
  { name: 'Paytm', bg: 'linear-gradient(135deg,#002970,#00baf2)', label: 'P' },
  { name: 'PhonePe', bg: 'linear-gradient(135deg,#5f259f,#5f259f)', label: 'Pe' },
  { name: 'GPay', bg: 'linear-gradient(135deg,#4285f4,#34a853)', label: 'G' },
  { name: 'BHIM', bg: 'linear-gradient(135deg,#f26522,#f26522)', label: 'B' },
];

export default function PaymentModal({ open, onClose, service = 'Vision AI Studio', amount = 999 }) {
  const [tab, setTab] = useState('qr');
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  function launchUPI() {
    window.location.href = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR`;
  }

  function copyUpiId() {
    navigator.clipboard.writeText(UPI_ID).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  function handlePaid() { setSuccess(true); }

  function handleClose() { setSuccess(false); setTab('qr'); onClose(); }

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

  return (
    <div style={s.overlay} onClick={e => e.target === e.currentTarget && handleClose()}>
      <div style={s.modal}>
        {!success ? (
          <>
            <div style={s.hdr}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.5px' }}>Complete Payment</h3>
                <p style={{ fontSize: 12, color: '#9b97c0', marginTop: 2 }}>Secure checkout — Vision AI Studio</p>
              </div>
              <button style={s.closeBtn} onClick={handleClose}>×</button>
            </div>
            <div style={s.body}>
              {/* Order summary */}
              <div style={s.orderSum}>
                <div style={s.orow}><span style={{ color: '#9b97c0' }}>Service</span><strong>{service}</strong></div>
                <div style={s.orow}><span style={{ color: '#9b97c0' }}>Delivery</span><strong style={{ color: '#10b981' }}>Within 24 hours</strong></div>
                <div style={s.orow}><span style={{ color: '#9b97c0' }}>Support</span><strong>30-day included</strong></div>
                <div style={{ ...s.orow, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: 0 }}>
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <strong style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-1px', color: '#10b981' }}>{fmt(amount)}</strong>
                </div>
              </div>

              {/* Tabs */}
              <div style={s.tabs}>
                {[['qr','Scan & Pay'],['apps','UPI Apps'],['id','UPI ID']].map(([k,label]) => (
                  <button key={k} style={s.tab(tab===k)} onClick={() => setTab(k)}>{label}</button>
                ))}
              </div>

              {/* QR Tab */}
              {tab === 'qr' && (
                <div>
                  <div style={{ background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 14 }}>
                    {/* QR placeholder — shows UPI details visually */}
                    <div style={{ width: 170, height: 170, margin: '0 auto', background: '#f8f8f8', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #e5e7eb' }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>📱</div>
                      <div style={{ fontSize: 11, color: '#374151', fontWeight: 600 }}>Scan with UPI App</div>
                      <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4, wordBreak: 'break-all', padding: '0 8px' }}>{UPI_ID}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{MERCHANT_NAME}</div>
                    <div style={{ fontSize: 12, color: '#9b97c0' }}>{PHONE}</div>
                  </div>
                  <button style={s.ctaBtn} onClick={handlePaid}><span>I Have Completed Payment ✓</span></button>
                </div>
              )}

              {/* UPI Apps Tab */}
              {tab === 'apps' && (
                <div>
                  <div style={s.upiGrid}>
                    {UPI_APPS.map(app => (
                      <button key={app.name} style={s.uapp} onClick={launchUPI}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>{app.label}</div>
                        {app.name}
                      </button>
                    ))}
                  </div>
                  <button style={s.ctaBtn} onClick={handlePaid}><span>I Have Completed Payment ✓</span></button>
                </div>
              )}

              {/* UPI ID Tab */}
              {tab === 'id' && (
                <div>
                  <div style={s.copyBox} onClick={copyUpiId}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#f0abfc' }}>{UPI_ID}</span>
                    <span style={{ fontSize: 12, color: copied ? '#10b981' : '#9b97c0' }}>{copied ? '✓ Copied' : 'Copy'}</span>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 13, color: '#9b97c0' }}>
                    Pay <strong style={{ color: '#f0eeff' }}>{fmt(amount)}</strong> to {MERCHANT_NAME}
                  </div>
                  <button style={s.ctaBtn} onClick={handlePaid}><span>I Have Completed Payment ✓</span></button>
                </div>
              )}

              <div style={{ textAlign: 'center', fontSize: 11, color: '#5c5880', marginTop: 12 }}>
                <span style={{ color: '#10b981' }}>✓ UPI Verified</span> · Secured · 24h delivery guaranteed
              </div>
            </div>
          </>
        ) : (
          /* Success screen */
          <div style={{ textAlign: 'center', padding: '44px 28px' }}>
            <div style={s.successRing}>✓</div>
            <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-.5px', marginBottom: 10 }}>Payment Submitted!</h3>
            <p style={{ color: '#9b97c0', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              Team will verify &amp; start your project within <strong style={{ color: '#10b981' }}>2 hours</strong>.<br/>
              WhatsApp the payment screenshot to confirm.
            </p>
            <div style={{ background: '#121222', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 18, marginBottom: 20, textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: '#5c5880', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Next Steps</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                {[
                  `WhatsApp screenshot to ${PHONE}`,
                  'Team confirms payment (2h)',
                  'Workflow build starts immediately',
                  'You receive demo + delivery in 24h',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(108,71,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#a855f7' }}>{i + 1}</div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <a href={`https://wa.me/91${PHONE}?text=${encodeURIComponent('Hi! I have completed payment for Vision AI Studio. Please find my payment screenshot attached.')}`}
               target="_blank" rel="noreferrer"
               style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: 15, borderRadius: 13, background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 8px 24px rgba(37,211,102,.3)' }}>
              📱 Send on WhatsApp
            </a>
            <button onClick={handleClose} style={{ marginTop: 12, background: 'none', border: 'none', color: '#5c5880', fontSize: 13, cursor: 'pointer' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
