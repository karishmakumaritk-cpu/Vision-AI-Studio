import Image from 'next/image';
import { gallery } from '@/components/landing/data';

export function GallerySection() {
  return (
    <section className="site-section">
      <div className="text-center mb-14">
        <span className="section-tag">Platform</span>
        <h2 className="section-title">Built for Modern AI Products</h2>
        <p className="section-sub mx-auto">
          Explore workflow automation, growth analytics, and execution team features.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {gallery.map((item) => (
          <article key={item.caption} className="wf-card" style={{ padding: '12px' }}>
            <div className="relative overflow-hidden rounded-xl mb-3" style={{ height: '176px' }}>
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
            <p style={{ padding: '4px 8px', fontSize: '13px', fontWeight: 500, color: 'var(--m1)' }}>
              {item.caption}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
