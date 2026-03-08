import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        salmon: {
          DEFAULT: '#F28482',
          light: '#F5A5A3',
          dark: '#D96E6C',
        },
        teal: {
          DEFAULT: '#84A59D',
          light: '#A3BDB7',
          dark: '#6A8E86',
        },
        'dark-slate': '#2B2D42',
        'off-white': '#F8F9FA',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-up-delay': 'slideUp 0.7s ease-out 0.2s forwards',
        'slide-up-delay2': 'slideUp 0.7s ease-out 0.4s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(ellipse at 15% 15%, rgba(242, 132, 130, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(132, 165, 157, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(132, 165, 157, 0.10) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
