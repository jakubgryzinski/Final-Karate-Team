/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#F11C25',
				'dark': '#181819',
				'light': '#FFFDED'
			}
		},
	},
	plugins: [],
}
