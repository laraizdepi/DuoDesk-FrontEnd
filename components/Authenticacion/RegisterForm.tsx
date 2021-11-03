import React, { useState, FC } from 'react';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import { TextInput, PasswordInput, Checkbox, Button, Paper, LoadingOverlay, Grid, Col, Divider } from '@mantine/core';
import { signUp } from '../../services/authentication';
import { TiVendorMicrosoft } from 'react-icons/ti';
import { SiFacebook } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import style from "./AuthModal.module.sass"
import { useRouter } from 'next/dist/client/router';
import { useNotifications } from '@mantine/notifications';
import { RiUserUnfollowLine } from 'react-icons/ri'
import { CgUnavailable } from 'react-icons/cg';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

interface AuthForm {
    changeTabs: Function,
    changeEmail: Function,
}

const RegisterForm: FC<AuthForm> = (props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const notifications = useNotifications()

    const form = useForm({
        initialValues: { firstName: '', lastName: '', email: '', password: '', termsOfService: true, },
        validationRules: {
            firstName: (value) => value.trim().length >= 4,
            lastName: (value) => value.trim().length >= 4,
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
        },
    })

    const submitHandler = async () => {
        const input: any = document.getElementById('login-email-input')
        if (!form.values.termsOfService) {
            return notifications.showNotification({
                title: 'Error en el registro',
                message: 'Tienes que aceptar los terminos y condiciones',
                color: 'pink',
                icon: <CgUnavailable />
            })
        }
        const request = await signUp(form.values.email, form.values.password, form.values.firstName, form.values.lastName)
        if (request?.status === 400) {
            return notifications.showNotification({
                title: 'Error en el registro',
                message: 'Ya existe un usuario con ese correo',
                color: 'pink',
                icon: <RiUserUnfollowLine />
            })
        }
        else if (request?.status === 500) {
            return notifications.showNotification({
                title: 'Error en el registro',
                message: 'Hay un error en el servidor, por favor intentalo más tarde',
                color: 'pink',
                icon: <CgUnavailable />
            })
        }
        else {
            notifications.showNotification({
                title: 'Registro exitoso',
                message: 'Tu cuenta ha sido creada, ya puedes iniciar sesión',
                color: 'teal',
                icon: <IoCheckmarkDoneCircleOutline />
            })
            props.changeEmail(form.values.email)
            return props.changeTabs(0)
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
                        error={form.errors.firstName && 'Tu nombre debe tener al menos 4 caracteres'}
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
                        error={form.errors.lastName && 'Tu apellido debe tener al menos 4 caracteres'}
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
                    error={form.errors.email && 'Introduce un email valido, por favor'}
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
                <Divider label='Iniciar sesión con redes sociales' labelPosition='center' margins='xl' />
                <div className='flex flex-col space-y-4 mx-32 justify-center'>
                    <Button component='a' href='http://localhost:5000/google/auth' className='hover:bg-red-500 hover:text-white' leftIcon={<AiOutlineGooglePlus />} color='red' variant='outline'>Google</Button>
                    <Button component='a' href='http://localhost:5000/facebook/auth' className='hover:bg-blue-500 hover:text-white' leftIcon={<BsFacebook />} color='blue' variant='outline'>Facebook</Button>
                    <Button component='a' href='http://localhost:5000/microsoft/auth' className='hover:bg-gray-900 hover:text-white' leftIcon={<TiVendorMicrosoft />} color='dark' variant='outline'>Microsoft</Button>
                </div>
            </Paper>
        </form>
    )
}
export default RegisterForm


