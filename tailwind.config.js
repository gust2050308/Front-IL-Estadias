/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'chocolate-cosmos': '#4F000B',
        'barbaby-blue': '#002E5D',
        'tomato': '#FE4A49',
        'cinereous': '#8B786D',
      },
    },
  },
  plugins: [],
}