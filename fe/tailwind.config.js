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
      boxShadow: {
        activeSelected: "0px 6px 0px 1px rgba(59, 130, 246, 0.5)"
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
