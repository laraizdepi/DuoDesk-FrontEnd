import React, { FC } from 'react'
import { Image, Text } from '@mantine/core'

import ErrorImage from '../Img/error/ErrorImage.svg'

const Error = (props: any) => {
    console.log('props', props)
    console.log('error', props.error)
    console.log('error', props.response)
    return (
        <div>
            <Image
                src={ErrorImage.src}
                width="35%"
                fit="cover"
                className="m-auto"
                caption={
                    <div className='flex flex-col space-y-5'>
                        <Text align="center" size="lg" transform="capitalize" weight="bold" className="m-auto">
                            Ha ocurrido un error. Lo sentimos mucho. Sí el error persiste,
                            contacta con nosotros. Disculpa las molestias
                        </Text>
                        <Text align="center" size="md" transform="capitalize" weight="bold" className="m-auto">
                            Error {props.statusCode}
                        </Text>
                    </div>
                } />
        </div>
    )
}

Error.getInitialProps = (context: any) => {
    const statusCode = context.response ? context.response.statusCode : context.error ? context.error.statusCode : 404
    return { response: context.response, error: context.error ,statusCode }
}

export default Error
