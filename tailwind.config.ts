import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#212021",
        secondary: "#FCDE61",
        tertiary: "#F0C824",
        error: "#ff7730",
      },
      fontFamily: {
        primary: ["Heebo", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
      fontSize: {
        base: "1.6rem",
        paragraph: "1.7rem",
        button: "1.8rem",
        "heading-3": "2rem",
        "heading-2": "4rem",
        "heading-1": "5.5rem",
      },
      borderRadius: {
        DEFAULT: "2rem",
      },
      boxShadow: {
        DEFAULT: "0 2rem 5rem rgba(0, 0, 0, 0.2)",
      },
      screens: {
        xs: "31.25em", // 500px
        sm: "37.5em", // 600px
        md: "50em", // 800px
        lg: "62.5em", // 1000px
        xl: "75em", // 1200px
      },
      spacing: {
        tiny: "1rem",
        small: "2rem",
        medium: "5rem",
        big: "7rem",
      },
    },
  },
  plugins: [],
};

export default config;
