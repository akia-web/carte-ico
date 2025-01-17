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
        goldenColor: "#BF9A54",
        bgScore : "#F9F6F4",
        darkGrey : "#A6A5A0",
        blueColor : "#152B59",
        redColor: "#A63C3C"

      },
    },
  },
  plugins: [],
} satisfies Config;
