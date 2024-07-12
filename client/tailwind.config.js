/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        width_60p: "calc(60%)",
      },
      colors: {
        border_main: "#d1d5db",
        fill_main: "#d1d5db",
        hover_main: "#94a3b8",
        black_loader: "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
