// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        "blob-1": "polygon(50% 0%, 100% 38%, 82% 100%, 19% 100%, 0% 38%)",
      },
      colors: {
        primary: "#F43F5D",
        "primary-hover": "#E11E48",
        "secondary-color": "#00A699",
        "background-color": "#F7F7F7",
        "text-primary": "#222940",
        "text-secondary": "#838383",
      },
    },
  },
  plugins: [],
};
