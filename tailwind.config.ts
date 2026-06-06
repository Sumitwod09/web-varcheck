import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        acid: "#C8FF00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      keyframes: {
        scrollPulse: {
          "0%, 100%": { transform: "scaleY(0.3)", opacity: "0.3" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        scrollPulse: "scrollPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
