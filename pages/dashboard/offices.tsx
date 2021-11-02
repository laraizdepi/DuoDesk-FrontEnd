import React, { useEffect, useState } from 'react'
import { Accordion, ActionIcon, Menu, Table, Image, Text, Avatar, Group, Divider, Button, Modal, List, ThemeIcon } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import axios from 'axios'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiToggleRight } from 'react-icons/bi'
import { GiSettingsKnobs } from 'react-icons/gi'
import { MdOutlineSettingsSuggest } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { VscSymbolMethod } from 'react-icons/vsc'

import DashboardNavBar from '../../components/NavBar/DashboardNavBar'
import { loginUser } from '../../Redux/actions/authActions'

import NoOffice from '../../Img/dashboard/offices/no-offices.svg'
import SearchingImage from '../../Img/dashboard/offices/searching.svg'
import DoneImage from '../../Img/dashboard/offices/done.svg'

interface Office {
    id: any,
    name: string,
    description: string,
    host: any,
    isActive: boolean,
    generalAmenities: string[]
    spaces: {
        nameSpace: string,
        typeSpace: string,
        capacitySpace: number,
        availableSpace: number,
        hourPrice: number,
        dayPrice: number,
        weekPrice: number,
        monthPrice: number,
        nameAmenities: string[],
        imagesUrls: string[],
        isActive: boolean,
        bookings?: {
            idHost: any,
            idUser: any,
            idOffice: any,
            idTransaction?: string,
            startDate: string,
            endDate: string,
            people: number,
            priceSubtotal: number,
            priceTotal: number,
            dateReservation: number | Date,
            state: string,
            isActive: boolean
        }[]
    }[],
    address: any,
    scores?: {
        averageScore: number,
        reviews: any
    },
    days: [{
        day: string,
        isAvailable: boolean,
        startHour?: string,
        endHour?: string
    }],
    notifications: string[],
    official: string[],
    openDate: string
}

