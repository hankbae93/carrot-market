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

### \_middlewares

넥스트 서버에서 리소스를 제공하기전에 미들웨어로 함수들을 실행할 수 있다.

사용법은 해당 url의 폴더에 \_middleware.ts를 생성해서 작성하면 된다.

`NextRequest`는 사용자가 페이지를 요청을 할때 담기는 모든 정보를 가지고 있다.

`NextResponse`를 통해 페이지를 보호하거나 redirect하거나 액션을 취할 수 있다.

```ts
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.ua?.isBot) {
		return new Response("Don't be a bot");
	}
	if (!req.url.includes("/api")) {
		if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
			return NextResponse.redirect("/enter");
		}
	}
}
```

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

## CloudFlare DCU

만약 클라이언트에서 이미지를 업로드할 때 서버를 거쳐 CloudFlare에 전송한다면

두번의 전송비를 내야된다.

클라우드플레어는 그러지 않기 위해 클라이언트가 서버에게 이미지를 업로드한다고 요청하면

백엔드 서버는 클라우드플레어에게 클라우드플레어에게 빈 URL만 받아온다. (그리고 이과정은 우리의 API key 노출도 방지한다.)

그리고 그 URL을 받은 클라이언트는 직접 거기에 업로드하고 링크만 우리 DB에 저장하면 된다.

```ts
const { uploadURL } = await(await fetch(`/api/files`)).json();
const form = new FormData();
form.append("file", avatar[0], user?.id + "");
const {
	result: { id },
} = await(
	await fetch(uploadURL, {
		// 받은 CF URL로 직접 업로드한다.
		method: "POST",
		body: form,
	})
).json();
```

## Next Image

Next.js의 이미지 컴포넌트는 여러가지 기능을 지원한다.

1. lazy-loading
   스크롤을 내리기 전까지 이미지를 로드하지 않고 블러 형태로 대기하는 것을 지원해준다.

2. 이미지 최적화

local Image : 가지고 있는 이미지

```tsx
// 로드되기전 블러처리
// 품질도 조절할 수 있다.
<Image src={TestImg} placeholder='blur' quality={10} />
```

remote Image: 외부의 이미지.

```tsx
<Image
	width={48}
	height={48}
	src={getImgURLResized(data?.product?.user?.avatar)}
	className='w-12 h-12 rounded-full bg-slate-300'
	placeholder='blur' // 로컬용
	blurDataUrl='만들어논이미지' // https에서는 blur처리를 할수 없어 만들어논 이미지를 넣어놓기도한다.
	alt=''
/>
```

Next.js에서 이미지를 로드하기전에 `lazyloading`을 위해 블러처리를 하려면

크기를 미리 정해줘야한다.

해당 이미지는 이제 Next 이미지 서버에서 상대하는데 파일 본래 확장자로 받지 않고

webp 형식 등으로 변환되서 가져온다.

3. 크기 조절

보통 height는 정하지 않고 패딩 탑을 이용한다.

# `Dynamic Import`

```tsx
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
```

컴포넌트를 임포트하는 순간 이미 해당 파일을 번들링할때 해당 js code가 포함된다

예를 들어 Button을 클릭하면 Input이 보이는 구조라고 할 때

Input이 보이지 않아도

미리 최종 번들에 포함되어있고 사용자는 그걸 다운받게 된다.(그만큼 로드속도가 느려진다)

```tsx
// 옵션을 사용
const Input = dynamic(() => import("@components/input"), {
	ssr: false, // 서버단에서는 로딩하지 않도록
	loading: () => <span>Loading a big component</span>,
	// 용량이 크다면 loading동안 다른 컴포넌트를 보여줄 수 있다.
});

//suspense 활용
const Input = dynamic(() => import("@components/input"), {
	suspense: true,
})

...

return (
	<Suspense fallback={<span>LOADING COMPONENT</span>}>
		<Input />
	</Suspense>
);
```

Next.js의 `dynamic`은 컴포넌트를 lazy-loading할수 있게 도와준다.

해당 컴포넌트가 렌더되는 순간 import하는 것을 볼 수 있다.

만약 dynamic 컴포넌트가 용량이 크다면? `Preload`를 하는 방식도 좋다.

# `_Document.tsx`

```tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang='ko'>
				<Head></Head>
				<body>
					<Main />
					// AppComponent는 Main에서 렌더된다.
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
```

Next.js의 html 뼈대를 잡는 역할이다.

\_app.tsx와 다르게 서버에서 한번만 실행된다.

## Font 최적화

```tsx
// _document.tsx
<Head>
	<link
		href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap'
		rel='stylesheet'
	/>
</Head>
```

구글 폰트를 사용하면 처음에 해당 폰트들의 리소스 위치URL이 적혀있는

CSS 파일을 먼저 받아야한다.

그 후 또 사용자가 폰트를 받아오는 과정이 필요하다.

Next.js는 이런 과정을 미리 작업해둬서 (빌드 시 적용됨)

클라이언트는 바로 폰트를 사용할 수 있다.

## Script 최적화

라이브러리나 SDK를 불러올 때도 Next.js가 최적화를 도와준다.

스크립트마다 바로 불러와야 되거나 늦게 불러와야 되는 스크립트들이 있을 것이다.

```tsx
import Script from "next/script";
<Script
	src='https://developers.kakao.com/sdk/js/kakao.js'
	strategy='beforeInteractive' // 페이지를 불러오기 전 스크립트를 불러온다.
	strategy='afterInteractive' // default, 페이지를 불러온 다음 스크립트를 불러온다.
	strategy='lazyOnload' // 다른 모든 소스를 불러온 뒤 스크립트를 부른다
/>;
```

