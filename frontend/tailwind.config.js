/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060a14',
          900: '#0a0f1e',
          800: '#0d1526',
          700: '#111d35',
          600: '#172344',
        },
        surface: {
          DEFAULT: '#111827',
          raised: '#1a2235',
          border: '#1e2d4a',
          'border-light': '#243652',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          dark: '#0891b2',
          glow: 'rgba(6, 182, 212, 0.12)',
          'glow-strong': 'rgba(6, 182, 212, 0.25)',
        },
        violet: {
          accent: '#6366f1',
          'accent-dark': '#4f46e5',
          glow: 'rgba(99, 102, 241, 0.12)',
        },
        text: {
          primary: '#eef2ff',
          secondary: '#94a3b8',
          muted: '#64748b',
          accent: '#7dd3fc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(6, 182, 212, 0.15), 0 0 48px rgba(6, 182, 212, 0.08)',
        'glow-violet': '0 0 24px rgba(99, 102, 241, 0.15), 0 0 48px rgba(99, 102, 241, 0.08)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,182,212,0.12) 0%, transparent 70%)',
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(30,45,74,0.6)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.25)' },
        }
      }
    },
  },
  plugins: [],
}

