/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        shake: 'shake 300ms',
        slideup: 'slide-up 450ms'
      },
      keyframes: {
        'shake' : {
          '25%' : { transform: 'translateX(4px)' },
          '50%' : { transform: 'translateX(-4px)' },
          '75%' : { transform: 'translateX(4px)' },
        },
        'slide-up' : {
          '25%' : { transform: 'translateY(-10px)' },
          '50%' : { transform: 'translateY(-5px)' },
          '75%' : { transform: 'translateY(-2px)' },
        }
      }
    },
  },
  plugins: [],
}

