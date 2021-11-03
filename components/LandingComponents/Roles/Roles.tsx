import React, { useEffect, useState } from 'react'
import { List, Tab, Tabs, ThemeIcon, Image, Text, Title } from '@mantine/core'
import { IoPeopleOutline } from 'react-icons/io5'
import { MdOutlineDesignServices } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { BsCreditCard2Front } from 'react-icons/bs'

import CoworkingImage from '../../../Img/home/coworking.svg'
import BusinessImage from '../../../Img/home/business.svg'

const MadeForAll = () => {
    return (
        <div className='flex flex-col place-items-center'>
            <Tabs  variant='pills' className='p-5' color='indigo' position='center'>
                <Tab label='DuoUser'>
                    <div className='flex flex-col md:flex-row p-5'>
                        <div className='flex flex-col space-y-5 w-2/3'>
                            <Text component={Title} align='center'>¿Qué puedo hacer como <span style={{ textDecoration: 'underline #4C6EF5' }}>DuoUser</span>?</Text>
                            <Text size='xl'>
                                Consigue tu oficina ideal, en poco tiempo y a precios bajos.
                                Solo tienes que hacer una busqueda con tus preferencias,
                                seleccionar una oficina y cuando te decidas a rentarla,
                                nosotros nos encargamos del resto. No solo vas a poder trabajar en un
                                ambiente adaptado a tus necesidades, podrás conocer nuevas personas,
                                impulsar grandes proyectos y mejorar tu trabajo en un ritmo exponencial.
                                ¡Acelera el proceso y aumenta tu productividad de forma rápida!
                            </Text>
                            <List className='flex flex-row space-x-3'>
                                <List.Item className='flex flex-col place-items-center'
                                    icon={
                                        <ThemeIcon color='indigo' variant='light' radius='xl' size='lg' className='flex flex-row justify-center'>
                                            <MdOutlineDesignServices size='1.5em' className='self-center' />
                                        </ThemeIcon>}>
                                    <Text size='lg'>
                                        Escoge una oficina diseñada a tus comodidades y deja que
                                        la creatividad fluya para aumentar tu productividad en
                                        tu trabajo o proyecto. ¡No hay nada que te detenga ahora!
                                    </Text>
                                </List.Item>
                                <List.Item
                                    icon={
                                        <ThemeIcon color='indigo' variant='light' radius='xl' size='lg' className='flex flex-row justify-center'>
                                            <IoPeopleOutline size='1.5em' className='self-center' />
                                        </ThemeIcon>}>
                                    <Text size='lg'>
                                        Conoce nuevas personas, nuevos proyectos, consigue colaboradores
                                        para el tuyo.¡Las posibilidades son infinitas cuando se trata
                                        de trabajar en espacios de Coworking!
                                    </Text>
                                </List.Item>
                            </List>
                        </div>
                        <Image
                            className='w-1/3'
                            src={CoworkingImage.src}
                        />
                    </div>
                </Tab>
                <Tab label='DuoHost' color='teal'>
                    <div className='flex flex-col md:flex-row p-5'>
                        <div className='flex flex-col space-y-5 w-2/3'>
                            <Text component={Title} align='center'>¿Qué puedo hacer como <span style={{ textDecoration: 'underline #12b886' }}>DuoHost</span>?</Text>
                            <Text size='xl'>
                                Comienza a rentar tu oficina en nuestra plataforma de manera sencilla.
                                Rellena un formulario con el cúal podremos encargarnos de automatizar el
                                proceso de rentar tu oficina. Ya no tendrás que preocuparte por acordar con
                                las personas horarios díficiles o estar pendiente al pago. En DuoDesk nos encargamos
                                de que puedas centrarte en lo que más importa dentro de tu oficina y solo cobraremos una
                                minima parte de las ganancias que nos servirá para expandir nuestra plataforma en beneficio mutuo.
                            </Text>
                            <List className='flex flex-row space-x-3'>
                                <List.Item className='flex flex-col place-items-center'
                                    icon={
                                        <ThemeIcon color='teal' variant='light' radius='xl' size='lg' className='flex flex-row justify-center'>
                                            <FaWpforms size='1.5em' className='self-center' />
                                        </ThemeIcon>}>
                                    <Text size='lg'>
                                        Registra tu oficina con precios, imagenes, ubicación, un nombre. Escoge
                                        que horarios maneja tu oficina o redacta una descripción completa gracias a un
                                        editor de texto enriquecido
                                    </Text>
                                </List.Item>
                                <List.Item
                                    icon={
                                        <ThemeIcon color='teal' variant='light' radius='xl' size='lg' className='flex flex-row justify-center'>
                                            <BsCreditCard2Front size='1.5em' className='self-center' />
                                        </ThemeIcon>}>
                                    <Text size='lg'>
                                        Recibe el dinero en tu cuenta de forma segura y rápida. Ya no te tendrás que
                                        preocupar por los pagos en tus espacios, pues en el momento en que empieces a recibir
                                        ganancias podrás retirar el dinero.
                                    </Text>
                                </List.Item>
                            </List>
                        </div>
                        <Image
                            className='w-1/3'
                            src={BusinessImage.src}
                        />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default MadeForAll
