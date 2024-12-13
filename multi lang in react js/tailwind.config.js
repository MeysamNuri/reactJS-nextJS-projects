/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      boxShadow: {
        glass: 'inset 0 2px 22px 0 rgba(225,225,225,0.6) '
      }
    },
  },
  plugins: [],
}