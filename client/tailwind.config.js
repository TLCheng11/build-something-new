/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      width: {
        btn: "60px",
        150: "150px",
      },
      minHeight: {
        "card-b": "46px",
        100: "100px",
        360: "360px",
        720: "720px",
      },
      maxHeight: {
        "1/2screen": "50vh",
      },
      minWidth: {
        input: "150px",
        control: "360px",
        225: "225px",
        360: "360px",
      },
      scale: {
        200: "2",
      },
    },
  },
  plugins: [],
};
