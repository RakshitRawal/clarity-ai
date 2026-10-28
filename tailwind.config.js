/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#6366f1', // electric indigo
          700: '#4f46e5',
          800: '#4338ca',
          900: '#3730a3',
          950: '#1e1b4b',
        },
        navy: {
          800: '#0f172a',
          850: '#0b1120',
          900: '#070d19',
          950: '#030712',
        },
        charcoal: {
          800: '#1e222a',
          850: '#181b22',
          900: '#12141a',
          950: '#0c0e12',
        },
        evidence: {
          supported: {
            bg: 'rgba(16, 185, 129, 0.1)',
            border: '#10b981',
            text: '#059669',
            darkText: '#34d399',
          },
          contradicted: {
            bg: 'rgba(239, 68, 68, 0.1)',
            border: '#ef4444',
            text: '#dc2626',
            darkText: '#f87171',
          },
          review: {
            bg: 'rgba(245, 158, 11, 0.1)',
            border: '#f59e0b',
            text: '#d97706',
            darkText: '#fbbf24',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(99, 102, 241, 0.25)',
        'glow': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
