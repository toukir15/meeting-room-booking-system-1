// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        "blob-1": "polygon(50% 0%, 100% 38%, 82% 100%, 19% 100%, 0% 38%)",
      },
    },
  },
  plugins: [],
};
