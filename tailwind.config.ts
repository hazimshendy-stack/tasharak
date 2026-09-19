import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080a",
          900: "#0d0d10",
          850: "#131317",
          800: "#1a1a1f",
          700: "#26262c",
          600: "#3a3a42",
        },
        accent: {
          DEFAULT: "#10b981",
          soft: "#34d399",
          deep: "#059669",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "Inter", "system-ui", "sans-serif"],
        num: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 40px -24px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
