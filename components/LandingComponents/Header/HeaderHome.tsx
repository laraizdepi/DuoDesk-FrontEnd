import React from 'react'
import { Grid, Col, Image, Title, Text, Group, Button, Divider } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { MdDoneAll } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import LandingImage from '../../../Img/home/landing-image.svg'

const HeaderHome = () => {
    const router = useRouter()
    const notifications = useNotifications()
    const user = useSelector((state: any) => {
        return state.authentication
            ? state.authentication
            : { logged: false }
    })

    const rentOffice = () => {
        const modal = document.getElementById('Auth-Modal')
        if (user.logged) {
            router.push('/register-office')
        }
        else {
            modal?.click()
        }
    }

    const focusSearch = () => {
        const input = document.getElementById('city-search')
        input?.focus()
        notifications.showNotification({
            title: 'Empieza a buscar una oficina',
            message: `Solo tienes que introducir en la barra de busqueda superior
            aquellos datos que se adapten a tus necesidades. Luego, da click en buscar
            y esperamos que consigas la oficina perfecta para ti`,
            color: 'teal',
            icon: <MdDoneAll />
        })
    }


    return (
        <div>
            <Grid className='my-4 mx-1 flex flex-col place-items-center md:flex-row justify-around' id="headerHome">
                <Col span={12} md={6} className="m-auto p-5">
                    <Text variant="gradient"
                    align="center"
                        component={Title} order={1}
                        gradient={{ from: 'pink', to: 'indigo', deg: 50 }}
                    >
                        Encuentra tu lugar perfecto para trabajar
                    </Text>
                    <Text size="xl" align="center">
                        Nuestra misión es apoyarte para que puedas trabajar en un lugar
                        comodo sin complicaciones y de forma agil. Sabemos que un buen sitio
                        es fundamental para un gran trabajo, y por eso, nuestro objetivo es que
                        puedas mejorarlo en las mejores oficinas.
                    </Text>
                    <div style={{ marginTop: '1.5rem' }} className='flex flex-col space-y-3 md:flex-row md:space-x-5 md:items-baseline'>
                        <Button
                            size="lg"
                            radius="xl"
                            onClick={focusSearch}
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'indigo', deg: 50 }}>
                            ¡Conseguir una oficina!
                        </Button>
                        <Button
                            size="lg"
                            radius="xl"
                            color="pink"
                            variant="outline"
                            onClick={rentOffice}
                        >
                            ¡Rentar una oficina!
                        </Button>
                    </div>
                </Col>
                <Col span={12} md={6} className="m-auto">
                    <Image
                        width="90%"
                        fit="cover"
                        src={LandingImage.src}
                    />
                </Col>
            </Grid>
        </div>
    );
}

export default HeaderHome;