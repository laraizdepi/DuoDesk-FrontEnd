import React from 'react'
import NavbarBoot from '../NavBar/Navbar'
import { Grid, Col, Image, Title, Text, Group, Button, Divider } from '@mantine/core';
import headerImage from '../../Img/home/headerTeamWork.svg'
import Home from "../../Img/home/Home.svg"
import styles from "./Header.module.sass"

const HeaderHome = () => {

    return (
        <div>
            <Grid style={{ margin: '7rem 3rem', marginRight: '0', marginBottom: '7rem' }} id="headerHome">
                <Col span={12} md={6}>
                    <Text variant="gradient" 
                        component={Title} order={1}
                        gradient={{ from: 'pink', to: 'indigo', deg: 50 }}
                    >
                        Encuentra tu lugar perfecto para trabajar
                    </Text>
                    <Text size="xl" align="left" style={{ marginTop: '1.5rem', marginRight: '5rem' }}>
                    Ahora es el momento de que todo esté bien.
                    Por eso, te invitamos a rentar oficinas con nosotros
                    </Text>
                    <Group position="left" spacing="xl" withGutter style={{marginTop: '1.5rem'}}>
                        <Button size="lg" radius="xl"
                            variant="gradient" gradient={{ from: 'pink', to: 'indigo', deg: 50 }}>
                            Empezar ahora
                        </Button>
                        <Divider orientation="vertical" margins="sm" />
                        <Button size="lg" radius="xl"
                            color="pink" variant="outline">
                            Aprender más
                        </Button>
                    </Group>
                </Col>
                
            </Grid>
        </div>
    );
}

export default HeaderHome;