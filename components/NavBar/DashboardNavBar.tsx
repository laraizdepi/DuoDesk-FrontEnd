import { useRouter } from 'next/router';
import React, { useState, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Image, Menu } from '@mantine/core'

import { loginUser, logoutUser } from '../../Redux/actions/authActions';

import Logo from '../../Img/logos/DuoDeskLogo.png'
import { FiHome } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiBookBookmark } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import NotAuthModal from '../Authenticacion/NotAuthModal';


const DashboardNavBar: FC = (props) => {
	const [mobile, setMobile] = useState<boolean>(false)
	const dispatch = useDispatch()
	const router = useRouter()
	const user = useSelector((state: any) => {
		return state.authentication
			? state.authentication
			: { logged: false }
	})

	useEffect(() => {
		dispatch(loginUser(true))
		if (window.innerWidth <= 800) {
			setMobile(true)
		}
		const handleResize = () => {
			if (window.innerWidth <= 800) setMobile(true)
			else setMobile(false)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const logOutHandler = () => {
		dispatch(logoutUser())
		router.push('/', '/')
	}

	if (!user.logged) {
		return (
			<div>
				<NotAuthModal open={true} />
			</div>
		)
	}

	if (mobile === true) {
		return (
			<div className='flex flex-col h-screen border'>
				<div className='py-3 flex flex-row justify-around items-center'>
					<Image
						src={Logo.src}
						width={75}
						onClick={() => router.push('/', '/')}
					/>
					<div className='flex flex-row place-items-center'>
						<Menu
							placement="center"
							control={<Button variant='link' color='indigo'>Menú</Button>}
						>
							<Menu.Item color='indigo' className='hover:text-teal' icon={<FiHome />}>
								Inicio
							</Menu.Item>
							<Menu.Item color='indigo' className='hover:text-teal' icon={<VscAccount />} onClick={() => router.push('/dashboard/account', '/dashboard/account')}>
								Mi cuenta
							</Menu.Item>
							<Menu.Item color='indigo' className='hover:text-teal' icon={<HiOutlineOfficeBuilding />} onClick={() => router.push('/dashboard/offices', '/dashboard/offices')}>
								Mis Oficinas
							</Menu.Item>
							<Menu.Item color='indigo' className='hover:text-teal' icon={<BiBookBookmark />}>
								Historial
							</Menu.Item>
							<Menu.Item color='indigo' className='hover:text-teal' icon={<RiSecurePaymentLine />}>
								Pagos
							</Menu.Item>
						</Menu>
					</div>
					<div>
						<Menu
							placement="center"
							control={<Avatar src={user.user.image} radius="xl" size="md" />}
						>
							<Menu.Label>Cuenta</Menu.Label>
							<Menu.Item onClick={() => router.push('/dashboard/account', '/dashboard/account')}>Mi cuenta</Menu.Item>
							<Menu.Item onClick={() => router.push('/register-office', '/register-office')}>Registrar una oficina</Menu.Item>
							<Menu.Label>Sesión</Menu.Label>
							<Menu.Item color="pink" onClick={logOutHandler}>Cerrar sesión</Menu.Item>
						</Menu>
					</div>
				</div>
				<div className='h-full overflow-y-scroll'>
					{props.children}
				</div>
			</div>
		)
	}

	return (
		<div>
			<div className='py-3 px-5 flex flex-row justify-between items-center'>
				<Image
					src={Logo.src}
					width={100}
					onClick={() => router.push('/', '/')}
				/>

				<Menu
					placement="center"
					control={<Avatar src={user.user.image} radius="xl" size="md" />}
				>
					<Menu.Label>Cuenta</Menu.Label>
					<Menu.Item onClick={() => router.push('/dashboard/account', '/dashboard/account')}>Mi cuenta</Menu.Item>
					<Menu.Item onClick={() => router.push('/register-office', '/register-office')}>Registrar una oficina</Menu.Item>
					<Menu.Label>Sesión</Menu.Label>
					<Menu.Item color="pink" onClick={logOutHandler}>Cerrar sesión</Menu.Item>
				</Menu>
			</div>
			<div className='flex flex-row'>
				<div className='flex flex-col items-start w-1/5 h-3/4 space-y-5 mt-4'>
					<Button variant='white' color='indigo' size='md' className='hover:text-teal' leftIcon={<FiHome />}>
						Inicio
					</Button>
					<Button onClick={() => router.push('/dashboard/account', '/dashboard/account')} variant='white' color='indigo' size='md' className='hover:text-teal' leftIcon={<VscAccount />}>
						Mi cuenta
					</Button>
					<Button onClick={() => router.push('/dashboard/offices', '/dashboard/offices')} variant='white' color='indigo' size='md' className='hover:text-teal' leftIcon={<HiOutlineOfficeBuilding />}>
						Mis Oficinas
					</Button>
					<Button variant='white' color='indigo' size='md' className='hover:text-teal' leftIcon={<BiBookBookmark />}>
						Historial
					</Button>
					<Button variant='white' color='indigo' size='md' className='hover:text-teal' leftIcon={<RiSecurePaymentLine />}>
						Pagos
					</Button>
				</div>
				<div className='h-5/6 overflow-y-scroll w-full'>
					{props.children}
				</div>
			</div>
		</div>
	)
}

export default DashboardNavBar
