/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Amiri"', '"Noto Naskh Arabic"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
