import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
	render(): JSX.Element {
		console.log("CustomDocument IS RUNNDING");
		return (
			<Html lang='ko'>
				<Head>
					<link
						href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
