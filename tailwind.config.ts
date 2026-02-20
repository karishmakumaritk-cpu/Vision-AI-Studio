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
        border: '#26314a',
        card: '#121a2e',
        muted: '#94a3b8',
        brand: '#6366f1'
      }
    }
  },
  plugins: []
};

export default config;
