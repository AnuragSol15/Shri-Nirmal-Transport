/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5722',
          50: '#FFF1EC',
          100: '#FFE0D6',
          200: '#FFC4B0',
          400: '#FF7A52',
          500: '#FF5722',
          600: '#F4511E', // hover
          700: '#C73D14', // pressed
          soft: '#FFF1EC', // light tint bg behind icons / active fills
          'soft-dark': '#2A1810', // dark tint bg
        },
        // Single warm-graphite neutral ramp (replaces zinc/slate/sky/gray everywhere)
        steel: {
          50: '#FAF8F5', // page bg (light)
          100: '#F5F2ED', // surface-2 / sunken
          200: '#EFEAE3', // surface-3 / hover
          300: '#E8E2D9', // border (light)
          400: '#D6CEC2', // border-strong (light)
          500: '#8A8178', // text-3 / muted (light)
          600: '#5C5650', // text-2 / secondary (light)
          700: '#463E37', // border-strong (dark)
          800: '#332D28', // border (dark) / surface-3 (dark)
          850: '#272220', // surface-2 (dark)
          900: '#1F1B18', // surface (dark)
          950: '#161311', // page bg (dark) / graphite band
          1000: '#121009', // footer dark
        },
        success: { DEFAULT: '#1E8E5A', dark: '#34C77F' },
        warning: { DEFAULT: '#C77A0E', dark: '#E5A23A' },
        danger: { DEFAULT: '#D14343', dark: '#E5675C' },
        info: { DEFAULT: '#3A6EA5', dark: '#6BA3D8' }, // never competes with orange
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(70,62,55,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(70,62,55,0.05) 1px, transparent 1px)',
        'grid-lines-dark':
          'linear-gradient(to right, rgba(245,242,237,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,242,237,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        e1: '0 1px 2px rgba(48,38,28,0.06), 0 1px 3px rgba(48,38,28,0.04)',
        e2: '0 4px 12px rgba(48,38,28,0.07), 0 2px 6px rgba(48,38,28,0.05)',
        e3: '0 12px 32px rgba(48,38,28,0.10), 0 4px 12px rgba(48,38,28,0.06)',
        'focus-ring': '0 0 0 3px rgba(255,87,34,0.32)',
        // back-compat aliases so unported class names still resolve during migration:
        glow: '0 0 0 3px rgba(255,87,34,0.32)',
        'glow-sm': '0 4px 12px rgba(48,38,28,0.07), 0 2px 6px rgba(48,38,28,0.05)',
        glass: '0 12px 32px rgba(48,38,28,0.10), 0 4px 12px rgba(48,38,28,0.06)',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'draw-line': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'draw-line': 'draw-line 0.9s ease-in-out both',
      },
    },
  },
  plugins: [],
};
