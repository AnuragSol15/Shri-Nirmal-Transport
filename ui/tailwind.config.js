/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5722',
          50: '#FFF3EF',
          100: '#FFE0D6',
          400: '#FF7A52',
          500: '#FF5722',
          600: '#E64A19',
          700: '#D84315',
        },
        secondary: {
          DEFAULT: '#1E3A8A',
          800: '#1B3478',
          900: '#162B63',
        },
        // Premium slate/navy hierarchy
        ink: {
          950: '#070B16',
          900: '#0B1220',
          800: '#111A2E',
          700: '#1A263F',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)',
        'dot-matrix':
          'radial-gradient(circle, rgba(255,87,34,0.18) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(255,87,34,0.18) 0%, transparent 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
        'dot-lg': '22px 22px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,87,34,0.25), 0 18px 60px -15px rgba(255,87,34,0.45)',
        'glow-sm': '0 10px 40px -12px rgba(255,87,34,0.4)',
        glass: '0 20px 60px -20px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
