import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'lightgray': {
          light: '#999999',
          DEFAULT: '#bfbfbf',
        },
        'creme': '#f7f5ee',
        'icewhite': {
          light: '#cee1e4',
          DEFAULT: '#edf4f5',
        },
        'cyan': {
          DEFAULT: '#6ba6ae',
          dark: '#3f6d73',
        },
        'lightblue': '#C7ECFE',
      },
    },
  },
  plugins: [],
};
export default config;
