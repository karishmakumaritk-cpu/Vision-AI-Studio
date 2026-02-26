import { features } from '@/components/landing/data';

export function FeaturesSection() {
  return (
    <section className="mt-14">
      <div className="mb-8 text-center">
        <span className="section-label">What We Build</span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Everything Your Business Needs</h2>
        <p className="mt-2 text-sm text-slate-500">Powerful AI-driven workflows, delivered in 24 hours.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((item, idx) => (
          <article
            key={item.title}
            className="card feature-pop group relative overflow-hidden p-6"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Subtle top-left accent */}
            <div className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full bg-indigo-600/10 blur-2xl transition-all duration-300 group-hover:bg-indigo-600/20" />
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
