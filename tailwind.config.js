/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#030303',
          soft: '#080808',
          surface: '#0B0B0B',
          glass: 'rgba(10,10,10,0.82)',
          glassStrong: 'rgba(14,14,14,0.94)',
          border: 'rgba(216,195,165,0.24)',
          borderStrong: 'rgba(201,164,92,0.45)',
          text: '#F5F0E8',
          cream: '#F5F0E8',
          beige: '#D8C3A5',
          gold: '#C9A45C',
          muted: '#C0B9B0',
          darkMuted: '#8B7E71',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 44px rgba(201, 164, 92, 0.24)',
        panel: '0 28px 72px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 15% 20%, rgba(201,164,92,0.26) 0%, rgba(201,164,92,0) 45%), radial-gradient(circle at 78% 0%, rgba(216,195,165,0.2) 0%, rgba(216,195,165,0) 38%)',
      },
    },
  },
  plugins: [],
}
