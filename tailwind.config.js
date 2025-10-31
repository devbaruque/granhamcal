/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        financial: {
          dark: '#1e3a5f',
          blue: '#2563eb',
          light: '#60a5fa',
          gray: '#64748b',
        }
      }
    },
  },
  plugins: [],
}

