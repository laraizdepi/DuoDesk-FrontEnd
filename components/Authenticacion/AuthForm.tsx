import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import { TextInput, PasswordInput, Checkbox, Button, Paper, LoadingOverlay, Grid, Col } from '@mantine/core';
import { logIn, signUp } from '../../services/authentication';
import { loginUser } from '../../Redux/actions/authActions';

interface AuthForm {
	initial: "login" | "signup"
}

const AuthForm: FC<AuthForm> = (props) => {
	const [formType, setFormType] = useState<"login" | "signup">(props.initial)
	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: { firstName: '', lastName: '', email: '', password: '', termsOfService: true, },
		validationRules: {
			firstName: (value) => formType === 'login' || value.trim().length >= 2,
			lastName: (value) => formType === 'login' || value.trim().length >= 2,
			email: (value) => /^\S+@\S+$/.test(value),
			password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
		},
	})


	if (formType === "login") {
		const dispatch = useDispatch()
		const submitHandler = async () => {
			const request = await logIn(form.values.email, form.values.password)
			if (request) {
				dispatch(loginUser())
			}
		}
		return (
			<form onSubmit={form.onSubmit(submitHandler)}>
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
				</Paper>
				<Grid justify="center" style={{ marginTop: 25, textAlign: 'center' }}>
					<Col span={12} md={6}>
						<Button variant="link" color="teal" onClick={() => setFormType('signup')} size="sm">
							¿No Tienes Una Cuenta? Registrate"
						</Button>
					</Col>
				</Grid>
				<Grid justify="center" style={{ textAlign: 'center' }}>
					<Col span={12} md={6}>
						<Button color="teal" type="submit" size="sm">
							Iniciar sesión
						</Button>
					</Col>
				</Grid>
			</form>
		)
	}
	else {
		const submitHandler = async () => {
			const request = await signUp(form.values.email, form.values.password, form.values.firstName, form.values.lastName)
			if (request === true) {
				setFormType('login')
			}
		}

		return (
			<form onSubmit={form.onSubmit(submitHandler)}>
				<Paper style={{ position: 'relative' }}>
					<LoadingOverlay visible={loading} />
					<div style={{ display: 'flex', marginBottom: 15 }}>
						<TextInput
							data-autofocus
							required
							placeholder="Juan"
							label="Nombre"
							radius="lg"
							style={{ marginRight: 20, flex: '0 0 calc(50% - 10px)' }}
							value={form.values.firstName}
							onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
							onFocus={() => form.setFieldError('firstName', false)}
							error={form.errors.firstName && 'First name should include at least 2 characters'}
						/>

						<TextInput
							required
							placeholder="Caballero"
							label="Apellido"
							radius="lg"
							style={{ flex: '0 0 calc(50% - 10px)' }}
							value={form.values.lastName}
							onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
							onFocus={() => form.setFieldError('lastName', false)}
							error={form.errors.lastName && 'Last name should include at least 2 characters'}
						/>
					</div>

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


					<Checkbox
						style={{ marginTop: 20 }}
						label="Al registrarme, acepto los terminos y condiciones"
						checked={form.values.termsOfService}
						onChange={(event) => form.setFieldValue('termsOfService', event.currentTarget.checked)}
						color="pink"
					/>

					<Grid justify="center" style={{ marginTop: 25, textAlign: 'center' }}>
						<Col span={12} md={6}>
							<Button variant="link" color="teal" onClick={() => setFormType('login')} size="sm">
								Tienes Una Cuenta? Inicia Sesión
							</Button>
						</Col>
					</Grid>
					<Grid justify="center" style={{ textAlign: 'center' }}>
						<Col span={12} md={6}>
							<Button color="teal" type="submit">
								Registrarse
							</Button>
						</Col>
					</Grid>
				</Paper>
			</form>
		)
	}
}
export default AuthForm


