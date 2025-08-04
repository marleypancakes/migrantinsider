const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
        notoserif: ["Noto Serif", "sans-serif"],
      },
    },
    colors: {
      black: colors.black,
      red: colors.red,
      purple: "#827fb9",
      pink: "#aaafeb",
      yellow: "#FFFEAC",
      darkorange: "#CB5B3B",
      lightorange: "#f5e6d6",
      darkpurple: "#634880",
      darkbrown: "#5D4C37",
      white: colors.white,
      lightblack: "#141414",
      bg: "hsla(243, 60%, 95%, 1)",
      dp: "#525074",
      gray: colors.gray,
      dg: "#F0E8DF",
      transparent: colors.transparent,
    },
    screens: {
      xxs: "320px",
      xs: "425px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "920px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    transitionProperty: ["hover", "focus"],
    extend: {
      transform: ["hover", "focus", "active"],
    },
  },
  plugins: [],
}
