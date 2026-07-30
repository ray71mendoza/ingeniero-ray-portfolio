/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#090B10',
          surface: '#111520',
          'card-dark': 'rgba(18, 22, 33, 0.7)',
          'border-dark': 'rgba(255, 255, 255, 0.08)',
          light: '#F8FAFC',
          'surface-light': '#FFFFFF',
          'card-light': 'rgba(255, 255, 255, 0.85)',
          'border-light': 'rgba(0, 0, 0, 0.06)',
        },
        neon: {
          cyan: '#00F2FE',
          purple: '#7000FF',
          blue: '#4FACFE',
          emerald: '#10B981',
          indigo: '#6D28D9',
          cobalt: '#2563EB',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 242, 254, 0.25)',
        'neon-purple': '0 0 25px rgba(112, 0, 255, 0.25)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
