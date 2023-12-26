/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		colors: {
			'b-fms-1': '#5a97f3',
			'b-fms-2': '#77dc81',
			'b-fms-3': '#f3d470',
			'b-fms-4': '#f58558',
			'b-fms-5': '#ff0000',
			'b-fms-6': '#000000',
			'b-fms-7': '#ff8600',

			't-fms-1': 'white',
			't-fms-2': 'black',
			't-fms-3': 'black',
			't-fms-4': 'black',
			't-fms-5': 'white',
			't-fms-6': 'white',
			't-fms-7': 'black',
		  },
	},

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],},
};

module.exports = config;