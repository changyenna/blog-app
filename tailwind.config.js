/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    screens: {
      xs: '0px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    // extend: {
    //   spacing: {
    //     128: '32rem',
    //     144: '36rem',
    //   },
    //   borderRadius: {
    //     '4xl': '2rem',
    //   },
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
