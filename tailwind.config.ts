import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    backgroundImage: {
      net: "url('src/assets/images/net.svg')",
      card: 'linear-gradient(180deg, rgba(50, 53, 72, 0.7) 0%, rgba(50, 53, 72, 0.2) 75%)',
      'bg-linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
    },
    boxShadow: {
      card: '0px 1px 2px 0px #0000000D',
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
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    colors: {
      background: '#2D2C33',
      area: {
        DEFAULT: '#343D5C',
        dark: '#323548',
      },
      stroke: {
        DEFAULT: '#4E608D',
        gray: {
          DEFAULT: '#43424A',
          dark: '#4C4958',
          light: '#4E608D33',
          lighter: '#B6B6B640',
        },
        blue: '#507EF5',
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
    extend: {},
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
