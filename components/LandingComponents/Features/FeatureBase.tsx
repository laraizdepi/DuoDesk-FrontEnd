import { Avatar, ThemeIcon, Title, Text } from '@mantine/core'
import React, { FC } from 'react'
import { MdSelfImprovement } from 'react-icons/md'

interface Features {
    color: 'teal' | 'indigo' | 'pink',
    title: string,
    text: string,
    icon: React.ReactNode
}

const FeatureBase: FC<Features> = (props) => {
    return (
        <div className='place-items-center w-full md:w-1/3 px-5 py-3 border rounded-lg flex flex-col space-y-4'>
            <ThemeIcon color={props.color} size={50} radius='xl' variant='light'>
                {props.icon}
            </ThemeIcon>
            <div className='flex flex-col space-y-3'>
                <Text component={Title} order={3} align='center'>{props.title}</Text>
                <Text>
                    {props.text}
                </Text>
            </div>
        </div>
    )
}

export default FeatureBase
