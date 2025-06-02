import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    backgroundImage: {
      net: "url('src/assets/images/net.svg')",
      card: 'linear-gradient(180deg, rgba(50, 53, 72, 0.7) 0%, rgba(50, 53, 72, 0.2) 75%)',
      'card-light': 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 75%)',
      'bg-linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
    },
    boxShadow: {
      card: '0px 1px 2px 0px #0000000D',
      'card-light': '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    },
    screens: {
      xl: { max: '1780px' },
      sm: { max: '500px' },
    },
    fontFamily: {
      inter: ['Inter', ...fontFamily.sans],
    },
    fontSize: {
      xxs: '.575rem',
      xs: '.75rem',
      sm: '.875rem',
      lg: '0.9rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    colors: {
      // Темная тема (по умолчанию)
      background: '#2D2C33',
      area: {
        DEFAULT: '#343D5C',
        dark: '#323548',
        // Светлая тема
        light: '#FFFFFF',
        'light-dark': '#F8F9FA',
      },
      stroke: {
        DEFAULT: '#4E608D',
        gray: {
          DEFAULT: '#43424A',
          dark: '#4C4958',
          darker: '#707070',
          light: '#4E608D33',
          lighter: '#B6B6B640',
          lght: '#B6B6B6',
          base: '#A9A9A9',
          // Светлая тема
          'light-default': '#E5E7EB',
          'light-dark': '#D1D5DB',
          'light-darker': '#9CA3AF',
        },
      },
      text: {
        // Темная тема
        primary: '#FFFFFF',
        secondary: '#B6B6B6',
        // Светлая тема
        'light-primary': '#1F2937',
        'light-secondary': '#6B7280',
      },
      blue: {
        DEFAULT: '#507EF5',
        lighter: '#6daaff',
        soft: '#708DA6',
        light: '#7086A6',
      },
      orange: {
        DEFAULT: '#FFBB4F',
      },
      green: {
        DEFAULT: '#1EA574',
      },
      error: { DEFAULT: '#FF4F52', transparent: '#f5656599' },
      black: '#000',
      white: '#FFFFFF',
      gray: '#B6B6B6',
      grayLighter: '#B6B6B61F',
      violet: '#D24FD0',
      transparent: 'transparent',
      neutral: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#e5e5e5',
        '300': '#d4d4d4',
        '400': '#a3a3a3',
        '500': '#737373',
        '600': '#525252',
        '700': '#404040',
        '800': '#262626',
        '900': '#171717',
        '950': '#0a0a0a',
      },
    },
    extend: {
      // Добавляем стандартные серые цвета для совместимости
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
