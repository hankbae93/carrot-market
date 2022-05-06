# CarrotMarket

## 세팅

```zsh
// next.js
npx create-next-app@latest --typescript

// tailwind
yarn add -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

tailwind.config.js

```js
module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
```
