import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#1A6FA8",
        secondary: "#0D4F7A",
        gold:      "#D4AF37",
        goldDark:  "#8C6D1F",
        lightbg:   "#F0F7FF",
        cream:     "#F7F5F2",
        dark:      "#0A1628",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        script:  ["var(--font-dancing)", "cursive"],
        mono:    ["var(--font-mono)",    "monospace"],
        sans:    ["var(--font-body)",    "sans-serif"],
      },
      borderRadius: {
        sm:   "8px",
        md:   "12px",
        lg:   "16px",
        pill: "999px",
      },
      boxShadow: {
        soft:      "0 4px 24px rgba(26,111,168,0.12), 0 1px 4px rgba(26,111,168,0.08)",
        card:      "0 2px 16px rgba(9,20,38,0.05)",
        cardHover: "0 20px 60px rgba(9,20,38,0.10), 0 2px 8px rgba(9,20,38,0.06)",
        dark:      "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
