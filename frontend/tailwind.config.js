/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        'custom': 'min(calc(100vh - 96px - 60px), 734px)',
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.12) 0px 2px 12px',
      },
    },
  },
  plugins: [],
}