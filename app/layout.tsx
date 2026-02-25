import './globals.css';
import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Vision AI Studio',
  description: 'Production-ready AI SaaS starter similar to Tixu.ai'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jetbrainsMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
