import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Menu, Group, Image, Input, Autocomplete, TextInput, Select, Drawer, Modal } from '@mantine/core'
import { useForm, useWindowScroll } from '@mantine/hooks'
import { NextLink } from '../NextLink/NextLink';
import Link from 'next/link'

import { loginUser, logoutUser } from '../../Redux/actions/authActions';

import SearchImputTest from "../SearchInput/SearchInput"
import AuthModal from '../Authenticacion/AuthModal';

import Logo from '../../Img/logos/DuoDeskLogo.png'

import { DatePicker } from '@mantine/dates';
import AuthDrawer from '../Authenticacion/AuthDrawer';
import { updateSearch } from '../../Redux/actions/searchActions';

const NavBar = () => {
	const [mobile, setMobile] = useState<boolean>(false)
	const [opened, setOpened] = useState<boolean>(false)
	const [color, setColor] = useState<string>('white')
	const dispatch = useDispatch()
	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	})
	const search = useSelector((state: any) => {
		return state.search
	})

	const searchForm = useForm({
		initialValues: {
			city: '',
			date: new Date(Date.now()),
			people: 1,
			type: 'Oficina privada'
		}
	})

	const handleSubmit = (values: any) => {
		let url = `/search?`
		if (values.city) {
			url = `${url}city=${values.city}&`
		}
		if (values.date) {
			url = `${url}date=${values.date}&`
		}
		if (values.people) {
			url = `${url}people=${values.people}&`
		}
		if (values.type) {
			url = `${url}type=${values.type}`
		}
		window.location.href = url
	}

	const [scroll, scrollTo] = useWindowScroll()
	const spaces = ["Oficina privada", "Escritorio personal", "Sala de conferencias", "Espacio abierto"]

	useEffect(() => {
		dispatch(loginUser(true))
		if (window.innerWidth <= 800) {
			setMobile(true)
		}
		const handleResize = () => {
			if (window.innerWidth <= 800) {
				setMobile(true)
			}
			else {
				setMobile(false)
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			dispatch(updateSearch({
				city: searchForm.values.city,
				date: searchForm.values.date,
				people: searchForm.values.people,
				type: searchForm.values.type
			}))
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (scroll.y > 400) {
			setColor('blue-50')
		}
		else {
			setColor('white')
		}
	}, [scroll.y])


	const logOutHandler = () => {
		dispatch(logoutUser())
	}

	if (mobile) {
		return (
			<div className="flex flex-row justify-between items-center m-3 mr-0">
				<div className="">
					<Link href='/'>
						<Image
							src={Logo.src}
							width={50}
						/>
					</Link>
				</div>
				<div>
					<Drawer opened={opened} size="xl" onClose={() => setOpened(false)} title="Buscar una oficina" padding="md">
						<form onSubmit={searchForm.onSubmit(handleSubmit)} className="flex flex-col justify-center space-y-6 p-4">
							<div>
								<Autocomplete
									data-autoFocus
									label="Escoger ciudad"
									placeholder="Escoger ciudad"
									data={['Hello']}
									size="xs"
									value={searchForm.values.city}
									onChange={event => searchForm.setFieldValue('city', event.valueOf())} />
							</div>
							<div>
								<DatePicker
									label="Escoger fecha de inicio"
									size="xs"
									placeholder="Fecha de inicio"
									dropdownType="modal"
									value={searchForm.values.date}
									onChange={event => {
										if (event?.valueOf()) {
											searchForm.setFieldValue('date', new Date(event.valueOf()))
										}
									}} />
							</div>
							<div>
								<TextInput
									label="Número de personas"
									size="xs"
									type="number"
									min={1}
									value={searchForm.values.people}
									onChange={event => searchForm.setFieldValue('people', Number(event.target.value))}
									placeholder="Número de personas" />
							</div>
							<div>
								<Select
									label="Tipo de espacio"
									data={spaces}
									defaultChecked
									defaultValue="Oficina privada"
									size="xs"
									value={searchForm.values.type}
									onChange={event => searchForm.setFieldValue('type', event.valueOf())} />
							</div>
							<div className="mx-auto">
								<Button size="xs" variant="light" type="submit">Buscar</Button>
							</div>
						</form>
					</Drawer>
					<Button color="indigo" variant="link" onClick={() => setOpened(!opened)}>
						Buscar
					</Button>

				</div>
				{user.logged
					? <div>
						<Menu
							placement="center"
							control={<Avatar src={user.user.image} radius="xl" size="md" />}
						>
							<Menu.Label>Cuenta</Menu.Label>
							<Menu.Item>Mi cuenta</Menu.Item>
							<Menu.Item>Registrar una oficina</Menu.Item>
							<Menu.Label>Sesión</Menu.Label>
							<Menu.Item color="pink" onClick={logOutHandler}>Cerrar sesión</Menu.Item>
						</Menu>
					</div>
					:
					<div className="flex flex-row justify-end w-max">
						<AuthDrawer color="teal" variant="link" text="Inicia sesión o registrate" form="login" />
					</div>
				}
			</div>
		)
	}

	return (
		<div className={`flex flex-row justify-around items-center sticky top-0 z-10 bg-${color} p-2 w-full shadow-md`}>
			<div>
				<Link href='/'>
					<Image
						src={Logo.src}
						fit='cover'
						width={100}
					/>
				</Link>
			</div>
			<form onSubmit={searchForm.onSubmit(handleSubmit)} className="flex flex-row justify-between border px-3 py-2 rounded-3xl">
				<div>
					<Autocomplete
						id="city-search"
						data={['Hello']}
						size="xs"
						variant="unstyled"
						placeholder="Escoger ciudad"
						value={searchForm.values.city}
						onChange={event => searchForm.setFieldValue('city', event.valueOf())} />
				</div>
				<div>
					<DatePicker
						id="date-search"
						size="xs"
						placeholder="Fecha de inicio"
						variant="unstyled"
						value={searchForm.values.date}
						onChange={event => {
							if (event?.valueOf()) {
								searchForm.setFieldValue('date', new Date(event.valueOf()))
							}
						}} />
				</div>
				<div>
					<TextInput
						id="people-search"
						size="xs"
						type="number"
						variant="unstyled"
						min={1}
						value={searchForm.values.people}
						onChange={event => searchForm.setFieldValue('people', Number(event.target.value || 1))}
						placeholder="Número de personas" />
				</div>
				<div>
					<Select
						id="type-search"
						data={spaces}
						variant="unstyled"
						defaultChecked
						defaultValue="Oficina privada"
						size="xs"
						value={searchForm.values.type}
						onChange={event => searchForm.setFieldValue('type', event.valueOf())} />
				</div>
				<div>
					<Button size="xs" variant="white" color="teal" type="submit">Buscar</Button>
				</div>
			</form>
			{user.logged
				? <div>
					<Menu
						withArrow
						placement="end"
						control={<Avatar src={user.user.image} radius="xl" size="md" />}
					>
						<Menu.Label>Cuenta</Menu.Label>
						<Menu.Item>Mi cuenta</Menu.Item>
						<Menu.Item>Registrar una oficina</Menu.Item>
						<Menu.Label>Sesión</Menu.Label>
						<Menu.Item color="pink" onClick={logOutHandler}>Cerrar sesión</Menu.Item>
					</Menu>
				</div>
				: <div className="flex flex-row justify-end w-max">
					<div className="ml-3">
						<Button color="indigo" variant="link" radius="lg">Registrar Oficina</Button>
					</div>
					<div className="mx-3">
						<AuthModal color="teal" variant="link" text="Iniciar sesión" form="login" />
					</div>
					<div className="mr-3">
						<AuthModal color="pink" variant="link" text="Registrarse" form="signup" />
					</div>
				</div>
			}
		</div>
	)
}

export default NavBar