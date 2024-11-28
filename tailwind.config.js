import { colors } from "./src/styles/colors";
import { fontFamily } from "./src/styles/fontFamily";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily,
      keyframes: {
        spinner: {
          "0%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinner: "spinner 0.7s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}