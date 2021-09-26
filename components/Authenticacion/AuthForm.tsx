import React, { useState, FC } from 'react';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import { TextInput, PasswordInput, Group, Checkbox, Button, Paper, LoadingOverlay } from '@mantine/core';
import { signUp } from '../../services/authentication';

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
		return (
			<Paper style={{ position: 'relative' }}>
				<form onSubmit={form.onSubmit((values) => console.log(values))}>
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
					<Group direction="column" position="apart" style={{ marginTop: 25 }}>
						<Button variant="link" color="teal" onClick={() => setFormType('signup')} size="sm">
							¿No Tienes Una Cuenta? Registrate"
						</Button>
						<Button color="teal" type="submit">
							Iniciar sesión
						</Button>
					</Group>
				</form>
			</Paper>
		)
	}
	else {
		const submitHandler = async(values: any) => {
			const request = await signUp(form.values.email, form.values.password, form.values.firstName, form.values.lastName)
			console.log(request)
		}

		return (
			<Paper style={{ position: 'relative' }}>
				<form onSubmit={form.onSubmit(submitHandler)}>
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
						label="I agree to sell my soul and privacy to this corporation"
						checked={form.values.termsOfService}
						onChange={(event) => form.setFieldValue('termsOfService', event.currentTarget.checked)}
						color="pink"
					/>

					<Group direction="column" position="apart" style={{ marginTop: 25 }}>
						<Button variant="link" color="teal" onClick={() => setFormType('login')} size="sm">
							Tienes Una Cuenta? Inicia Sesión
						</Button>
						<Button color="teal" type="submit">
							Registrarse
						</Button>
					</Group>
				</form>
			</Paper>
		)
	}
}
export default AuthForm


