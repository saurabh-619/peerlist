module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: ".65rem",
        xxxs: ".45rem",
      },
      screens: {
        xxs: "450px",
      },
      height: {
        76: "305px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
