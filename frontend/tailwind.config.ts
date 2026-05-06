import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0EA5E9",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
