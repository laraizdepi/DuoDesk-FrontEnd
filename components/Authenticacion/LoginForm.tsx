import React, { useState, FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';

import { TextInput, PasswordInput, Button, Paper, LoadingOverlay, Grid, Col, ActionIcon, Divider } from '@mantine/core';


import { FcGoogle } from 'react-icons/fc';

import { logIn } from '../../services/authentication';
import { loginUser } from '../../Redux/actions/authActions';

import { useRouter } from 'next/dist/client/router';
import { useNotifications } from '@mantine/notifications';
import { HiOutlineUserRemove } from 'react-icons/hi';
import { CgUnavailable } from 'react-icons/cg';
import { SiWebauthn } from 'react-icons/si';
import { BsFacebook } from 'react-icons/bs';
import { TiVendorMicrosoft } from 'react-icons/ti';
import { AiOutlineGooglePlus } from 'react-icons/ai';

const LoginForm: FC<{email?: string}> = (props) => {
	const notifications = useNotifications()
	const [loading, setLoading] = useState(false)
	const form = useForm({
		initialValues: { firstName: '', lastName: '', email: '', password: '', termsOfService: true, },
		validationRules: {
			email: (value) => /^\S+@\S+$/.test(value),
			password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
		},
	})
	const dispatch = useDispatch()

	useEffect(() => {
		if(props.email && props.email !== ''){
			form.setFieldValue('email', props.email)
		}
	}, [])

	const handleSubmit = async (values: any) => {
		const response = await logIn(form.values.email, form.values.password)
		if (response.status === 404) {
			return notifications.showNotification({
				title: 'Error al iniciar sesión',
				message: 'Verifica tus credenciales. El correo o la contraseña son incorrectos',
				color: 'pink',
				icon: <HiOutlineUserRemove />
			})
		}
		else if (response?.status === 500) {
			return notifications.showNotification({
				title: 'Error en el registro',
				message: 'Hay un error en el servidor, por favor intentalo más tarde',
				color: 'pink',
				icon: <CgUnavailable />
			})
		}
		else {
			notifications.showNotification({
				title: 'Inicio de sesión exitoso',
				message: 'Ahora, puedes empezar a reservar o poner en cuenta oficinas con tu cuenta.',
				color: 'teal',
				icon: <SiWebauthn />
			})
			return dispatch(loginUser())
		}
	}
	return (
		<div>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Paper style={{ position: 'relative' }}>
					<LoadingOverlay visible={loading} />
					<TextInput
						required
						placeholder="Tu Correo"
						label="Email"
						radius="lg"
						id='login-email-input'
						icon={<EnvelopeClosedIcon />}
						value={form.values.email}
						onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
						onFocus={() => form.setFieldError('email', false)}
						error={form.errors.email && 'Introduce un email valido'}
					/>
					<PasswordInput
						style={{ marginTop: 15 }}
						required
						placeholder="Micoworking1"
						label="Contraseña"
						showPasswordLabel="Show password"
						hidePasswordLabel="Hide password"
						icon={<LockClosedIcon />}
						radius="lg"
						value={form.values.password}
						onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
						onFocus={() => form.setFieldError('password', false)}
						error={form.errors.password && 'La contraseña debe tener al menos: números, letras y minimo 8 caracteres'}
					/>
					<div className='flex flex-row justify-center my-3'>
						<Button color="teal" type="submit" size="sm">
							Iniciar sesión
						</Button>
					</div>
				</Paper>
			</form>
			<Divider label='Iniciar sesión con redes sociales' labelPosition='center' margins='xl'/>
			<div className='flex flex-col space-y-4 mx-32 justify-center'>
				<Button component='a' href='http://localhost:5000/google/auth' className='hover:bg-red-500 hover:text-white' leftIcon={<AiOutlineGooglePlus/>} color='red' variant='outline'>Google</Button>
				<Button component='a' href='http://localhost:5000/facebook/auth' className='hover:bg-blue-500 hover:text-white' leftIcon={<BsFacebook/>} color='blue' variant='outline'>Facebook</Button>
				<Button component='a' href='http://localhost:5000/microsoft/auth' className='hover:bg-gray-900 hover:text-white' leftIcon={<TiVendorMicrosoft/>} color='dark' variant='outline'>Microsoft</Button>
			</div>
		</div>
	)
}
export default LoginForm


