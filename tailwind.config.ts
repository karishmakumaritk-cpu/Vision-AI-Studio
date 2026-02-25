import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-inter)', 'sans-serif'] },
      colors: {
        brand: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          500: '#6c47ff',
          600: '#5835e8',
          700: '#4523d0',
          900: '#1a0a6e',
        },
      },
    },
  },
  plugins: [],
}
export default config
