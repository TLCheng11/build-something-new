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
        "360px": "360px",
        "720px": "720px",
      },
      maxHeight: {
        "400px": "400px",
      },
      minWidth: {
        "360px": "360px",
      },
    },
  },
  plugins: [],
};
