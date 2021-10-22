import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { SsrProvider, SheetsRegistry, ServerStyles } from '@mantine/core';import Script from 'next/script'
import DuoDeskLogo from '../Img/logos/DuoDeskLogo.svg'

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const registry = new SheetsRegistry();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				// eslint-disable-next-line react/display-name
				enhanceApp: (App) => (props) =>
				(
					<SsrProvider registry={registry}>
						<App {...props} />
					</SsrProvider>
				),
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<ServerStyles registry={registry} />
				</>
			),
		};
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="icon" href={DuoDeskLogo.src} />

					{/* font title */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap" rel="stylesheet" />

					{/* font text */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}