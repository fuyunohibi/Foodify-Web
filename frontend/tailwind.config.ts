import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY
        primary: {
          DEFAULT: "#4d5bc1",
          100: "#acb7e4",
          200: "#4d5bc1",
        },

        // SECONDARY
        secondary: {
          DEFAULT: "#fef9ed",
          100: "#efec98",
          200: "#fef9ed",
        },
      },
    },
  },
  plugins: [],
};
export default config;
