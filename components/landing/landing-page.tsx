import Link from 'next/link';
import { HeroSection } from '@/components/landing/sections/hero';
import { GallerySection } from '@/components/landing/sections/gallery';
import { FeaturesSection } from '@/components/landing/sections/features';
import { PricingSection } from '@/components/landing/sections/pricing';
import { SocialProofSection } from '@/components/landing/sections/social-proof';

export function LandingPage() {
  return (
    <div className="container-shell py-8 md:py-10">
      <header className="glass-nav flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight">Vision AI Studio</h1>
        <div className="hidden items-center gap-4 text-sm md:flex">
          <Link href="/signup" className="text-slate-300 hover:text-white">Workflows</Link>
          <Link href="/signin" className="text-slate-300 hover:text-white">Pricing</Link>
        </div>
        <div className="space-x-3 text-sm">
          <Link href="/signin" className="text-slate-300 hover:text-white">Login</Link>
          <Link href="/signup" className="rounded-md bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500">Get Started →</Link>
        </div>
      </header>

      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <PricingSection />
      <SocialProofSection />

      <footer className="mt-12 border-t border-slate-800 py-6 text-sm text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Vision AI Studio · Built by Karishma Kumari</span>
          <div className="flex gap-4">
            <Link href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp: 9818691915</Link>
            <Link href="/signin" className="hover:text-white">Login</Link>
            <Link href="/signup" className="hover:text-white">Sign Up</Link>
          </div>
          <span>Made with AI + Passion in India 🇮🇳</span>
        </div>
      </footer>
    </div>
  );
}
