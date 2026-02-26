import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '@/components/providers';

const inter = localFont({
  src: [
    { path: '../public/fonts/inter-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Vision AI Studio — India\'s #1 Export + AI Automation Platform',
  description: 'Build powerful AI workflows in 24 hours. Lead Automation, Export Docs, AI Support Bot, Voice Agent & more. Pay via UPI. Made in India.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
