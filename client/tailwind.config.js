/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border_main: "#d1d5db",
        fill_main: "#d1d5db",
      },
    },
  },
  plugins: [],
};
