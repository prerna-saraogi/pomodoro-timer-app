/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#191919", //dark background
        text: "#a3a3a3", //light text
        dark: "#282828", //secondary dark color background
        theme: {
          purple: {
            DEFAULT: "#573288",
            shade: "#a084ff",
          },

          //#573288 //#a084ff
          // #ba4949 - red
          lavender: {
            DEFAULT: "#E6E6FA",
          },
        },
      },
      fontFamily: {
        public: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
