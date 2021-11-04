import React from 'react'
import { ActionIcon, Button, Image, Text, ThemeIcon, Title } from '@mantine/core'

import DuoDeskLogo from '../../Img/logos/DuoDeskLogo.png'
import { IoLocationOutline } from 'react-icons/io5'
import { TiPhoneOutline } from 'react-icons/ti'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className='border flex flex-col space-y-5 md:flex-row md:place-items-center justify-evenly p-4'>
            <div className='flex flex-row md:w-1/3'>
                <Image src={DuoDeskLogo.src} className='m-auto' width='50%' />
            </div>
            <div className='flex flex-col place-items-start'>
                <Button color='teal' leftIcon={<IoLocationOutline />} size='lg' variant='white'>Bogotá, Colombia</Button>
                <Button color='indigo' leftIcon={<TiPhoneOutline />} size='lg' variant='white'>+57 3133539142</Button>
                <Button color='pink' leftIcon={<HiOutlineMailOpen />} size='lg' variant='white'>duodesk.support@duodesk.work</Button>
            </div>
            <div className='md:w-1/3'>
                <Title order={3}>Sobre DuoDesk</Title>
                <Text size='sm'>
                    DuoDesk es una plataforma que actua como intermedio entre
                    personas que poseen un espacio de Coworking y personas que desean
                    rentar uno. Nuestro objetivo es hacer este proceso más rápido, sencillo
                    y menos tedioso.
                </Text>
                <div className='flex flex-row justify-evenly'>
                    <ActionIcon color='blue' size='xl'>
                        <BsFacebook size='1.5em' />
                    </ActionIcon>
                    <ActionIcon color='green' size='xl'>
                        <BsWhatsapp size='1.5em' />
                    </ActionIcon>
                    <ActionIcon size='xl' color='blue'>
                        <BsTwitter size='1.5em' />
                    </ActionIcon>
                    <ActionIcon size='xl' color='pink'>
                        <BsInstagram size='1.5em' />
                    </ActionIcon>
                </div>
            </div>
        </div>
    )
}

export default Footer
