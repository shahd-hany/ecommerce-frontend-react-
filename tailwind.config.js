const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()],
  theme: {
    extend: {
      fontFamily:{
        Roboto:"Roboto",
        Righteous:"Righteous",
        EncodeSansExpanded:"Encode Sans Expanded"
      }
    },
  },
  plugins: [flowbite.plugin(),],
}

