import NavbarBoot from '../components/NavBar/Navbar'
import React, { useEffect } from "react";
import RegisterSteps from '../components/RegisterOffice/RegisterSteps'
import { Container } from "react-bootstrap";
import Head from "next/head";
import { useSelector } from 'react-redux';
import { Modal } from '@mantine/core';

const RegisterOffice = () => {
	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	})

	return (
		<div>
			<Head>
				<title>New Office</title>
			</Head>
			<NavbarBoot />
			<Container>
				<Modal opened={!user.logged} onClose={() => {window.location.href = '/'}}>
					Debes estar registrado para poder registrar una oficina
				</Modal>
				<RegisterSteps />
			</Container>
		</div>
	)
}

export default RegisterOffice