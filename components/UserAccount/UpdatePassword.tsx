import { Button, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { BiUserCheck } from 'react-icons/bi'
import { CgUnavailable } from 'react-icons/cg'
import { GiConfirmed } from 'react-icons/gi'
import { HiOutlineUserRemove } from 'react-icons/hi'
import { useSelector } from 'react-redux'

interface UpdatePassword {
    setOpen: Function,
    open: boolean,
}

const UpdatePassword: FC<UpdatePassword> = (props) => {
    const [form, setForm] = useState<'confirm' | 'update'>('confirm')
    const notifications = useNotifications()
    const confirmForm = useForm({
        initialValues: {
            actualPassword: ''
        },
        validationRules: {
            actualPassword: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
        }
    })
    const updateForm = useForm({
        initialValues: {
            newPassword1: '',
            newPassword2: '',
        },
        validationRules: {
            newPassword1: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
            newPassword2: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
        }
    })

    const user = useSelector((state: any) => {
        return state.authentication
            ? state.authentication
            : { logged: false }
    })

    useEffect(() => {
        if (props.open === false) {
            confirmForm.reset()
        }
    }, [props.open])


    if (form === 'confirm') {
        const confirmHandler = async (values: any) => {
            const data = {
                email: user.user.email,
                password: confirmForm.values.actualPassword
            }
            const response = await axios.post('http://localhost:5000/auth/login', data, { withCredentials: true }).catch((error) => {
                if (error.response) {
                    return notifications.showNotification({
                        title: 'Error',
                        message: 'La contraseña es incorrecta. Intenta de nuevo',
                        color: 'pink',
                        icon: <HiOutlineUserRemove />
                    })
                }
                else {
                    return notifications.showNotification({
                        title: 'Error',
                        message: 'Error en el servidor. Intenta más tarde',
                        color: 'pink',
                        icon: <CgUnavailable />
                    })
                }
            })
            if (typeof response !== 'string' && response.data) {
                setForm('update')
            }
        }
        return (
            <div>
                <form className='flex flex-col space-y-6' onSubmit={confirmForm.onSubmit(confirmHandler)}>
                    <PasswordInput
                        value={confirmForm.values.actualPassword}
                        onChange={(event) => confirmForm.setFieldValue('actualPassword', event.target.value)}
                        placeholder='Confirma tu contraseña actual'
                        label='Confirma tu contraseña actual'
                    />
                    <Button leftIcon={<GiConfirmed />} color='teal' type='submit'>
                        Confirmar
                    </Button>
                </form>
            </div>
        )
    }

    const uploadHandler = async (values: any) => {
        if (updateForm.values.newPassword1 !== updateForm.values.newPassword2) {
            return notifications.showNotification({
                title: 'Error',
                message: 'Las contraseñas deben ser iguales',
                color: 'pink',
                icon: <HiOutlineUserRemove />
            })
        }
        const response = await axios.put('http://localhost:5000/user/password',
            { password: updateForm.values.newPassword1 }, { withCredentials: true }).catch((error) => {
                if (error.response) {
                    return notifications.showNotification({
                        title: 'Error',
                        message: 'Error. Intenta de nuevo y rectifica tus datos',
                        color: 'pink',
                        icon: <HiOutlineUserRemove />
                    })
                }
                else {
                    return notifications.showNotification({
                        title: 'Error',
                        message: 'Error en el servidor. Intenta más tarde',
                        color: 'pink',
                        icon: <CgUnavailable />
                    })
                }
            })
        if (typeof response !== 'string' && response.data) {
            return notifications.showNotification({
                title: 'Actualización correcta',
                message: 'Tu contraseña ha sido actualizada correctamente',
                color: 'teal',
                icon: <BiUserCheck />
            })
        }
    }

    return (
        <div>
            <form className='flex flex-col space-y-4' onSubmit={updateForm.onSubmit(uploadHandler)}>
                <PasswordInput
                    value={updateForm.values.newPassword1}
                    onChange={(event) => updateForm.setFieldValue('newPassword1', event.target.value)}
                    placeholder='Escribe la nueva contraseña'
                    label='Nueva contraseña'
                />
                <PasswordInput
                    value={updateForm.values.newPassword2}
                    onChange={(event) => updateForm.setFieldValue('newPassword2', event.target.value)}
                    placeholder='Confirma la nueva contraseña'
                    label='Confirma tu nueva contraseña'
                />
                <Button leftIcon={<GiConfirmed />} color='teal' type='submit'>
                    Confirmar
                </Button>
            </form>
        </div>
    )
}

export default UpdatePassword
