import { faqs } from '@/components/landing/data';

export function SocialProofSection() {
  return (
    <section className="site-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Testimonial */}
        <article className="wf-card">
          <span className="section-tag">Testimonial</span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '16px', marginBottom: '16px', color: 'var(--txt)' }}>
            What founders say
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--m1)', lineHeight: '1.8', marginBottom: '20px' }}>
            &ldquo;We shipped our AI product in weeks instead of months. Auth, billing, and prompt system were already production-ready.&rdquo;
          </p>
          <p style={{ fontSize: '13px', color: 'var(--m2)' }}>— SaaS Founder, GrowthOps Lab</p>
        </article>

        {/* FAQ */}
        <article className="wf-card">
          <span className="section-tag">FAQ</span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '16px', marginBottom: '16px', color: 'var(--txt)' }}>
            Common Questions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq) => (
              <div key={faq.q}>
                <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: 'var(--txt)' }}>{faq.q}</p>
                <p style={{ fontSize: '13px', color: 'var(--m1)', lineHeight: '1.65' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
