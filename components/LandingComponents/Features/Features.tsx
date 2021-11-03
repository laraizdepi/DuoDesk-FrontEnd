import { Title, Text } from '@mantine/core'
import React from 'react'
import { FcMoneyTransfer } from 'react-icons/fc'
import { MdSelfImprovement } from 'react-icons/md'
import { SiApacherocketmq } from 'react-icons/si'
import FeatureBase from './FeatureBase'

const Features = () => {
    const data: { color: 'teal' | 'indigo' | 'pink', title: string, text: string, icon: React.ReactNode}[] = [
        {
            color: 'pink',
            title: 'Aumento de la productividad',
            text: 'Varios estudios y experiencias personales demuestran que trabajar en espacios de Coworking es una potente experiencia para tu productividad.',
            icon: <MdSelfImprovement size='3em'/>
        },
        {
            color: 'indigo',
            title: 'Impulsa tu trabajo a otro nivel',
            text: '¡Tal vez en un espacio de Coworking puedas impulsar tu Start Up, tu proyecto, conocer a tu nuevo compañero o incluso a tu alma gemela! Todo es posible.',
            icon: <SiApacherocketmq size='2.5em'/>
        },
        {
            color: 'teal',
            title: 'Ahorra dinero, invierte en tu productividad',
            text: 'Mientras que rentar una oficina normal o adecuar tu hogar puede ser un proceso tedioso, los espacios de Coworking es el lugar ideal para tu productividad a un costo bajo',
            icon: <FcMoneyTransfer size='2.5em'/>
        },
    ]

    return (
        <div className='flex flex-col space-y-5 m-5'>
            <Text align='center' component={Title}>Ventajas de usar DuoDesk</Text>
            <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between md:space-x-10'>
                {data.map((element) => {
                    return (
                        <FeatureBase key={element.title} {...element} />
                    )
                })}
            </div>
        </div>
    )
}

export default Features
