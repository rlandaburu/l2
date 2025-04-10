/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this matches your project structure
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#121212',
        'brand-card': '#1e1e1e',
        'brand-text': '#ffffff',
        'brand-text-secondary': '#b3b3b3',
        'brand-red': '#e53e3e',
        'brand-red-hover': '#c53030',
        'brand-border': '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}