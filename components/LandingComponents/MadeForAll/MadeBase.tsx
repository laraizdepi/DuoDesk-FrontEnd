import { ThemeIcon, Title, Text } from '@mantine/core'
import React, { FC } from 'react'

interface MadeProps{
    icon: React.ReactNode,
    title: string,
    text: string,
    color: string,
}

const MadeBase: FC<MadeProps> = (props) => {
    return (
        <div className='border p-5 m-3'>
            <div className='flex flex-row justify-center'>
                <ThemeIcon color={props.color} size='xl' variant='light' radius='xl'>
                    {props.icon}
                </ThemeIcon>
            </div>
            <div className='flex flex-col space-y-5 my-3'>
                <Text component={Title} align='center'>{props.title}</Text>
                <Text align='center'>{props.text}</Text>
            </div>
        </div>
    )
}

export default MadeBase
