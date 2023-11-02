/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#F11C25',
				'primaryHover': '#B90B14',
				'dark': '#181819',
				'light': '#FFFDED'
			},
			keyframes: {
				in: {
				  "0%": { transform: "translateY(18px)", opacity: 0 },
				  "100%": { transform: "translateY(0)", opacity: 1 },
				},
				"in-reverse": {
				  "0%": { transform: "translateY(-18px)", opacity: 0 },
				  "100%": { transform: "translateY(0px)", opacity: 1 },
				},
			  },
			  animation: {
				in: "in .6s both",
				"in-reverse": "in-reverse .6s both",
			  },
		},
	},
	plugins: [],
}
