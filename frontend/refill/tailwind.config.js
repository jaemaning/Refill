/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        '70': '17.5rem', // 70px
      },
      colors: {
        'rf-1' : '#142CF9',
        'rf-2' : '#AADAFF',
        'rf-3' : '#20A4F3',
        'rf-4' : '#2E5077',
        'rf-5' : '#F2981F',
        'red' : '#FD3232',
        'orange' : '#F8A300',
        'grey-1' : '#D7D7D7',
        'grey-2' : '#888888',
        'white' : '#FFFFFF',
        'black' : '#000000',
        'ring-sky-600': '#0284c7',
        'ring-gray-600': '#4b5563',
        'ring-lime-600': '#65a30d',
        'ring-pink-600': '#db2777',
        'ring-purple-600': '#9333ea',
      }
    },
  },
  variants: {

  },
  
  plugins: [],
}

