import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    './src/scenes/components/*.{ts,tsx}',
    './src/scenes/components/**/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xl: { max: '1780px' },
      sm: { max: '500px' },
    },
    fontFamily: {
      inter: ['Inter', ...fontFamily.sans],
    },
    colors: {
      background: '#2D2C33',
      area: {
        DEFAULT: '#343D5C',
        dark: '#323548',
      },
      stroke: {
        DEFAULT: '#4E608D',
        gray: '#43424A',
      },
      blue: {
        DEFAULT: '#507EF5',
        light: '#7086A6',
      },
      white: '#FFFFFF',
      gray: '#B6B6B6',
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
