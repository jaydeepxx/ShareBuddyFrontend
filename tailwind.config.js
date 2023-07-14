// tailwind.config.js
module.exports = {
  important: "#app",
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flexGrow: {
        '0': 0,
       DEFAULT: 1,
       DEFAULT: 2,
       '0.5': 0.5,
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
