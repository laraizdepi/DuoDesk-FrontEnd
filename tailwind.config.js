module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			pink: {
				DEFAULT: '#e64980'
			},
			teal: {
				DEFAULT: '#12b886'
			},
			indigo: {
				DEFAULT: '#4C6EF5'
			}
		}
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
}
