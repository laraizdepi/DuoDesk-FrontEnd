import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loginUser, logoutUser } from '../../Redux/actions/authActions';
import { Avatar, Menu } from '@mantine/core';
import AuthModal from '../Authenticacion/AuthModal';

const NavbarBoot = () => {
	const dispatch = useDispatch()

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

	return (
		<Navbar collapseOnSelect expand="lg" variant="light" style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
			<Container>
				<Navbar.Brand href="#home">DuoDesk</Navbar.Brand >
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
					</Nav>
					<Nav className="justify-content-end" style={{ marginRight: '50px' }}>
						{user.logged ?
							<div className="d-flex justify-content-around align-items-center">
								<Avatar src={user.user.image} color="indigo" radius="xl" size="md" />
								<Menu>
									<Menu.Label>Cuenta</Menu.Label>
									<Menu.Item>Mi cuenta</Menu.Item>
									<Menu.Item>Oficinas Favoritas</Menu.Item>
									<Menu.Item onClick={logOutHandler}>Cerrar sessión</Menu.Item>
								</Menu>
							</div>
							: <div className="d-flex justify-content-evenly align-items-center">
								<AuthModal color='teal' text='Iniciar sesión' form="login" variant="outline" />
								<AuthModal color='teal' text='Registro' form="signup"/>
							</div>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarBoot;
