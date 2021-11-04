import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Script from 'next/script'
import {
	MantineProvider,
	NormalizeCSS,
	GlobalStyles,
	useStylesCleanup,
	SsrProvider,
} from '@mantine/core';

import store from '../Redux';
import '../styles/index.css'

import DuoDeskLogo from '../Img/logos/LogoDuoDesk.svg'

import 'bootstrap/dist/css/bootstrap.min.css';

import 'rsuite/dist/rsuite.min.css'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'react-bnb-gallery/dist/style.css'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	useStylesCleanup();

	return (
		<>
			<Provider store={store}>
				<SsrProvider>
					<Head>
						<title>DuoDesk: Consigue tu espacio de trabajo ideal</title>
						<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
						<link rel="shortcut icon" href={DuoDeskLogo.src} type="image/x-icon" />
						{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" /> */}
						{/* <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap" rel="stylesheet" /> */}
						{/* <link href="https://fonts.googleapis.com/css2?family=Dosis" rel="stylesheet" />
						<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" /> */}
						<link
							href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
							rel="stylesheet"
						/>
					</Head>
					<MantineProvider
						theme={{
							/** Put your mantine theme override here */
							colorScheme: 'light',
						}}
					>
						<NormalizeCSS />
						<GlobalStyles />
						<NotificationsProvider position='top-center'>
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