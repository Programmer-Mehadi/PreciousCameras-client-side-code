/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#e2c446",
          "secondary": "#253237",
          "accent": "#3A4256",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
}
