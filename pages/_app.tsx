import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script'
import {
	MantineProvider,
	NormalizeCSS,
	GlobalStyles,
	useStylesCleanup,
	SsrProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../styles/index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from '../Redux';
import 'react-bnb-gallery/dist/style.css'
import DuoDeskLogo from '../Img/logos/DuoDeskLogo.png'

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	useStylesCleanup();

	return (
		<>
			<Provider store={store}>
				<SsrProvider>
					<Head>
						<title>DuoDesk Home</title>
						<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
						{/* <link rel="shortcut icon" href={DuoDeskLogo.src} type="image/x-icon" /> */}
					</Head>
					<MantineProvider
						theme={{
							/** Put your mantine theme override here */
							colorScheme: 'light',
						}}
					>
						<NormalizeCSS />
						<GlobalStyles />
						<NotificationsProvider>
							<Script async strategy="beforeInteractive" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANYOIziGbeDJiUhK10ZsgOv60IT2Et3tQ&libraries=places" />
							<Script async strategy="beforeInteractive" src="https://polyfill.io/v3/polyfill.min.js?features=default" />
							<Component {...pageProps} />
						</NotificationsProvider>
					</MantineProvider>
				</SsrProvider>
			</Provider>
		</>
	);
}