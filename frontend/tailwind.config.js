/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightRed: "var(--lightRed)",
      },
    },
  },
  plugins: [],
};
