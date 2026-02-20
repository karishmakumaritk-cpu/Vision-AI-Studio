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
        <div className="space-x-3 text-sm">
          <Link href="/signin" className="text-slate-300 hover:text-white">Login</Link>
          <Link href="/signup" className="rounded-md bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500">Get Started</Link>
        </div>
      </header>

      <HeroSection />
      <GallerySection />
      <FeaturesSection />
      <PricingSection />
      <SocialProofSection />

      <footer className="mt-12 border-t border-slate-800 py-6 text-sm text-slate-400">
        © {new Date().getFullYear()} Vision AI Studio · Terms · Privacy · Contact · Docs
      </footer>
    </div>
  );
}
