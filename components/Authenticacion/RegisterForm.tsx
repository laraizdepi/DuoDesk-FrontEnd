import React, { useState, FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import { TextInput, PasswordInput, Checkbox, Button, Paper, LoadingOverlay, Grid, Col } from '@mantine/core';
import { logIn, signUp } from '../../services/authentication';
import { loginUser } from '../../Redux/actions/authActions';
import { TiVendorMicrosoft } from 'react-icons/ti';
import { SiFacebook } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import style from "./AuthModal.module.sass"
import { useRouter } from 'next/dist/client/router';

interface AuthForm {
    changeTabs: Function
}

const RegisterForm: FC<AuthForm> = (props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm({
        initialValues: { firstName: '', lastName: '', email: '', password: '', termsOfService: true, },
        validationRules: {
            firstName: (value) => value.trim().length >= 2,
            lastName: (value) => value.trim().length >= 2,
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
        },
    })

    useEffect(() => {
		router.replace(router.pathname, '/sign-up', {shallow: true})
		return () => {
			router.replace(router.pathname, router.pathname, {shallow: true})
		}
	}, [])

    const submitHandler = async () => {
        const request = await signUp(form.values.email, form.values.password, form.values.firstName, form.values.lastName)
        props.changeTabs(0)
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
                <Grid justify="center" style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Col span={12} md={6}>
                        <Button color="teal" type="submit">
                            Registrarse
                        </Button>
                    </Col>
                </Grid>
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
            </Paper>
        </form>
    )
}
export default RegisterForm


