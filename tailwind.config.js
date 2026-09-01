/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F0E5D1',
          300: '#E2CEAF',
          400: '#D4B88D',
          500: '#C6A16B',
          600: '#A47E4B',
          700: '#825E34',
          800: '#5F4120',
          900: '#4A3525',
        },
        salon: {
          beige: '#FCF9F5',
          text: '#2F241D',
          accent: '#8C6A5C',
          lightAccent: '#E8DFD8',
          gold: '#C18C5D',
          rose: '#D6A59E',
          softBg: '#F8F3ED',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
