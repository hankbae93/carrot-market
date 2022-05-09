# CarrotMarket

> Serverless Carrot Market Clone using NextJS, Tailwind, Prisma, PlanetScale and Cloudflare.

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

## tailwind

- 클래스네임을 아주 많이 가지고 있음.
- bootstrap이나 ant-design처럼 특정한 스타일이 없음
- 인텔리센스 활용한 수치확인 가능
- modifier를 활용한 다양한 상태 선택자

```tsx
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div className='bg-slate-400 py-20 px-10 grid gap-10 min-h-screen'>
			<div className='bg-white p-6 rounded-3xl shadow-xl'>
				<span className='font-semibold text-3xl'>Select ITEM</span>
				<div className='flex justify-between my-2'>
					<span className='text-gray-500'>Grey Chair</span>
					<span className='font-semibold'>$19</span>
				</div>
				<div className='flex justify-between my-2'>
					<span className='text-gray-500'>Grey Chair</span>
					<span className='font-semibold'>$19</span>
				</div>
				<div className='flex justify-between mt-2 pt-2 border-t-2 border-dashed'>
					<span>Total</span>
					<span className='font-semibold'>$10</span>
				</div>
				<div className='mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto'>
					Checkout
				</div>
			</div>
		</div>
	);
};

export default Home;
```

> 테일윈드는 여러 variable을 조정하는 클래스네임들로 구성되어잇다.

```css
.focus\:ring-2:focus {
	--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(
			--tw-ring-offset-width
		)
		var(--tw-ring-offset-color);
	--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(
			2px + var(--tw-ring-offset-width)
		)
		var(--tw-ring-color);
	box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0
				0 #0000);
}
```

> modifer <p>hover, first-child 등 클래스네임으로 선택가능</p>

```tsx
<ul>
	{Array<number>(5)
		.fill(1)
		.map((i) => {
			return (
				<div
					className='flex justify-between my-2 first:bg-blue-50 last:bg-blue-50'
					key={i}
				>
					<span className='text-gray-500'>Grey Chair</span>
					<span className='font-semibold'>$19</span>
				</div>
			);
		})}
</ul>
```

## responsive

```tsx
<div className='bg-white sm:bg-red-400 md:bg-teal-400 lg:bg-indigo-300 xl:bg-yellow-300 p-6 rounded-3xl shadow-xl'></div>
```

디폴트는 모바일에서부터 적용된다.

```css
@media (min-width: 640px) {
	.sm\:bg-red-400 {
		--tw-bg-opacity: 1;
		background-color: rgb(248 113 113 / var(--tw-bg-opacity));
	}
}
```

## dark mode

dark modifier로 통제함. class는 수동, media는 브라우저 환경을 따라간다.

```js
module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class" || "media",
	plugins: [],
};
```

## tailwind 원리

tailwind 3.0전까지는 실제로 엄청 큰 css파일을 가지고 있는 상태라 배포시에는 사용하는 클래스명을 제외한 나머지를 삭제하는 purging이라는 프로세스를 거쳣다.

**Just In Time Compiler**

클래스명을 생성하면 컴파일러가 그것을 찾아낸다음 새로 generate해준다. 그리고 제공하지 않는 수치도 JIT 컴파일러를 통해 쉽게 적용할 수 있다.

```html
<div className="bg-[#2b2b2b] bg-[url(./icon.png)]"></div>
```
