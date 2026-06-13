import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1f2937',
            lineHeight: '1.8',
            h1: { color: '#111827', fontWeight: '800' },
            h2: { color: '#111827', fontWeight: '700', marginTop: '2em' },
            h3: { color: '#111827', fontWeight: '600' },
            a: { color: '#2563eb', textDecoration: 'underline' },
            'a:hover': { color: '#1d4ed8' },
            strong: { color: '#111827' },
            blockquote: {
              borderLeftColor: '#3b82f6',
              backgroundColor: '#eff6ff',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
