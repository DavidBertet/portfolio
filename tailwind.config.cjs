/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      body: ['"Josefin Sans"', "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        project: "repeat(auto-fill, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
