import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'background': {
          DEFAULT: colors.white,
          dark: colors.zinc[700]
        },
        'panel': {
          DEFAULT: '#edf4f5',
          dark: colors.zinc[800]
        },
        'panel-two': {
          DEFAULT: '#cee1e4',
          dark: colors.zinc[900]
        },
        'color': {
          DEFAULT: '#6ba6ae',
          dark: colors.teal[400],
          contrast: {
            DEFAULT: '#edf4f5',
            dark: colors.zinc[800]
          },
          hover: {
            DEFAULT: '#3f6d73',
            dark: colors.teal[500]
          }
        },
        'button': {
          DEFAULT: '#6ba6ae',
          dark: colors.teal[400],
          hover: {
            DEFAULT: '#3f6d73',
            dark: colors.teal[500]
          },
          active: {
            DEFAULT: '#bdd7db',
            dark: colors.teal[200]
          }
        },
        'content': {
          DEFAULT: '#bdd7db',
          dark: colors.zinc[600]
        },
        'border': {
          DEFAULT: '',
          dark: colors.zinc[600]
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ],
  darkMode: 'class',
};
export default config;
