/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
        extend: {
          colors: {
            light: {
              DEFAULT: '#fff23f', 
              text: '#000000',  
            },
            dark: {
              DEFAULT: '#000000', 
              text: '#ffffff', 
              
            },
          },
        },
      },
  plugins: [],
}