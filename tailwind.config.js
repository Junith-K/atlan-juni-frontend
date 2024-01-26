/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#2C3A4F',
          200: '#56647b',
          300: '#b4c2dc',
        },
        accent: {
          100: '#FF4D4D',
          200: '#ffecda',
        },
        text: {
          100: '#FFFFFF',
          200: '#e0e0e0',
        },
        bg: {
          100: '#1A1F2B',
          200: '#292e3b',
          300: '#414654',
        },
      },
    },
  },
  plugins: [],
}

