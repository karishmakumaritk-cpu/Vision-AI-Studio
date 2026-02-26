import Link from 'next/link';
import { HeroSection } from '@/components/landing/sections/hero';
import { GallerySection } from '@/components/landing/sections/gallery';
import { FeaturesSection } from '@/components/landing/sections/features';
import { PricingSection } from '@/components/landing/sections/pricing';
import { SocialProofSection } from '@/components/landing/sections/social-proof';

export function LandingPage() {
  return (
    <div className="container-shell py-8 md:py-10">
      {/* Sticky professional navbar */}
      <header className="glass-nav flex items-center justify-between gap-4">
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
    </div>
  );
}
