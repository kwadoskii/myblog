const { backgroundColor } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      gridAutoRows: {
        "10px": "10px",
      },
      gridRowEnd: {
        small: "span 4",
        medium: "span 16",
        medium2: "span 17",
        medium3: "span 18",
        large: "span 19",
      },
      height: {
        minheightlg: "calc(100vh - 66px)",
        minheight: "calc(100vh - 50px)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            img: { borderRadius: "0.75rem", marginLeft: "auto", marginRight: "auto" },
            pre: {
              backgroundColor: "#090c10",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-debug-screens"),
  ],
};
