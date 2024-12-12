import type { Config } from 'tailwindcss';

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
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
