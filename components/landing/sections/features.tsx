'use client';

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
            className="card feature-pop group relative overflow-hidden p-6 cursor-default transition-transform duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Subtle top-left accent */}
            <div className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full bg-indigo-600/10 blur-2xl transition-all duration-300 group-hover:bg-indigo-600/25 group-hover:h-24 group-hover:w-24" />
            {/* Right-bottom accent on hover */}
            <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 rounded-full bg-violet-600/0 blur-2xl transition-all duration-300 group-hover:bg-violet-600/15 group-hover:h-20 group-hover:w-20" />
            <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
            <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 group-hover:w-12 rounded-full" />
          </article>
        ))}
      </div>
    </section>
  );
}
