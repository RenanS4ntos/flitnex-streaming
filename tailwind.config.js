/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #202024, transparent)',
        'custom-image-gradient': {
          'mask-image': 'linear-gradient(to right, transparent, black 75%)'
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.card': {
          'background-color': '#202024',
          'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
          'border-radius': '0.5rem',
          'padding': '1rem',
        },
      });
    },
  ],
}

