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
      green: {
        100: "#1A4530",
        50: "#56E39F",
      },
      blue: {
        100: "#0B0B30",
        90: "#1B1B3E",
        80: "#26264D",
      },
      gray: {
        light: "#f9f9f9",
        medium: "#c3c3c3",
        dark: "#3f3f3f",
      },
    },
    fontFamily: {
      syne: ["Syne", "sans-serif"],
      sans: ["Public Sans", "sans-serif"],
    },
  },
};
