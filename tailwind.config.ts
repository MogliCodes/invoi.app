export default {
  content: [
    "./index.html",
    "./components/**/*.{vue,js,ts}",
    "./components/**/*.stories.ts",
    "./.storybook/**/*.{ts,mdx}",
  ],
  theme: {
    colors: {
      secondary: {
        100: "#3836BA",
      },
      white: "#ffffff",
      yellow: {
        110: "#FFC200",
        normal: "#F9DC5C",
        dark: "#3B3416",
      },
      blue: {
        100: "#0B0B30",
        90: "#1B1B3E",
        80: "#26264D",
      },
    },
    fontFamily: {
      syne: ["Syne", "sans-serif"],
      sans: ["Public Sans", "sans-serif"],
    },
  },
};
