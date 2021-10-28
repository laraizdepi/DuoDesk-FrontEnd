import React, { FC, useState } from 'react'
import { Button, Divider, Group, LoadingOverlay, Overlay, Text } from '@mantine/core'
import { CgDanger } from 'react-icons/cg'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios'

interface DeleteAccountProps {
    setOpened: Function,
    setOverlay: Function
}

const DeleteAccount: FC<DeleteAccountProps> = (props) => {
    const [state, setState] = useState<'confirm' | 'process' | 'end'>('confirm')

    const deleteAccount = async () => {
        try {
            setState('process')
            props.setOverlay(true)
            await axios.delete('http://localhost:5000/user', { withCredentials: true})
            window.location.href = '/'
        }
        catch (error) {
            setState('confirm')
            props.setOverlay(false)
            console.log(error)
        }
    }

    if (state === 'confirm') {
        return (
            <div>
                <Divider />
                <Text className='m-3'>
                    ¿Estás seguro de que quieres eliminar tu cuenta? Se perdera toda tu
                    información relacionada(Datos, Reservas, etc). Adicionalmente, toda
                    información relacionada con transacciones se perderá y no se podrá recuperar
                </Text>
                <Group>
                    <Button
                        leftIcon={<CgDanger />}
                        color='red'
                        onClick={deleteAccount}
                    >
                        Eliminar cuenta
                    </Button>
                    <Button leftIcon={<MdOutlineCancel />} variant='outline' onClick={() => props.setOpened(false)}>Cancelar</Button>
                </Group>
            </div>
        )
    }

    return (
        <div className='relative'>
            <LoadingOverlay visible />
            <Divider />
            <Text className='m-3'>
                ¿Estás seguro de que quieres eliminar tu cuenta? Se perdera toda tu
                información relacionada(Datos, Reservas, etc). Adicionalmente, toda
                información relacionada con transacciones se perderá y no se podrá recuperar
            </Text>
            <Group>
                <Button leftIcon={<CgDanger />} color='red'>Eliminar cuenta</Button>
                <Button leftIcon={<MdOutlineCancel />} variant='outline' onClick={() => props.setOpened(false)}>Cancelar</Button>
            </Group>
        </div>
    )
}

export default DeleteAccount
