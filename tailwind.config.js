/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050B18',
          900: '#081426',
          800: '#0B1B33',
          700: '#16304E',
          600: '#1E3A5F',
        },
        bone: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
        ember: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
      boxShadow: {
        glow: '0 0 24px 0 rgba(37, 99, 235, 0.30)',
        'glow-sm': '0 0 14px 0 rgba(37, 99, 235, 0.25)',
        'glow-lg': '0 8px 40px -10px rgba(37, 99, 235, 0.45)',
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        display: ['"Sora"', '"Inter"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.25em',
      },
      maxWidth: {
        prose: '65ch',
        readable: '75ch',
      },
    },
  },
  plugins: [],
}
