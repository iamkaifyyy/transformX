/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#152033',
          950: '#090d16',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7', // Sky / Cyan primary
          600: '#0369a1',
          700: '#075985',
        },
        accent: {
          500: '#0d9488', // Teal accent
          600: '#0f766e',
        }
      },
      maxWidth: {
        '6xl': '72rem',
        '7xl': '80rem',
      }
    },
  },
  plugins: [],
}
