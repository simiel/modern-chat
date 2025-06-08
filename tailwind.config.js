/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#262626',
        red: '#FF3B30',
        'red-secondary': '#441320',
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
};
