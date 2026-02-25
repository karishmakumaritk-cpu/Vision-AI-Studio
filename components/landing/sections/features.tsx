import { features } from '@/components/landing/data';

export function FeaturesSection() {
  return (
    <section id="features" className="site-section" style={{ background: 'var(--s1)' }}>
      <div className="text-center mb-14">
        <span className="section-tag">What We Offer</span>
        <h2 className="section-title">Everything You Need to Launch</h2>
        <p className="section-sub mx-auto">
          From AI content generation to subscription billing and admin oversight — fully integrated.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((item) => (
          <article key={item.title} className="wf-card">
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-.3px', color: 'var(--txt)' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--m1)', lineHeight: '1.65' }}>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
