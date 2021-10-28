import React, { useState, FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';

import { TextInput, PasswordInput, Button, Paper, LoadingOverlay, Grid, Col } from '@mantine/core';

import { TiVendorMicrosoft } from 'react-icons/ti';
import { SiFacebook } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

import { logIn } from '../../services/authentication';
import { loginUser } from '../../Redux/actions/authActions';

import style from "./AuthModal.module.sass"
import { useRouter } from 'next/dist/client/router';

const LoginForm: FC = (props) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	const form = useForm({
		initialValues: { firstName: '', lastName: '', email: '', password: '', termsOfService: true, },
		// validationRules: {
		// 	firstName: (value) => value.trim().length >= 2,
		// 	lastName: (value) => value.trim().length >= 2,
		// 	email: (value) => /^\S+@\S+$/.test(value),
		// 	password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
		// },
	})

	const dispatch = useDispatch()

	const handleSubmit = async(values: any) => {
		await logIn(form.values.email, form.values.password)
		dispatch(loginUser())
		// console.log(request)
		// if (request) {
		// 	window.location.href = 'http://localhost:5000/auth/login'
		// }
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
						icon={<EnvelopeClosedIcon />}
						value={form.values.email}
						onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
						onFocus={() => form.setFieldError('email', false)}
						error={form.errors.email && 'Field should contain a valid email'}
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
						error={form.errors.password && 'Password should contain 1 number, 1 letter and at least 6 characters'}
					/>
					<div className='flex flex-row justify-center my-3'>
						<Button color="teal" type="submit" size="sm">
							Iniciar sesión
						</Button>
					</div>
				</Paper>
			</form>
			<div style={{ textAlign: 'center', marginBottom: '30px' }}>
				<Grid justify="center">
					<Col span={12} md={6}>
						<Button
							className={style.ButtonGoogle}
							component="a"
							rel="noopener noreferrer"
							href="http://localhost:5000/google/auth"
							leftIcon={<FcGoogle />}
							styles={{
								root: {
									backgroundColor: '#ffffff',
									border: 1,
									height: 42,
									paddingLeft: 28,
									paddingRight: 28,
									marginBottom: 10,
									marginTop: 10,
									color: '#898989',
								},
								leftIcon: {
									marginRight: 15,
								},
							}}>
							Sign in with google
						</Button>
					</Col>
				</Grid>
				<Grid justify="center">
					<Col span={12} md={6}>
						<Button
							component="a"
							rel="noopener noreferrer"
							href="http://localhost:5000/facebook/auth"
							leftIcon={<SiFacebook />}
							styles={{
								root: {
									backgroundColor: '#4267b2',
									border: 0,
									height: 42,
									paddingLeft: 20,
									paddingRight: 20,
									marginBottom: 10,
									color: 'white'
								},

								leftIcon: {
									marginRight: 15,
								},

							}}
						>Sign in with Facebook
						</Button>
					</Col>
				</Grid>
				<Grid justify="center">
					<Col span={12} md={6}>
						{/* Button microsoft */}
						<Button
							component="a"
							href="http://localhost:5000/microsoft/auth"
							leftIcon={<TiVendorMicrosoft />}
							styles={{
								root: {
									backgroundColor: '#2f2f2f',
									border: 0,
									height: 42,
									paddingLeft: 20,
									paddingRight: 20,
									marginBottom: 10,
									color: 'white'
								},

								leftIcon: {
									marginRight: 15,
								},

							}}
						>Sign in with microsoft
						</Button>
					</Col>
				</Grid>
			</div>
		</div>
	)
}
export default LoginForm


