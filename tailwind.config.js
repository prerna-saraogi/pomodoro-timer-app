/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1e1b2e",
        dark: "#232330",
        theme: {
          purple: "#573288",
        },
      },
      fontFamily: {
        public: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
