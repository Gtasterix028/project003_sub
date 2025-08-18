import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        latto: ["Latto", "sans-serif"],
        Merriweather: ["Merriweather", "sans-serif"],
        sourceSans: ["Source Sans Pro", "sans-serif"],
      },
      keyframes: {
        // 'car-move': {
        //   '0%': { transform: 'translateX(0)' },
        //   '100%': { transform: 'translateX(100px)' }, // adjust distance
        // },
        'car-move': {
          '0%': { left: '0%' },
          '100%': { left: 'calc(100% - 24px)' },
        },
        slidein: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-15px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'car-move': 'car-move 3s ease-out forwards',
        slidein: 'slidein 1s ease var(--slidein-delay, 0s) forwards',
      },
    },
  },
  plugins: [],
});


