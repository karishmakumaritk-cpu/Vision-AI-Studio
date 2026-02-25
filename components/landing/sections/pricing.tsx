import Link from 'next/link';
import { plans } from '@/components/landing/data';

export function PricingSection() {
  return (
    <section id="pricing" className="site-section" style={{ background: 'var(--s1)' }}>
      <div className="text-center">
        <span className="section-tag">Pricing</span>
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-sub mx-auto">
          Start free, grow on Pro, scale on Premium. No hidden costs, no surprises.
        </p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan, idx) => (
          <article key={plan.name} className={`price-card${idx === 1 ? ' featured' : ''}`}>
            {idx === 1 && <div className="pop-badge">Most Popular</div>}
            <div className="pc-plan">{plan.name}</div>
            <div className="pc-price">
              {plan.price} <small>/ month</small>
            </div>
            <div className="pc-desc">{plan.desc}</div>
            <div className="pc-feats">
              {plan.desc.split(' • ').map((feat) => (
                <div key={feat} className="pf">
                  <span className="pf-ok">✓</span> {feat}
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/billing"
              className={idx === 1 ? 'btn-primary' : 'btn-ghost'}
              style={{ width: '100%', padding: '12px' }}
            >
              {idx === 1 ? <span>Start {plan.name} Plan →</span> : `Choose ${plan.name}`}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
