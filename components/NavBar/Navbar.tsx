import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { loginUser, logoutUser } from '../../Redux/actions/authActions';
import { Grid, Col, Avatar, Button, Menu, Group } from '@mantine/core';
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/dist/client/router';
import AuthModal from '../Authenticacion/AuthModal';
import { NextLink } from '../NextLink/NextLink';
import { Container, Navbar } from 'react-bootstrap'


const NavbarBoot = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(loginUser(true))
	}, [])

	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	}
	)
	const logOutHandler = () => {
		dispatch(logoutUser())
	}
	// const start = <img alt="logo" src='https://primefaces.org/primereact/showcase/showcase/images/logo.png' height="40" className="p-mr-2"></img>;
	// const end = user.logged ? (
	// 	<Group>
	// 		<Button variant="gradient" gradient={{ from: 'indigo', to: 'pink' }}>
	// 			<a href="/register-office">Registra tu oficina</a>
	// 		</Button>
	// 		<Menu control={<Avatar src={user.user.image} color="indigo" radius="xl" size="md" />}>
	// 			<Menu.Label>Cuenta</Menu.Label>
	// 			<Menu.Item>Mi cuenta</Menu.Item>
	// 			<Menu.Item>Oficinas Favoritas</Menu.Item>
	// 			<Menu.Item onClick={logOutHandler}>Cerrar sessión</Menu.Item>
	// 		</Menu>
	// 	</Group>
	// ) :
	// 	(<Grid justify="space-between" gutter="xl" id='navnbar'>
	// 		<Col span={6}>
	// 			<AuthModal color='teal' text='Iniciar sesión' form="login" />
	// 		</Col>
	// 		<Col span={6}>
	// 			<AuthModal color='teal' text='Registro' form="signup" variant="outline" />
	// 		</Col>
	// 	</Grid>)

	// return (
	// 	<div>
	// 		<div className="card">
	// 			<Menubar model={[]} start={start} end={end} />
	// 		</div>
	// 		<div >
	// 			<Menubar model={[]} start={start} end={end} />
	// 		</div>
	// 		<div>
	// 			<Navbar bg="dark" variant="dark">
	// 				<Container>
	// 					<Navbar.Brand href="#home">
	// 						<img
	// 							alt=""
	// 							src='https://primefaces.org/primereact/showcase/showcase/images/logo.png'
	// 							width="30"
	// 							height="30"
	// 							className="d-inline-block align-top"
	// 						/>{' '}
	// 						React Bootstrap
	// 					</Navbar.Brand>
	// 				</Container>
	// 			</Navbar>
	// 		</div>
	// 	</div>
	// );
	if (user.logged) {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="http://localhost:3000/">
							<img
								alt=""
								src='https://primefaces.org/primereact/showcase/showcase/images/logo.png'
								width="30"
								height="30"
								className="d-inline-block align-top"
							/>{' '}
							React Bootstrap
						</Navbar.Brand>
						<Group>
							<Button variant="gradient" gradient={{ from: 'indigo', to: 'pink' }}>
								<a href="/register-office">Registra tu oficina</a>
							</Button>
							<Menu control={<Avatar src={user.user.image} color="indigo" radius="xl" size="md" />}>
								<Menu.Label>Cuenta</Menu.Label>
								<Menu.Item>Mi cuenta</Menu.Item>
								<Menu.Item>Oficinas Favoritas</Menu.Item>
								<Menu.Item onClick={logOutHandler}>Cerrar sessión</Menu.Item>
							</Menu>
						</Group>
					</Container>
				</Navbar>
			</div>
		)
	} else {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="http://localhost:3000/">
							<img
								alt=""
								src='https://primefaces.org/primereact/showcase/showcase/images/logo.png'
								width="30"
								height="30"
								className="d-inline-block align-top"
							/>{' '}
							React Bootstrap
						</Navbar.Brand>
						<Navbar.Collapse className="justify-content-end">
							<Button variant="gradient" gradient={{ from: 'indigo', to: 'pink' }}>
								<a href="/register-office">Registra tu oficina</a>
							</Button>
							<AuthModal color='teal' text='Iniciar sesión' form="login" />
							<AuthModal color='teal' text='Registro' form="signup" variant="outline" />
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>

		)
	}


}

export default NavbarBoot;
