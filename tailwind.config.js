/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Убедись, что здесь указаны все нужные файлы
  ],
  theme: {
    colors: {
      purple: "#6C63FF",
      darkPurple: "#534CC2",
      white: "#F7F7F7",
      black: "#252525",
      red: "#E50000",
      grey: "#CDCDCD",
    },
    fontFamily: {
      inter: "Inter",
      kanit: "Kanit",
    },
    container: {
      screens: {
        sm: "390px",
        md: "777px",
        lg: "777px",
        xl: "777px",
      },
    },
    extend: {},
  },
  plugins: [],
};
