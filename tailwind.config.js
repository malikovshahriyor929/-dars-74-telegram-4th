/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./js/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary : "#006bff",
        primary2 : "#517da2"
      }
    },
  },
  plugins: [],
}