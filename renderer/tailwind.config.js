const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // colors: {
    //   // use colors only specified
    //   white: colors.white,
    //   gray: colors.gray,
    //   blue: colors.blue,
    // },
    extend: {
      colors: {
        'blue-pastel-0': "#edf2fb",
        'blue-pastel-1': "#e2eafc",
        'blue-pastel-2': "#d7e3fc",
        'blue-pastel-3': "#ccdbfd",
        'blue-pastel-4': "#c1d3fe",
        'blue-pastel-5': "#b6ccfe",
        'blue-pastel-6': "#abc4ff",
        'blue-pastel-7': "#bed8fb",
        'blue-pastel-8': "#aecefa",
        'blue-pastel-9': "#95bff9",
        'blue-pastel-10': "#8ab8f8",
        'blue-pastel-11': "#80b1f6",
      }
    },
  },
  plugins: [],
};
