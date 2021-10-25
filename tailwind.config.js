const colors = require('tailwindcss/colors')

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			pink: {
				DEFAULT: '#e64980',
				0: '#fff0f6',
				100: '#ffdeeb',
				200: '#fcc2d7',
				300: '#faa2c1',
				400: '#f783ac',
				500: '#f06595',
				600: '#e64980',
				700: '#d6336c',
				800: '#c2255c',
				900: '#a61e4d',
			},
			teal: {
				DEFAULT: '#12b886',
				0: '#e6fcf5',
				100: '#c3fae8',
				200: '#96f2d7',
				300: '#63e6be',
				400: '#38d9a9',
				500: '#20c997',
				600: '#12b886',
				700: '#0ca678',
				800: '#099268',
				900: '#087f5b',
			},
			indigo: {
				DEFAULT: '#4C6EF5',
				0: '#edf2ff',
				100: '#dbe4ff',
				200: '#bac8ff',
				300: '#91a7ff',
				400: '#748ffc',
				500: '#5c7cfa',
				600: '#4c6ef5',
				700: '#4263eb',
				800: '#3b5bdb',
				900: '#364fc7',
			},
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			red: colors.rose,
			yellow: colors.yellow,
			green: colors.green,
			blue: colors.blue
		},
		fontFamily: {
			'title': ['Dosis', 'sans-serif']
		}
	},
	variants: {
		extend: {},
	},
}
