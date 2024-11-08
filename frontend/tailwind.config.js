/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				pry: {
					DEFAULT: '#0057B7',
					light: '#DFEEF31F'
					// foreground: 'hsl(var(--primary-foreground))'
				},
				'pry-black': '#333333',
				'gray': '#F4F4F4'
			},
			spacing: {
				'1197': '1197px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

