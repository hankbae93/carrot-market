import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				// refreshInterval: 2000,
				fetcher: (url: string) => fetch(url).then((res) => res.json()),
			}}
		>
			<div className='w-full max-w-xl mx-auto'>
				<Component {...pageProps} />
			</div>
		</SWRConfig>
	);
}

export default MyApp;
