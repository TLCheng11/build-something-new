/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "1/8": "12.5%",
        "7/8": "87.5%",
        "1/10": "10%",
        "9/10": "90%",
      },
      width: {
        btn: "60px",
        150: "150px",
      },
      minHeight: {
        "card-b": "46px",
        80: "80px",
        100: "100px",
        180: "180px",
        300: "300px",
        360: "360px",
        720: "720px",
      },
      maxHeight: {
        "1/2screen": "50vh",
        "2/5screen": "40vh",
      },
      minWidth: {
        btn: "80px",
        input: "150px",
        control: "360px",
        225: "225px",
        360: "360px",
        480: "480px",
      },
      scale: {
        200: "2",
      },
      rotate: {
        36: "36deg",
      },
    },
  },
  plugins: [],
};
