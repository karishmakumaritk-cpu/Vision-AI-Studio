'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/landing/sections/hero';
import { GallerySection } from '@/components/landing/sections/gallery';
import { FeaturesSection } from '@/components/landing/sections/features';
import { PricingSection } from '@/components/landing/sections/pricing';
import { SocialProofSection } from '@/components/landing/sections/social-proof';

export function LandingPage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="container-shell py-8 md:py-10">
      {/* Animated floating background orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-600/10 blur-3xl" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-1/4 h-72 w-72 animate-pulse rounded-full bg-violet-600/10 blur-3xl" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 h-64 w-64 animate-pulse rounded-full bg-cyan-600/8 blur-3xl" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      {/* Sticky professional navbar */}
      <header className="glass-nav sticky top-0 z-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold shadow-lg shadow-indigo-500/30">V</span>
          <h1 className="text-base font-bold tracking-tight">Vision AI Studio</h1>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/signup" className="text-slate-400 transition-colors hover:text-white">Workflows</Link>
          <Link href="/signin" className="text-slate-400 transition-colors hover:text-white">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/signin" className="text-slate-400 transition-colors hover:text-white">Login</Link>
          <Link href="/signup" className="btn-primary py-2 px-4 text-xs">Get Started →</Link>
        </div>
      </header>

      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <PricingSection />
      <SocialProofSection />

      <footer className="mt-16 border-t border-slate-800/60 pt-8 pb-6 text-sm">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold">V</span>
              <span className="font-semibold text-white">Vision AI Studio</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">India&apos;s #1 Export + AI Automation Platform. Built by Karishma Kumari.</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Quick Links</p>
            <Link href="/signup" className="text-slate-400 transition-colors hover:text-white">Sign Up</Link>
            <Link href="/signin" className="text-slate-400 transition-colors hover:text-white">Login</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Contact</p>
            <Link href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white">WhatsApp: +91 9818691915</Link>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-slate-800/60 pt-4">
          <span className="text-slate-600 text-xs">© {new Date().getFullYear()} Vision AI Studio</span>
          <span className="text-slate-600 text-xs">Made with AI + Passion in India 🇮🇳</span>
        </div>
      </footer>

      {/* AI Chatbot bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="card w-72 overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm">🤖</span>
                <span className="text-sm font-semibold text-white">Vision AI Assistant</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 bg-slate-900">
              <div className="rounded-xl rounded-tl-none bg-slate-800 px-3 py-2.5 text-sm text-slate-200 max-w-[85%]">
                👋 Hi! I&apos;m your Vision AI assistant. Ready to automate your business?
              </div>
              <div className="rounded-xl rounded-tl-none bg-slate-800 px-3 py-2.5 text-sm text-slate-200 max-w-[85%]">
                We build custom AI workflows in 24 hours. What can I help you with?
              </div>
            </div>
            <div className="border-t border-slate-800 p-3 bg-slate-900">
              <Link
                href="https://wa.me/919818691915"
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full justify-center py-2 text-xs"
                onClick={() => setChatOpen(false)}
              >
                💬 Chat on WhatsApp
              </Link>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-2xl shadow-xl shadow-indigo-500/40 transition-transform hover:scale-110 active:scale-95"
          aria-label="Open AI chat assistant"
        >
          {chatOpen ? '✕' : '🤖'}
        </button>
      </div>
    </div>
  );
}
