/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#B90B14',
				'dark': '#181819',
				'light': '#FFFDED'
			}
		},
	},
	plugins: [],
}
