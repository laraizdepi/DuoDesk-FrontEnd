import { AppProps } from 'next/app';
import Head from 'next/head';
import {
	MantineProvider,
	NormalizeCSS,
	GlobalStyles,
	useStylesCleanup,
	SsrProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from '../Redux';

{/* <style>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap');
</style> */}
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
						<link rel="shortcut icon" href="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" type="image/x-icon" />
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
							<Component {...pageProps} />
						</NotificationsProvider>
					</MantineProvider>
				</SsrProvider>
			</Provider>
		</>
	);
}