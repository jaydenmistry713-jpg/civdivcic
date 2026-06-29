/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand palette
        'brand-black':   '#101113',
        'black-800':     '#1F2024',
        'gold':          '#a6b84c',
        'gold-tint':     '#c8d47a',
        'gold-dark':     '#7a8a38',
        'crisis-red':    '#C8102E',
        'open-green':    '#2E7D5B',
        'warm-surface':  '#F5F4F0',
      },
      fontFamily: {
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
      },
      fontSize: {
        'h1-mobile': ['1.75rem',  { lineHeight: '1.2', fontWeight: '700' }],
        'h1-desktop':['2.75rem',  { lineHeight: '1.15', fontWeight: '800' }],
        'h2-mobile': ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2-desktop':['1.875rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h3-mobile': ['1.125rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h3-desktop':['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body':      ['1rem',     { lineHeight: '1.6', fontWeight: '400' }],
        'small':     ['0.8125rem',{ lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card:       '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)',
        'card-dark':'0 2px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
      },
      spacing: {
        'tap': '3rem', // 48px min tap target
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
