const colors = require('tailwindcss/colors')

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
			},
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			red: colors.rose,
			yellow: colors.amber,
			green: colors.green
		}
	},
	variants: {
		extend: {},
	},
}
