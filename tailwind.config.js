/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        meditiva: '#10877c',
        meditiva2: '#1a3c45d9'
      },
      aspectRatio: {
        '3/2': '3 / 2'
      }
    }
  },
  plugins: []
}
