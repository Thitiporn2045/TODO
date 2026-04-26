/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17211c',
        moss: '#355c45',
        mint: '#d9f5e5',
        paper: '#f7f3ea',
        coral: '#e66a4e',
      },
    },
  },
  plugins: [],
};
