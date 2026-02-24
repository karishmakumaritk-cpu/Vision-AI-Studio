import { features } from '@/components/landing/data';

export function FeaturesSection() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-2">
      {features.map((item, idx) => (
        <article key={item.title} className="card feature-pop p-5" style={{ animationDelay: `${idx * 80}ms` }}>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
        </article>
      ))}
    </section>
  );
}
