import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#166534",
        primaryLight: "#22C55E",
        primarySoft: "#DCFCE7",
        secondary: "#065F46",
      },
    },
  },
  plugins: [],
} satisfies Config;