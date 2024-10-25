/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {

				moderateBlue: 'hsl(238, 40%, 52%)',
				softRed: 'hsl(358, 79%, 66%)',
				lightGrayishBlue: 'hsl(239, 57%, 85%)',
				paleRed: 'hsl(357, 100%, 86%)',

				darkBlue: 'hsl(212, 24%, 26%)',
				grayishBlue: 'hsl(211, 10%, 45%)',
				lightGray: 'hsl(223, 19%, 93%)',
				veryLightGray: 'hsl(228, 33%, 97%)',
				white: 'hsl(0, 0%, 100%)',
			},
			keyframes: {
				ripple: {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' },
				},
			},
			animation: {
				ripple: 'ripple 1.5s linear infinite',
			},
			maskImage: {
				'ripple-circle': 'radial-gradient(300px_circle_at_center, white, transparent)',
			},
		},
	},
	plugins: [],
}
