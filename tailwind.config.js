/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundDark: "#191919",
        backgroundLight: "#f5f5f5",
        textLight: "#a3a3a3",
        textDark: "#1a1a1a",
        panelDark: "#282828",
        panelLight: "#CCCCCC",
        danger: "#dc3545",

        purple: "#573288",
        red: "#ab4342",
        green: "#355245",
        rose: "#9b5372",
        violet: "#4b1b8f",
      },
      fontFamily: {
        public: ["Quicksand", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  safelist: [
    { pattern: /bg-(purple|green|red|rose|violet)/ },
    {
      pattern: /text-(purple|green|red|rose|violet)/,
    },
  ],
  plugins: [],
};
