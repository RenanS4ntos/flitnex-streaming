/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)',
        'custom-image-gradient': {
          'mask-image': 'linear-gradient(to right, transparent, black 75%)'
        },
      },
    },
  },
  plugins: [],
}

