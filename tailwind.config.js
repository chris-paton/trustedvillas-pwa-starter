/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0b2d4e',
        'navy-dark': '#08121e',
        teal: '#006d77',
        orange: '#ff6b35',
        gold: '#d4a017',
        cream: '#faf8f5',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};