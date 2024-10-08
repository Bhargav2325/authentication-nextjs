/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Background: "var(--background)",
        Accent: "var(--accent)",
        Text: "var(--text)",
        Button: "var(--button)",
        Border: "var(--border)",
      },
      fontFamily: {
        quicksand: ["quicksand", "sans-serif"],
        quicksandBold: ["quicksandBold", "sans-serif"],
        quicksandMedium: ["quicksandMedium", "sans-serif"],
        quicksandSemiBold: ["quicksandSemibold", "sans-serif"],
        quicksandLight: ["quicksandLight", "sans-serif"],
      },
      screens: {
        xxl: { max: "1500px" },
        xl: { max: "1300px" },
        lg: { max: "1024px" },
        md: { max: "768px" },
        sm: { max: "640px" },
        xs: { max: "500px" },
        xxs: { max: "400px" },
        xxxs: { max: "376px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
