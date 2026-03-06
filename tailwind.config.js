/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#6b7280',
        success: '#10b981',
        danger: '#ef4444'
      },
      fontFamily: {
        sans: ['Noto Sans Arabic', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}