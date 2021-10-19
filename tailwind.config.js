module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 350px))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      gridAutoRows: {
        "10px": "10px",
      },
      gridRowEnd: {
        small: "span 6",
        medium: "span 16",
        medium2: "span 17",
        medium3: "span 18",
        large: "span 19",
      },
      typography: {
        DEFAULT: {
          css: {
            img: { borderRadius: "0.75rem", marginLeft: "auto", marginRight: "auto" },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
