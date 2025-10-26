import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f4f9',
          100: '#b3e5f0',
          200: '#80d4e6',
          300: '#4dc3dc',
          400: '#26b7d5',
          500: '#00abcd',
          600: '#009fc8',
          700: '#0090c1',
          800: '#0082ba',
          900: '#006cad',
        },
        lightBlue: {
          DEFAULT: '#ADD8E6',
          50: '#f0f9fc',
          100: '#e1f3f9',
          200: '#c3e7f3',
          300: '#a5dbed',
          400: '#87cfe7',
          500: '#69c3e1',
        },
        accent: {
          500: '#5DADE2',
          600: '#4a9dd4',
        },
        warm: {
          50: '#FFF8F0',
          100: '#FFEFD9',
          200: '#FFE4C2',
          300: '#FFD9AB',
          400: '#FFCE94',
          500: '#FFC47D',
          600: '#FFB966',
          700: '#FFAE4F',
        },
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFF8F0 0%, #FFEFD9 25%, #FFE4C2 50%, #FFD9AB 75%, #FFCE94 100%)',
      },
      fontFamily: {
        script: ['Brush Script MT', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
