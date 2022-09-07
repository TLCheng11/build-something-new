/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      minHeight: {
        "100": "100px",
        "360": "360px",
        "720": "720px",
      },
      maxHeight: {
        "1/2screen": "50vh",
      },
      minWidth: {
        "360": "360px",
      },
    },
  },
  plugins: [],
};
