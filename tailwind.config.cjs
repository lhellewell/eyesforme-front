/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{css, vue, js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cgrey': "#ced4da",
	      'cblack': "#202020",
	      'cnight': "#333533",
	      'cyellow': "#FFEE32",
	      'choney': "#FFD100",
      }
    },
  },
  plugins: [

  ],
}
