import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { SsrProvider, SheetsRegistry, ServerStyles } from '@mantine/core';import Script from 'next/script'
import DuoDeskLogo from '../Img/logos/LogoDuoDesk.svg'

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
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}