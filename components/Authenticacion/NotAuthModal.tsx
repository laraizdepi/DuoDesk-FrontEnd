import React from "react";
import { useSelector } from 'react-redux';
import { Modal, Image, Title, Text, Button } from '@mantine/core';
import RegisterNotAuth from '../../Img/register/register-office.svg'

const NotAuthModal = () => {
    const user = useSelector((state: any) => {
        return state.authentication
            ? state.authentication
            : { logged: false }
    })

    return (
        <Modal opened={!user.logged} onClose={() => { window.location.replace('/') }} title="Error de autenticación">
            <hr className='m-3' />
            <Image
                src={RegisterNotAuth.src}
                caption={
                    <div>
                        <Text component={Title} order={4} align="center" size="lg" transform="capitalize" weight="bold" className="m-auto w-3/5">
                            Debes estar registrado para poder registrar una oficina.
                            Por favor, inicia sesión primero.
                        </Text>
                        <Button color="indigo" onClick={() => { window.location.replace('/') }} className='my-3 hover:bg-teal'>
                            Ir a la página principal
                        </Button>
                    </div>
                }
            />
        </Modal>
    )
}

export default NotAuthModal