# `getServerSideProps`

서버사이드에서만 호출되는 함수

```tsx
export async function getServerSideProps() {
	const products = await client.product.findMany({});

	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	};
}
```

## 사용자가 해당 페이지를 접속할 때 로딩상태를 기다리기 원치 않을 때 사용

데이터를 다 불러오고 한번에 페이지를 전달해주는 식으로 진행된다.

단점

- 캐싱을 할수없어 매번 요청을 한다.(react-query를 활용해서 해결하기도 한다.)
- 서버사이드에서 에러가 났을 시 사용자가 아무 화면도 받을수가 없다.

<br />

# `getStaticProps`

    해당 페이지에 갔을 때 데이터가 거기에 존재하면 static.

`getServerSideProps`의 경우에는 유저의 요청마다 호출되지만

`getStaticProps`는 페이지가 빌드되고 Next.js가 html을 export할때 한번 호출됩니다.

html을 생성할 때 어떤 리소스든 활용할 수 있습니다.

```tsx
// 해당 코드는 가지고 있는 markdown폴더에서 가져와 html을 생성하는 코드입니다.
export async function getStaticProps() {
	const blogPosts = readdirSync("./posts").map((file) => {
		const content = readFileSync(`./posts/${file}`, "utf-8");

		return matter(content).data;
	});

	return {
		props: {
			posts: blogPosts,
		},
	};
}
```

```zsh
● /blog                                  1.58 kB        83.2 kB
●  (SSG)         automatically generated as static HTML + JSON (uses getStaticProps)
```

## `Error: getStaticPaths is required for dynamic SSG pages`

HTML을 미리 생성하려면 (pre-generate) Next.js는 우선 개수를 먼저 알아야한다.

[id].tsx의 경우에 url안에 변수가 포함되어있기 때문에 무제한이 될수가 있다.

이런 동적인 페이지에서 getStaticProps를 사용하려면 `getStaticPaths`도 활용해줘야한다.

```tsx
export function getStaticPaths() {
	const file = readdirSync("./posts").map((file) => {
		const [name, extension] = file.split(".");
		return {
			params: {
				slug: name, // 동적인 변수에 맞춰 이름을 넣어준다
			},
		};
	});

	return {
		paths: file, // path에서는 생성할 파일이름 배열을 전달한다
		fallback: false,
	};
}

export async function getStaticProps() {
	return {
		props: {},
	};
}
```

```zsh
// 빌드후 생성된 파일
 ● /blog/[slug]                           289 B          79.4 kB
├   ├ /blog/01-first-post
├   └ /blog/02-my-trip
```

### recap

Next.js는 페이지를 가져가서 일반 html로 만든다.

html로 export하는 동안 해당 페이지에 데이터를 넣고 싶을 수 있다.

`getStaticProps`를 사용할 땐 페이지가 빌드되기 전에 데이터를 추가해 html을 생성한다.

<br/>

# `Incremental Static Regeneration`

```tsx
export async function getStaticProps() {
	const posts = await client.post.findMany({ include: { user: true } });
	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts)),
		},
	};
}
```

기존 `getStaticProps`는 서버에서 한번 실행되기 때문에 그후로 업데이트되는 데이터의 HTML은

생성되지 않는다. `ISR`은 이런 문제를 해결하기 위해 일정한 주기별로 백그라운드에서

`getStaticProps`을 실행해 새로 HTML을 생성한다.

```tsx
export async function getStaticProps() {
	const posts = await client.post.findMany({ include: { user: true } });
	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts)),
		},
		revalidate: 20, // 주기를 정해주면 백그라운드에서 재실행한다.
	};
}
```

## `On-demand Revalidation`

`getStaticProps`을 주기별이 아닌 원하는 타이밍에 동작시킬 수 있다면?

아래 API가 호출되면 갱신하는 메소드도 실행할 것이다.

```tsx
async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method === "POST") {
		const {
			body: { question, latitude, longitude },
			session: { user },
		} = req;

		const post = await client.post.create({
			data: {
				question,
				latitude,
				longitude,
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});

		await res.revalidate("/community"); // 해당 getStaticProps 갱신

		res.json({
			ok: true,
			post,
		});
	}
}
```

`약간의 함정카드가 있는데 Next.js는 생성된 html을 먼저 주고 그 후 react-app을 주는 식으로 전개된다.`

이때문에 실제로는 갱신으로 새로운 html이 생성되었지만 리액트 앱 위에서만 페이지 이동을 하게 될 경우

사용자가 아예 새로고침을 하지 않는 한(서버에게 html을 달라고 요청) 갱신이 되지 않는 것처럼 느껴질 수 있다.

## `Blocking SSG`

```tsx
export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: "blocking", // html을 생성하는 동안은 사용자와 차단된다
		fallback: false,
		// 빌드타임때 생성하는 path배열의 html을 제외한 주소의 html을 요청하면 404 응답을 보낸다.
		fallback: true,
		// blocking과 반대로 사용자가 요청하면 html을 생성하는 와중에 최초 html을 미리 보내줄 수 있다.
	};
};
```

데이터의 개수가 적으면 pre-generate할 수도 있지만 만약 쇼핑몰의 상품 상세페이지처럼

수백개에서 수만개까지 있을 수 있는 html을 다 생성해놔야 될까?

`getStaticPaths`에서는 사용자가 요청했을 때 generate 후 html을 제공할 수 있는 `fallback`옵션이 존재한다.

이제는 수만개를 미리 생성하지 않고 사용자가 접속한 페이지들만 생성해 용량을 아낄 수 있다.
