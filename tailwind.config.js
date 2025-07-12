import tailwindcssForms from '@tailwindcss/forms';
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        instagram: '#E1306C',
        'instagram-gradient': {
          start: '#405DE6',
          middle: '#833AB4',
          end: '#E1306C',
        },
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    tailwindcssForms,
    tailwindScrollbarHide,
  ],
};