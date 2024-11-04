/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",

    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "san-serif"],
      },
      colors: {
        "dark-bg": "#121212",
        "blue-bg" : "#304FFE"
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
