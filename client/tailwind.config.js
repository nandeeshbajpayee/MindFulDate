/** @type {import('tailwindcss').Config}*/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#F87171',
      },
      backgroundImage: {
        'section1-bg': "url('./src/components/Section1/bg-section1.jpg')"
      }
    },
  },
  plugins: [],
}
