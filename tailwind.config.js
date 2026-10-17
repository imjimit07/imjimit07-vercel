// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './layouts/**/*.tsx',
    './lib/**/*.ts',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
        'apple-xs': '4px',
        'apple-sm': '8px',
        'apple-base': '12px',
        'apple-md': '16px',
        'apple-lg': '24px',
        'apple-xl': '32px',
        'apple-2xl': '48px',
        'apple-3xl': '64px',
      },
      lineWidth: {
        'apple-1': '1px',
        'apple-2': '2px',
      },
      borderRadius: {
        'apple-sm': '6px',
        'apple-base': '10px',
        'apple-md': '14px',
        'apple-lg': '20px',
        'apple-xl': '26px',
        'apple-2xl': '32px',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        display: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      fontSize: {
        'apple-xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'apple-sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'apple-base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'apple-md': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'apple-lg': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        'apple-xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        'apple-2xl': ['2rem', { lineHeight: '2.25rem' }], // 32px
        'apple-3xl': ['2.5rem', { lineHeight: '3rem' }], // 36px
        'apple-4xl': ['3rem', { lineHeight: '3.5rem' }], // 48px
      },
      letterSpacing: {
        'apple-tight': '-0.02em', // Apple display tracking
        'apple-base': '0em', // Body near 0
      },
      // Apple-style easing: fast out of the gate, long gentle settle in.
      transitionTimingFunction: {
        'apple-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'apple-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'apple-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // press/hover micro-feedback
      },
      transitionDuration: {
        120: '120ms',
        220: '220ms',
        333: '333ms',
      },
      // Elevation: one soft shadow per surface weight, plus a lit top edge
      boxShadow: {
        'apple-sm': '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
        'apple-md': '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        'apple-lg': '0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms cubic-bezier(0.25, 1, 0.5, 1) both',
      },
      colors: {
        primary: colors.cyan,
        gray: colors.neutral,
        'placeholder-light': '#F0F0F0',
        'placeholder-dark': '#252525',
        // Apple system colors
        apple: {
          bg: colors.gray,
          surface: {
            base: colors.gray[100],
            elevated: colors.gray[200],
            pressed: colors.gray[300],
          },
          border: colors.gray[300],
          shadow: {
            light: 'rgba(0,0,0,0.1)',
            medium: 'rgba(0,0,0,0.12)',
            dark: 'rgba(0,0,0,0.2)',
          },
          highlight: 'rgba(255,255,255,0.5)',
          gradientStart: colors.gray[200],
          gradientEnd: colors.gray[300],
        },
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: theme('letterSpacing.apple-tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              lineHeight: '1.2',
              letterSpacing: theme('letterSpacing.apple-tight'),
              color: theme('colors.gray.900'),
            },
            img: {
              borderRadius: theme('borderRadius.apple-md'),
            },
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.apple-md'),
              boxShadow: theme('boxShadow.apple-md'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: theme('borderRadius.apple-sm'),
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              fontStyle: 'normal',
              fontWeight: '500',
              borderLeftWidth: '3px',
              borderLeftColor: theme('colors.primary.400'),
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.apple-tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.apple-tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
