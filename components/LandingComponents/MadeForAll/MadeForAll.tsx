import React from 'react'
import { Title, Text } from '@mantine/core'
import { AiOutlineCode, AiOutlineRise } from 'react-icons/ai'
import { BsJournalBookmark } from 'react-icons/bs'
import MadeBase from './MadeBase'

const MadeForAll = () => {
    const data: {
        icon: React.ReactNode,
        title: string,
        text: string,
        color: string
    }[] = [
        {
            title: 'Programadores',
            text: 'Los programadores pueden encontrar un lugar más comodo para trabajar e impulsar sus proyectos. Trabajar en un espacio de Coworking es una ventaja debido a que se encontraran en un lugar con otros colegas y en un ambiente optimo para su estilo',
            color: 'pink',
            icon: <AiOutlineCode size='2em'/>
        },
        {
            title: 'Emprendendores',
            text: 'Los emprendedores van a poder impulsar su proyecto. Un espacio de Coworking puede ser el lugar donde nazcan las siguientes grandes empresas del futuro, o donde se creen Start Ups que cambien y revolucionen el mundo',
            color: 'indigo',
            icon: <AiOutlineRise size='2em'/>
        },
        {
            title: 'Estudiantes',
            text: 'Los estudiantes podrán encontrar un lugar para aprender de manera más optima, en un entorno sin distracciones. Incluso, el estudio con más personas es más efectivo para quienes disfrutan del trabajo colaborativo. Toda una opción para estudiantes.',
            color: 'teal',
            icon: <BsJournalBookmark size='2em'/>
        }
    ]

    return (
        <div className='flex flex-col'>
            <div className='mx-80'>
                <Text component={Title} align='center'>Hecho Para Todos</Text>
                <div className='px-10'>
                    <Text size='xl' align='center'>
                        ¡Los espacios de Coworking son lugares para trabajar diseñados para todo el mundo, para impulsar tu productividad!
                    </Text>
                </div>
            </div>
            <div className='flex flex-col space-y-10 md:space-y-0 space-x-10 md:flex-row justify-around mx-5'>
                {data.map((element) => {
                    return(
                        <MadeBase key={element.title} {...element}/>
                    )
                })}
            </div>
        </div>
    )
}

export default MadeForAll
