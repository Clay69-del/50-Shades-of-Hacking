/** @type {import('tailwindcss').Config} */
import tailwindcssTypography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssTypography,
  ],
}
