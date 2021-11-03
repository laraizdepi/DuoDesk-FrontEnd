import NavBar from '../components/NavBar/Navbar'
import React, { useEffect, useRef } from "react";
import RegisterSteps from '../components/RegisterOffice/RegisterSteps'
import { Container } from "react-bootstrap";
import Head from "next/head";
import { useSelector } from 'react-redux';
import { Modal, Image, Title, Text, Button } from '@mantine/core';
import RegisterNotAuth from '../Img/register/register-office.svg'

const RegisterOffice = () => {
	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	})

	return (
		<div>
			<Head>
				<title>DuoDesk: Registra tu oficina</title>
			</Head>
			<NavBar>
				<Container>
					<Modal opened={!user.logged} onClose={() => { window.location.replace('/') }} title="Error de autenticación">
						<hr className='m-3' />
						<Image
							src={RegisterNotAuth.src}
							caption={
								<div>
									<Text component={Title} order={4} align="center" size="lg" transform="capitalize" weight="bold" className="m-auto w-3/5">
										Debes estar registrado para poder registrar una oficina.
										Por favor, inicia sesión primero.
									</Text>
									<Button color="indigo" onClick={() => { window.location.replace('/') }} className='my-3 hover:bg-teal'>
										Ir a la página principal
									</Button>
								</div>
							}
						/>
					</Modal>
					<RegisterSteps />
				</Container>
			</NavBar>
		</div>
	)
}

export default RegisterOffice