import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryDarkColor:"#3B3F40",
        primaryLightColor:"#D8D8D6",
        secondaryActionColor: "#357361",
        goldenColor: "#BF9A54"
      },
    },
  },
  plugins: [],
} satisfies Config;
