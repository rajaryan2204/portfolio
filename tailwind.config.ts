import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ede8dc", // Warm editorial cream / linen
        surface: "#f5f0e6",    // Slightly lifted warm card surface
        "surface-card": "#fbf8f2", // Crisp warm card
        "surface-subtle": "#e4decb", // Deep sand accent
        border: "#d8d2c2",    // 1px crisp stone border
        "border-dark": "#171717", // Contrast border
        foreground: "#171717", // Rich ink charcoal
        "foreground-muted": "#68645c", // Warm editorial secondary
        "foreground-subtle": "#948f85", // Delicate metadata stone
        accent: {
          DEFAULT: "#2d5a27", // Deep forest olive green
          hover: "#1e3d1a",
          muted: "rgba(45, 90, 39, 0.1)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
