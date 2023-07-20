/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        shake: 'shake 300ms'
      },
      keyframes: {
        'shake' : {
          '25%' : { transform: 'translateX(4px)' },
          '50%' : { transform: 'translateX(-4px)' },
          '75%' : { transform: 'translateX(4px)' },
        }
      }
    },
  },
  plugins: [],
}

