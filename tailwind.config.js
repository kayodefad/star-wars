module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			colors: {
				yellow: '#ffc501',
			},
			keyframes: {
				scrollText: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			animation: {
				scrollText: 'scrollText 15s linear infinite',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
