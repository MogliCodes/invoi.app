export default {
  content: [
    "./index.html",
    "./components/**/*.{vue,js,ts}",
    "./components/**/*.stories.ts",
    "./.storybook/**/*.{ts,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: "#3836BA",
          90: "#4544B6",
          80: "#5251B2",
          70: "#5F5EB0",
          60: "#6C6BB0",
          50: "#7978AE",
          40: "#8685AB",
          30: "#9392A9",
          20: "#A0A0A7",
          10: "#ADADA5",
        },
        white: "#ffffff",
        yellow: {
          110: "#FFC200",
          normal: "#F9DC5C",
          dark: "#3B3416",
        },
        green: {
          100: "#1A4530",
          50: "#56E39F",
        },
        blue: {
          100: "#0B0B30",
          90: "#1B1B3E",
          80: "#26264D",
          70: "#11114A",
          60: "#171763",
        },
        gray: {
          light: "#f9f9f9",
          medium: "#c3c3c3",
          dark: "#3f3f3f",
        },
      },
    },
    fontFamily: {
      syne: ["Syne", "sans-serif"],
      sans: ["Public Sans", "sans-serif"],
    },
  },
};
