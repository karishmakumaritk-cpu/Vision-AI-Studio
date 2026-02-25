import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgba(120,100,255,0.12)',
        card: '#0d0d1a',
        muted: '#9b97c0',
        brand: '#6c47ff',
        'v-bg':  '#03030a',
        'v-s1':  '#080812',
        'v-s2':  '#0d0d1a',
        'v-s3':  '#121222',
        'v-a1':  '#6c47ff',
        'v-a2':  '#a855f7',
        'v-a3':  '#06b6d4',
        'v-a4':  '#f0abfc',
        'v-txt': '#f0eeff',
        'v-m1':  '#9b97c0',
        'v-m2':  '#5c5880'
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