const Offices = () => {
    const [offices, setOffices] = useState<Office[]>([])
    const [openInfo, setOpenInfo] = useState<boolean[]>([])
    const [state, setState] = useState<0 | 1 | 2>(0)
    const dispatch = useDispatch()
    const router = useRouter()
    const notifications = useNotifications()

    const getOffices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/offices/user', { withCredentials: true })
            if (response.data.length > 0) setState(1)
            else setState(2)
            setOffices(response.data)
            response.data.map((element: any) => setOpenInfo([...openInfo, false]))
        }
        catch (error) {
            setState(2)
        }
    }

    const toggleOffice = async (office: Office) => {
        try {
            await axios.put('http://localhost:5000/offices/toggle', { office: office.id }, { withCredentials: true })
            await getOffices()
            notifications.showNotification({
                title: 'Proceso exitoso',
                message: 'Se ha actualizado el estado de tu oficina',
            })
        }
        catch (error) {
            notifications.showNotification({
                title: 'Error',
                message: 'Ha sucedido un error. Intenta de nuevo',
            })
        }
    }

    const toggleSpace = async (office: Office, space: string) => {
        try {
            await axios.put('http://localhost:5000/offices/toggle', { office: office.id, space }, { withCredentials: true })
            await getOffices()
            notifications.showNotification({
                title: 'Proceso exitoso',
                message: 'Se ha actualizado el estado de tu oficina',
            })
        }
        catch (error) {
            notifications.showNotification({
                title: 'Error',
                message: 'Ha sucedido un error. Intenta de nuevo',
            })
        }
    }

    const deleteSpace = async (office: Office, space: string) => {
        try {
            await axios.delete(`http://localhost:5000/offices/${office.id}/${space}`, { withCredentials: true })
            await getOffices()
            notifications.showNotification({
                title: 'Proceso exitoso',
                message: 'Se ha actualizado el estado de tu oficina',
            })
        }
        catch (error) {
            notifications.showNotification({
                title: 'Error',
                message: 'Ha sucedido un error. Intenta de nuevo',
            })
        }
    }

    const deleteOffice = async (office: Office) => {
        try {
            await axios.delete(`http://localhost:5000/offices/${office.id}`, { withCredentials: true })
            await getOffices()
            notifications.showNotification({
                title: 'Proceso exitoso',
                message: 'Se ha actualizado el estado de tu oficina',
            })
        }
        catch (error) {
            notifications.showNotification({
                title: 'Error',
                message: 'Ha sucedido un error. Intenta de nuevo',
            })
        }
    }

    useEffect(() => {
        dispatch(loginUser(false))
        getOffices()
    }, [])

    if (state === 0) {
        return (
            <DashboardNavBar>
                <Head>
                    <title>DuoDesk: Mis Oficinas</title>
                </Head>
                <div className='m-5 flex flex-col place-items-center'>
                    <Image
                        className='mx-auto my-0'
                        src={SearchingImage.src}
                        width='50%'
                        caption={
                            <div className='space-y-4 mx-32 my-0 flex flex-col justify-center'>
                                <Text align="center" size="lg" transform="capitalize" weight="bold">
                                    Estamos recopilando la información de tus oficinas. Por favor, ten algo
                                    de paciencia. En breves tendremos la información lista.
                                </Text>
                            </div>
                        }
                    />
                </div>
            </DashboardNavBar>
        )
    }

    if (state === 2) {
        return (
            <DashboardNavBar>
                <Head>
                    <title>DuoDesk: Mis Oficinas</title>
                </Head>
                <div className='m-5 flex flex-col place-items-center'>
                    <Image
                        className='mx-auto my-0'
                        src={NoOffice.src}
                        width='40%'
                        caption={
                            <div className='space-y-4 mx-32 my-0 flex flex-col justify-center'>
                                <Text align="center" size="lg" transform="capitalize" weight="bold">
                                    No hemos encontrado ninguna oficina en tu cuenta.
                                    Sí deseas convertirte en <span style={{ textDecoration: 'underline #12b886' }}>DuoHost</span> puedes empezar registrando tu primera oficina
                                </Text>
                                <Button color='indigo' onClick={() => router.push('/register-office', '/register-office')}>
                                    ¡Registrar mi primera oficina!
                                </Button>
                            </div>
                        }
                    />
                </div>
            </DashboardNavBar>
        )
    }

    return (
        <DashboardNavBar>
            <Head>
                <title>DuoDesk: Mis Oficinas</title>
            </Head>
            <Accordion initialItem={-1} multiple >
                {offices.map((office, index) => {
                    return (
                        <Accordion.Item key={office.name} label={
                            <Group>
                                <Avatar src={office.spaces[0].imagesUrls[0]} radius='xl' />
                                <div>
                                    <Text>{office.name}</Text>
                                    <Text size="sm" color={office.isActive ? 'teal' : 'pink'} weight={400}>
                                        {office.isActive ? 'Oficina activa' : 'Oficina no activa'}
                                    </Text>
                                </div>
                            </Group>
                        }>
                            <Group>
                                <Button color='indigo' leftIcon={<AiOutlineInfoCircle />} onClick={() => setOpenInfo(openInfo.map((element, position) => {
                                    if (index === position) return true
                                    return element
                                }))}>Información de la oficina</Button>
                                <Menu control={
                                    <Button color='pink' leftIcon={<GiSettingsKnobs />}>Acciones De La Oficina</Button>
                                }>
                                    <Menu.Label>Acciones</Menu.Label>
                                    <Menu.Item color='teal' icon={<TiEdit />} onClick={() => router.push(`/dashboard/edit-office/${office.id}`, `/dashboard/edit-office/${office.id}`)}>Editar</Menu.Item>
                                    <Menu.Item color='pink' icon={<RiDeleteBin6Line />} onClick={() => deleteOffice(office)}>Eliminar</Menu.Item>
                                    <Menu.Item color='indigo' icon={<BiToggleRight />} onClick={() => toggleOffice(office)}>
                                        Cambiar estado
                                    </Menu.Item>
                                </Menu>
                            </Group>
                            <Modal opened={openInfo[index]}
                                onClose={() => setOpenInfo(openInfo.map((element, position) => {
                                    if (index === position) return false
                                    return element
                                }))}
                                title={`Información de ${office.name}`}
                            >
                                <div className='flex flex-col'>
                                    <Divider label='Descripción' labelPosition='center' margins='xl' />
                                    <div dangerouslySetInnerHTML={{ __html: office.description }}></div>
                                    <Divider label='Amenidades generales' labelPosition='center' margins='xl' />
                                    <List
                                        spacing='md'
                                        icon={
                                            <ThemeIcon color='teal' radius='xl'>
                                                <VscSymbolMethod />
                                            </ThemeIcon>
                                        }>
                                        {office.generalAmenities.map((amenitie) => {
                                            return (
                                                <List.Item key={amenitie}>
                                                    {amenitie}
                                                </List.Item>
                                            )
                                        })}
                                    </List>
                                </div>
                            </Modal>
                            <Table striped highlightOnHover>
                                <thead>
                                    <tr>
                                        <th>Nombre del espacio</th>
                                        <th>Tipo del espacio</th>
                                        <th>Capacidad del espacio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {office.spaces.map((space) => (
                                        <tr key={space.nameSpace}>
                                            <td>{space.nameSpace}</td>
                                            <td>{space.typeSpace}</td>
                                            <td>{space.capacitySpace}</td>
                                            <td className={`${space.isActive ? 'text-teal-700' : 'text-pink'}`}>
                                                {space.isActive ? 'Activo' : 'No activo'}
                                            </td>
                                            <td>
                                                <Menu control={
                                                    <ActionIcon size='xl' color='indigo'>
                                                        <MdOutlineSettingsSuggest />
                                                    </ActionIcon>
                                                }>
                                                    <Menu.Label>Acciones</Menu.Label>
                                                    <Menu.Item color='teal' icon={<TiEdit />} onClick={() => router.push(`/dashboard/edit-office/${office.id}`, `/dashboard/edit-office/${office.id}`)}>Editar</Menu.Item>
                                                    <Menu.Item color='pink' icon={<RiDeleteBin6Line />} onClick={() => deleteSpace(office, space.nameSpace)}>Eliminar</Menu.Item>
                                                    <Menu.Item color='indigo' icon={<BiToggleRight />} onClick={() => toggleSpace(office, space.nameSpace)}>Cambiar estado</Menu.Item>
                                                </Menu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
            <div className='m-5 flex flex-col place-items-center'>
                <Image
                    className='mx-auto my-0'
                    src={DoneImage.src}
                    width='20%'
                    caption={
                        <div className='space-y-4 flex flex-col justify-center'>
                            <Text align="center" size="lg" transform="capitalize" weight="bold">
                                Nos encanta tenerte en nuestra plataforma. Y por eso te invitamos
                                a seguir con nosotros. Sí deseas registrar nuevas oficinas da click abajo.
                            </Text>
                            <Button color='indigo' onClick={() => router.push('/register-office', '/register-office')}>
                                Añadir más oficinas
                            </Button>
                        </div>
                    }
                />
            </div>
        </DashboardNavBar >
    )
}

export default Offices
