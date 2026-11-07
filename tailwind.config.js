/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        paper: '#F6F1E9',
        card: '#FFFDF9',
        ink: '#2B2521',
        muted: '#6F655C',
        line: '#E2D9CC',
        forest: '#1F4D3F',
        'forest-dark': '#173B30',
        clay: '#B5562F',
        danger: '#A63A2B',
        'danger-soft': '#F7E6E1',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
