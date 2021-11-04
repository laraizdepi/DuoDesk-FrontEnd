import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { Avatar, Button, Card, Center, Divider, Group, Image, Modal, Overlay, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { useDispatch, useSelector } from 'react-redux'

import { TiWarningOutline } from 'react-icons/ti'
import { BiEdit } from 'react-icons/bi'
import { MdEditRoad, MdOutlineCancel } from 'react-icons/md'
import { HiOutlineSaveAs, HiOutlineUserRemove } from 'react-icons/hi'
import { CgUnavailable } from 'react-icons/cg'
import { AiOutlineFileProtect } from 'react-icons/ai'

import DeleteAccount from '../../components/UserAccount/DeleteAccount'
import UpdatePassword from '../../components/UserAccount/UpdatePassword'
import DashboardNavBar from '../../components/NavBar/DashboardNavBar'

import GoogleLogo from '../../Img/logos/GoogleLogo.svg'
import FacebookLogo from '../../Img/logos/FacebookLogo.svg'
import MicrosoftLogo from '../../Img/logos/MicrosoftLogo.svg'
import DuoDeskLogo from '../../Img/logos/DuoDeskLogo.png'
import RegisterNotAuth from '../../Img/register/register-office.svg'

import { loginUser } from '../../Redux/actions/authActions'
import UpdateImage from '../../components/UserAccount/UpdateImage'
import { Container } from 'react-bootstrap'
export interface User {
    provider?: string,
    email: string,
    typeEmail: string | undefined,
    firstName: string,
    lastName: string,
    password: string | undefined,
    image: string,
    country?: {
        name: string
        code: string
    }
    birthDate: Date,
    createdDate: Date,
    extraInfo: [{
        field: string,
        value: string | number | boolean
    }]
    favoritesOffices: any[],
}

const Account = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [openPassword, setOpenPassword] = useState<boolean>(false)
    const [openImage, setOpenImage] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [overlay, setOverlay] = useState<boolean>(false)
    const [logo, setLogo] = useState(DuoDeskLogo)
    const notifications = useNotifications()
    const dispatch = useDispatch()

    const user: any = useSelector((state: any) => {
        // console.log(JSON.stringify(state))
        return state.authentication
            ? state.authentication
            : { logged: false }
    })
    const userForm = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
        }
    })

    useEffect(() => {
        dispatch(loginUser(false))
    }, [])

    useEffect(() => {
        if (user.logged) {
            userForm.setValues({
                email: user.user.email,
                firstName: user.user.firstName,
                lastName: user.user.lastName,
            })
            if (user.user.provider === 'google') setLogo(GoogleLogo)
            else if (user.user.provider === 'facebook') setLogo(FacebookLogo)
            else if (user.user.provider === 'microsoft') setLogo(MicrosoftLogo)
            else setLogo(DuoDeskLogo)
        }
    }, [user])


    if (!user.logged) {
        return (
            <Container className='bg-white'>
                <Modal opened onClose={() => { window.location.replace('/') }} title="Error de autenticación">
                    <Image
                        src={RegisterNotAuth.src}
                        caption={
                            <div>
                                <Text component={Title} order={4} align="center" size="lg" transform="capitalize" weight="bold" className="m-auto w-3/5">
                                    Debes estar registrado para poder registrar una oficina.
                                    Por favor, inicia sesión primero.
                                </Text>
                                <Button color="indigo" onClick={() => { window.location.replace('/') }} className='my-3 hover:bg-teal'>
                                    Ir a la página principal
                                </Button>
                            </div>
                        }
                    />
                </Modal>
                <div className='bg-white'>
                    <Image
                        src={RegisterNotAuth.src}
                        caption={
                            <div>
                                <Text component={Title} order={4} align="center" size="lg" transform="capitalize" weight="bold" className="m-auto w-3/5">
                                    Debes estar registrado para poder registrar una oficina.
                                    Por favor, inicia sesión primero.
                                </Text>
                                <Button color="indigo" onClick={() => { window.location.replace('/') }} className='my-3 hover:bg-teal'>
                                    Ir a la página principal
                                </Button>
                            </div>
                        }
                    />
                </div>
            </Container>
        )
    }


    const uploadHandler = async (values: any) => {
        setEdit(false)
        const data: any = {
            firstName: userForm.values.firstName,
            lastName: userForm.values.lastName,
        }
        if (userForm.values.email !== user.user.email) {
            data['email'] = userForm.values.email
        }
        const response = await axios.put('http://localhost:5000/user', data, { withCredentials: true }).catch((error) => {
            userForm.setValues({
                email: user.user.email,
                firstName: user.user.firstName,
                lastName: user.user.lastName
            })
            if (error.response) {
                return notifications.showNotification({
                    title: 'Error',
                    message: 'Ha ocurrido un problema actualizando la información, intenta de nuevo por favor',
                    color: 'pink',
                    icon: <HiOutlineUserRemove />
                })
            }
            else {
                return notifications.showNotification({
                    title: 'Error en el registro',
                    message: 'Hay un error en el servidor, por favor intentalo más tarde',
                    color: 'pink',
                    icon: <CgUnavailable />
                })
            }
        })
        if (typeof response !== 'string' && response.status) {
            dispatch(loginUser())
            return notifications.showNotification({
                title: 'Actualización exitosa',
                message: 'Se ha actualizado tu información correctamente',
                color: 'teal',
                icon: <MdEditRoad />
            })
        }
    }

    console.log(JSON.stringify(logo))

    return (
        <DashboardNavBar>
            <div className='flex flex-col relative h-auto'>
                {overlay && <Overlay opacity={0.6} color="#000" zIndex={10000} />}
                <Head>
                    <title>DuoDesk: Mi cuenta</title>
                </Head>
                <Modal opened={open} onClose={() => setOpen(false)} title='Confirmar acción' >
                    <DeleteAccount setOpened={setOpen} setOverlay={setOverlay} />
                </Modal>
                <Modal opened={openPassword} onClose={() => setOpenPassword(false)} title='Actualizar contraseña'>
                    <UpdatePassword setOpen={setOpenPassword} open={openPassword} />
                </Modal>
                <div>

                <Card withBorder shadow='md' padding="xl" className='flex flex-col justify-center space-y-3'>
                    <form onSubmit={userForm.onSubmit(uploadHandler)}>
                        <Modal opened={openImage} onClose={() => setOpenImage(false)} title='Actualizar foto de perfil'>
                            <UpdateImage />
                        </Modal>
                        <Group position="center" direction="row" className="m-auto space-x-5">
                            <Avatar onClick={() => setOpenImage(true)} src={user.user.image} size="xl" className='border rounded-full' />
                            <Divider orientation='vertical' />
                            <Image src={logo.src} width='7%' />
                        </Group>
                        <div className='flex flex-col justify-center w-full space-y-4'>
                            <div className='mx-auto text-center space-y-1'>
                                <Title order={2}>Correo electronico</Title>
                                <TextInput
                                    onChange={(event) => userForm.setFieldValue('email', event.target.value)}
                                    value={userForm.values.email}
                                    type="email"
                                    readOnly={!edit || user.user.provider !== 'local'}
                                    variant={edit && user.user.provider === 'local' ? 'default' : 'unstyled'}
                                    className='text-center w-full'
                                    styles={{
                                        input: {
                                            textAlign: 'center',
                                            fontSize: '18px',
                                            width: '100%'
                                        }
                                    }}
                                />
                            </div>
                            <div className='mx-auto text-center space-y-1'>
                                <Title order={2}>Nombres</Title>
                                <TextInput
                                    onChange={(event) => userForm.setFieldValue('firstName', event.target.value)}
                                    value={userForm.values.firstName}
                                    readOnly={!edit}
                                    variant={edit ? 'default' : 'unstyled'}
                                    styles={{
                                        input: {
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }
                                    }}
                                />
                            </div>
                            <div className='mx-auto text-center space-y-1'>
                                <Title order={2}>Apellidos</Title>
                                <TextInput
                                    onChange={(event) => userForm.setFieldValue('lastName', event.target.value)}
                                    value={userForm.values.lastName}
                                    readOnly={!edit}
                                    variant={edit ? 'default' : 'unstyled'}
                                    styles={{
                                        input: {
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }
                                    }}
                                />
                            </div>
                            <div className='mx-auto text-center space-y-1'>
                                <Title order={2}>Fecha de registro de la cuenta</Title>
                                <Text>
                                    {new Date(user.user.createdDate).toLocaleDateString('es-CO', {
                                        day: 'numeric',
                                        weekday: 'long',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </Text>
                            </div>
                        </div>
                        {edit
                            ?
                            <Center className='mx-auto my-5 space-x-8 space-y-1'>
                                <Button leftIcon={<HiOutlineSaveAs />} color='teal' variant='filled' type='submit'>Guardar</Button>
                                <Button leftIcon={<MdOutlineCancel />} color='pink' variant='outline' onClick={() => {
                                    userForm.setValues({
                                        email: user.user.email,
                                        firstName: user.user.firstName,
                                        lastName: user.user.lastName
                                    })
                                    setEdit(false)
                                }}>
                                    Cancelar
                                </Button>
                            </Center>
                            :
                            <Center className='mx-auto my-5 space-x-5'>
                                <Button leftIcon={<BiEdit />} color='indigo' onClick={(event: any) => {
                                    event.preventDefault()
                                    setEdit(true)
                                }} type='button'>Editar cuenta</Button>
                                {user.user.provider === 'local'
                                    ? <Button leftIcon={<AiOutlineFileProtect />} color='teal'
                                        onClick={() => setOpenPassword(true)}>
                                        Actualizar contraseña
                                    </Button>
                                    : null}
                                <Button leftIcon={<TiWarningOutline />} color='pink' onClick={() => setOpen(true)}>Eliminar cuenta</Button>
                            </Center>
                        }
                    </form>
                </Card>
                </div>
            </div>
        </DashboardNavBar>
    )
}

export default Account
