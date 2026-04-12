/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': {
          50: '#fdfcfb',
          100: '#fbfaf7',
          200: '#f7f5ef',
          300: '#efe9df',
          400: '#e8e2d8',
        },
        'gold': {
          50: '#fbf9f4',
          100: '#f7f2e9',
          200: '#efe5d2',
          300: '#e7d8bc',
          400: '#dfcba5',
          500: '#c5a572',
          600: '#b38e54',
          700: '#a57d42',
        }
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.2s ease-out forwards',
        'zoom-out': 'zoomOut 0.2s ease-in forwards',
        'slide-left': 'slideLeft 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}
