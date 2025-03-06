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
        panelLight: "#BDBDBD",
        danger: "#dc3545",

        purple: "#573288",
        tomatoRed: "#922b21",
        green: "#0B3028",
        blue: "#0b385f",
        violet: "#5411AB",
      },
      fontFamily: {
        public: ["Quicksand", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  safelist: [
    { pattern: /bg-(purple|green|tomatoRed|blue|violet)/ },
    {
      pattern: /text-(purple|green|tomatoRed|blue|violet)/,
    },
  ],
  plugins: [],
};
