import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Center, Divider, Group, Image, Modal, Overlay, Text, TextInput, Title } from '@mantine/core'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Redux/actions/authActions'
import GoogleLogo from '../../Img/logos/GoogleLogo.svg'
import FacebookLogo from '../../Img/logos/FacebookLogo.svg'
import MicrosoftLogo from '../../Img/logos/MicrosoftLogo.svg'
import DuoDeskLogo from '../../Img/logos/DuoDeskLogo.png'
import { Container } from '@material-ui/core'
import DeleteAccount from '../../components/UserAccount/DeleteAccount'
import { useForm } from '@mantine/hooks'
import { GrEdit } from 'react-icons/gr'
import { TiWarningOutline } from 'react-icons/ti'
import { BiEdit } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import { HiOutlineSaveAs } from 'react-icons/hi'
import NotAuthModal from '../../components/Authenticacion/NotAuthModal'

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
    const [edit, setEdit] = useState<boolean>(false)
    const [overlay, setOverlay] = useState<boolean>(false)
    const user: any = useSelector((state: any) => {
        return state.authentication
            ? state.authentication
            : { logged: false }
    })

    if (!user.logged || !user) {
        return (
            <NotAuthModal />
        )
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loginUser(true))
    }, [])

    console.log(!edit && user.user.provider !== 'local')

    let logo
    if (user.user.provider === 'google') logo = GoogleLogo
    else if (user.user.provider === 'facebook') logo = FacebookLogo
    else if (user.user.provider === 'microsoft') logo = MicrosoftLogo
    else logo = DuoDeskLogo
    const userForm = useForm({
        initialValues: {
            email: user.user.email,
            firstName: user.user.firstName,
            lastName: user.user.lastName,
        }
    })

    const uploadHandler = async (values: any) => {

    }

    return (
        <Center className='flex flex-col relative'>
            {overlay && <Overlay opacity={0.6} color="#000" zIndex={10000} />}
            <Head>
                <title>DuoDesk: Mi cuenta</title>
            </Head>
            <Modal opened={open} onClose={() => setOpen(false)} title='Confirmar acción' >
                <DeleteAccount setOpened={setOpen} setOverlay={setOverlay} />
            </Modal>
            <Card withBorder shadow='md' padding="xl" className='flex flex-col justify-center space-y-3 w-full md:w-2/5'>
                <form>
                    <Group position="center" direction="row" className="m-auto space-x-5">
                        <Avatar src={user.user.image} size="xl" />
                        <Divider orientation='vertical' />
                        <Avatar src={logo.src} size='xl' radius='xl' />
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
                                className='text-center'
                                styles={{
                                    input: {
                                        textAlign: 'center',
                                        fontSize: '18px'
                                    }
                                }}
                            />
                        </div>
                        <div className='mx-auto text-center space-y-1'>
                            <Title order={2}>Nombres</Title>
                            <TextInput
                                onChange={(event) => userForm.setFieldValue('firstName', event.target.value)}
                                value={userForm.values.firstName}
                                type="email"
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
                                type="email"
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
                            <Button leftIcon={<HiOutlineSaveAs />} color='teal' variant='filled' onClick={() => console.log('AJA')}>Guardar</Button>
                            <Button leftIcon={<MdOutlineCancel />} color='pink' variant='outline' onClick={() => {
                                userForm.reset()
                                setEdit(false)
                            }}>
                                Cancelar
                            </Button>
                        </Center>
                        :
                        <Center className='mx-auto my-5 space-x-8'>
                            <Button leftIcon={<BiEdit />} color='indigo' onClick={() => setEdit(!edit)}>Editar cuenta</Button>
                            {user.user.provider === 'local'
                                ? <Button>Actualizar contraseña</Button>
                                : null}
                            <Button leftIcon={<TiWarningOutline />} color='pink' onClick={() => setOpen(true)}>Eliminar cuenta</Button>
                        </Center>
                    }
                </form>
            </Card>
        </Center>
    )
}

export default Account
