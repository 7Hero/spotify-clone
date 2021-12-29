module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        click: {
          '50%':{
            transform: 'scale(0.95)',
            transform: 'translateY(10px)',
            backgroundColor: '#16a34a',
            shadow: '0px 0px 10px rgba(0,0,0,0.5)',
          }
        }
        
      },
      animation:{
        click: 'click 250ms ease-in-out',
      }
    },

  },
  plugins: [],
}