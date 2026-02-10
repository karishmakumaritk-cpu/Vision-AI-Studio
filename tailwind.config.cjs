module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#8B5CF6',
        'primary-blue': '#3B82F6',
        'primary-orange': '#FF4A00',
        'bg-cream': '#FFF8F0',
        'bg-light': '#F9FAFB',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280'
      },
      fontFamily: {
        heading: ['Inter', 'SF Pro Display', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        'h1': ['4.5rem', { lineHeight: '1.05' }],
        'h2': ['3rem', { lineHeight: '1.05' }],
        'h3': ['2rem', { lineHeight: '1.1' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6' }]
      },
      borderRadius: {
        'xl-2': '24px'
      },
      boxShadow: {
        'zap-card': '0 10px 30px rgba(16,24,40,0.08)',
        'zap-strong': '0 20px 50px rgba(16,24,40,0.12)'
      }
    }
  },
  plugins: []
};
