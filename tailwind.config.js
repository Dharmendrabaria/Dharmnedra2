/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: { DEFAULT: '#0A0A0A', card: '#0D0D0D', border: '#1a1a2e' },
        charcoal: '#111827',
        primary: { DEFAULT: '#2563EB', light: '#3b82f6', dark: '#1d4ed8' },
        secondary: { DEFAULT: '#7C3AED', light: '#8b5cf6' },
        accent: { DEFAULT: '#06B6D4', light: '#22d3ee' },
        green: { glow: '#22c55e' },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        fira: ['"Fira Code"', 'monospace'],
        syne: ['Syne', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'blob': 'blob 12s infinite alternate',
        'shimmer': 'shimmer 2s infinite',
        'draw-line': 'draw-line 1.5s ease forwards',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-reverse': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.8)', opacity: '1' }, '100%': { transform: 'scale(2)', opacity: '0' } },
        'gradient-shift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        blob: {
          '0%': { transform: 'translate(0px,0px) scale(1)' },
          '33%': { transform: 'translate(60px,-80px) scale(1.2)' },
          '66%': { transform: 'translate(-40px,40px) scale(0.8)' },
          '100%': { transform: 'translate(0px,0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'draw-line': { '0%': { height: '0%' }, '100%': { height: '100%' } },
      },
      backgroundSize: { '300%': '300%' },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37,99,235,0.4), 0 0 60px rgba(37,99,235,0.2)',
        'glow-purple': '0 0 20px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)',
        'card': '0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      dropShadow: {
        'glow': '0 0 10px rgba(37,99,235,0.8)',
      },
      blur: { xs: '2px' },
    },
  },
  plugins: [],
}
