module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineHeight: {
        // 'extra-loose': '2.5',
        20: '5rem',
        16: '4rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
