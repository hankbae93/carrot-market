# CarrotMarket

> Serverless Carrot Market Clone using NextJS, Tailwind, Prisma, PlanetScale and Cloudflare.

```zsh
pscale connect carrot-market // db 연결

npx prisma studio // db 관리자 패널
```

## 세팅

```zsh
// next.js
npx create-next-app@latest --typescript

// tailwind
yarn add -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

// prisma complie error 시
npx prisma format
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

## Prisma

DB ORM

```zsh
Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb (Preview).
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
```

## Next.js

### Api Routes

처음에는 next.js는 리액트의 SSR 처리를 단순화하기 위해 태어났다고 생각햇다.

리액트 앱을 배포할 때 해당 도메인서버에서 npm run start를 하는 식으로 하질 않는다.

해당 앱에는 당연히 개발을 위한 라이브러리들도 잔뜩 설치되어있기 때문에 실제 배포에만 쓰일 파일들로 최적화하고 압축하는 과정이 필요하다.

그리고 해당 도메인에 접속하면 그 빌드된 파일을 클라이언트에게 전해줄 서버가 필요하다. 보통 express로 처리를 많이 한다.

```js
app.get("/", () => res.send(build / index.html));
```

그러나 Next.js는 프레임워크로서 이런 부분을 해결해주고 서버 개발까지 도와준다(풀스택).

api routes 기능은 서버사이드 개발을 지원한다.

```ts
import { NextApiRequest, NextApiResponse } from "next";
import client from "../@libs/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await client.user.create({
		// 해당 코드는 DB와 연결된 prisma
		data: {
			email: "hi",
			name: "hi",
		},
	});

	res.json({
		// express에서 보던 response
		ok: true,
		data: "xx",
	});
}
```

### NextAuth

유저가 로그인돼잇는지 아닌지 알려주는 훅과 function 제공

### Api Caching

기존 react 프로젝트에서는 redux 등 전역 상태로 저장햇지만

next.js는 페이지 별로 독립적이기에 auth api같은 경우는 인증을 했음에도 매번 불필요하게 요청해야된다.

그래서 react-query, swr 같은 api 캐싱 라이브러리들을 사용한다.

## SWR

```ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser() {
	const { data, error } = useSWR("/api/users/me", fetcher);
	// url을 Key로 캐싱해주고 새로고침이나 다른페이지를 다녀와도 캐싱된 데이터를 가져옴
	// 혹시 서버의 데이터가 변경되면 맞춰서 업데이트해준다

	return data;
}

/// mutate
// swr에서는 기존 캐싱하고 있는 데이터를 변형도 가능하다.
// url이 다른 요청의 캐싱데이터 또한 useSWRConfig를 통해 조작할 수 있다.
// mutate에서는 콜백으로 기존 데이터를 인자로 지원한다.(useState와 똑같다)
const ItemDetail: NextPage = () => {
	const user = useUser(); // 훅스에 swr로 캐싱된 다른 url의 데이터가 있다.
	const { mutate } = useSWRConfig();
	const { data, mutate: boundMutate } = useSWR(`/api/products/`)
	const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
	const onFavClick = () => {
		// 현재요청중인 products의 캐싱데이터
		boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
		// useUser에서 사용중인 users의 캐싱데이터
	 	mutate("/api/users/me", (prev:any) => ({...prev, ok: !prev.ok }), false)
		mutate("/api/users/me") // 아예 새로 요청하게 됨
	};
	...
}
```

## react-hook-forms

```tsx
import { useForm } from "react-hook-form";

export default function Forms() {
	const { register, watch, handleSubmit } = useForm();
	// register : 인자로 받은 name통해 ref와 name props , state value, onChange 연결
	// watch : 현재 폼 인풋 state들 객체로 리턴
	// handleSubmit : form 이벤트 핸들링 함수, valid할때의 함수와 invalid할 때 상황의 함수 2개를 인자로 받는다.

	const onValid = (data: LoginForm) => {
		console.log(data);
	};

	const inValid = (error: FieldErrors) => {
		console.log(error);
	};

	return (
		<form onSubmit={handleSubmit(onValid, inValid)}>
			<input
				{...register("username", {
					// (property) required?: string | ValidationRule<boolean> | undefined
					// boolean 데이터를 받거나 에러메세지를 적을수 있고 나중에 submit 이벤트가 발생할 때 활용할 수 잇다..
					required: "Username is required", // error 처리 또한 type별로 돌려받을 수 있다.
					minLength: {
						message: "The Username should be longer than 5 chars",
						value: 5,
					},
				})}
				type='text'
				placeholder='Username'
			/>
			<input
				{...register("email", {
					required: "email is required",
					validate: {
						notGmail: (value) =>
							!value.includes("@gmail.com") || "gmail is not allowed",
						// api 요청을 하거나 이렇게 커스텀한 validation도 적용할 수 있다.
					},
				})}
				type='email'
				placeholder='email'
			/>
			<input {...register("password")} type='password' placeholder='password' />
			<input type='submit' value='create Account' />
		</form>
	);
}
```
