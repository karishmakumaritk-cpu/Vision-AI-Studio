import Image from 'next/image';
import { gallery } from '@/components/landing/data';

export function GallerySection() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-3">
      {gallery.map((item, idx) => (
        <article key={item.caption} className="image-card card p-2" style={{ animationDelay: `${idx * 120}ms` }}>
          <div className="relative h-44 overflow-hidden rounded-lg">
            <Image src={item.src} alt={item.alt} fill className="object-cover" />
          </div>
          <p className="px-2 py-2 text-sm text-slate-300">{item.caption}</p>
        </article>
      ))}
    </section>
  );
}
