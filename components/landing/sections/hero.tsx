'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

function StatPill({ value, label }: { value: string; label: string }) {
  const numericTarget = parseInt(value.replace(/\D/g, ''), 10)
  const unit = value.match(/[^\d]+$/)?.[0] ?? ''
  const animated = useCountUp(numericTarget)
  return (
    <span className="stat-pill">
      <strong className="text-white font-semibold">{animated}{unit}</strong> {label}
    </span>
  )
}

export function HeroSection() {
  return (
    <section className="hero-animated relative mt-8 overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/60 p-8 md:p-16">
      <div className="hero-glow" />
      {/* Second subtle glow on the right */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
      <span className="section-label">🇮🇳 India&apos;s #1 Export + AI Automation Platform</span>
      <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
        Build Powerful{' '}
        <span
          className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
        >
          AI Workflows
        </span>
        <br />In 24 Hours
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
        From Lead Automation to Export Documentation — Vision AI Studio designs, builds, and deploys custom AI workflows for your business. No code. No complexity. Pure results.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/signup" className="btn-primary text-sm px-6 py-3">Start Your Workflow →</Link>
        <Link href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="btn-outline text-sm px-6 py-3">
          💬 WhatsApp Us
        </Link>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <StatPill value="120+" label="Workflows Built" />
        <StatPill value="85+" label="Happy Clients" />
        <StatPill value="24h" label="Delivery" />
        <StatPill value="99%" label="Satisfaction" />
      </div>
    </section>
  );
}
