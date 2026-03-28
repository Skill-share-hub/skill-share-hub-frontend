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
        dark: {
          bg: "#0d1117",
          card: "#151823",
          border: "#1e2330",
          borderLight: "#1a1f2e",
          textPrimary: "#f9fafb",
          textSecondary: "#e5e7eb",
          textMuted: "#6b7280",
          textDim: "#9ca3af",
          accentBlue: "#3b82f6",
          accentBlueDark: "#2d3a5e",
          accentBlueBorder: "#3b4f85",
          accentBlueText: "#93c5fd",
          accentYellow: "#fbbf24",
          accentGreen: "#10b981",
          accentRed: "#ef4444",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;