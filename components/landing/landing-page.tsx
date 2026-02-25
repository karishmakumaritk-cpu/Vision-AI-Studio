import Link from 'next/link';
import { HeroSection } from '@/components/landing/sections/hero';
import { GallerySection } from '@/components/landing/sections/gallery';
import { FeaturesSection } from '@/components/landing/sections/features';
import { PricingSection } from '@/components/landing/sections/pricing';
import { SocialProofSection } from '@/components/landing/sections/social-proof';

export function LandingPage() {
  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* Fixed navigation */}
      <nav className="site-nav">
        <Link
          href="/"
          style={{
            background: 'linear-gradient(135deg,#6c47ff,#a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            textDecoration: 'none'
          }}
        >
          Vision AI Studio
        </Link>

        <div className="nav-links hidden md:flex items-center gap-9">
          <Link href="#features" style={{ color: 'var(--m1)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>Features</Link>
          <Link href="#pricing"  style={{ color: 'var(--m1)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>Pricing</Link>
          <Link href="/dashboard" style={{ color: 'var(--m1)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>Dashboard</Link>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/signin" className="btn-ghost">Login</Link>
          <Link href="/signup" className="btn-primary"><span>Get Started</span></Link>
        </div>
      </nav>

      <main>
        <HeroSection />
        <GallerySection />
        <FeaturesSection />
        <PricingSection />
        <SocialProofSection />
      </main>

      <footer className="site-footer">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: 'var(--m2)' }}>
            © {new Date().getFullYear()} Vision AI Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Terms', 'Privacy', 'Contact', 'Docs'].map((label) => (
              <Link key={label} href="#" style={{ color: 'var(--m1)', fontSize: '13px', textDecoration: 'none', transition: 'color .2s' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
