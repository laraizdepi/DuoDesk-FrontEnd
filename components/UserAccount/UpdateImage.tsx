import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import { useDispatch } from 'react-redux'
import { loginUser, updateUser } from '../../Redux/actions/authActions'
import { useNotifications } from '@mantine/notifications'
import { RiErrorWarningLine, RiImageEditLine } from 'react-icons/ri'
import { IoIosImages } from 'react-icons/io'
import { Title, Text, Button, Divider } from '@mantine/core'
import axios from 'axios'

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageTransform, FilePondPluginImageResize)

const UpdateImage = () => {
    const [files, setFiles] = useState<any[]>([])
    const dispatch = useDispatch()
    const notifications = useNotifications()
    return (
        <div className='flex flex-col space-y-5'>
            <div>
                <Title>Actualiza tu imagen</Title>
                <Text>En DuoDesk creemos que una imagen de perfil es fundamental.
                    No solo es una imagen que se muestra, es también una forma
                    de mostrar quien eres. Sí deseas actualizar tu foto, puedes
                    subir una personalizada o puedes dejarnos hacerte un avatar
                    personalizado(Son algo peculiares pero interesantes).
                </Text>
            </div>
            <Button color='indigo' leftIcon={<IoIosImages />} onClick={async () => {
                const response = await axios.put('http://localhost:5000/user/image', null, { withCredentials: true })
                if (response.status === 201) {
                    dispatch(loginUser(false))
                    notifications.showNotification({
                        title: 'Proceso exitoso',
                        message: 'Tu imagen ha sido actualizada correctamente',
                        color: 'teal',
                        icon: <RiImageEditLine />
                    })
                }
                else {
                    notifications.showNotification({
                        title: 'Error',
                        message: 'Ha ocurrido un error al actualizar tu imagen',
                        color: 'pink',
                        icon: <RiErrorWarningLine />
                    })
                }
            }}>
                Generar avatar aleatorio
            </Button>
            <Divider label='O subir tu propia imagen' labelPosition='center' />
            <FilePond
                allowImageCrop={true}
                allowImageTransform={true}
                imageCropAspectRatio={'1:1'}
                files={files}
                onupdatefiles={(files) => {
                    setFiles(files)
                }}
                instantUpload
                server={{
                    process: {
                        url: 'http://localhost:5000/user/image',
                        withCredentials: true,
                        method: 'PUT',
                        onload: (response) => {
                            if (response.error) {
                                notifications.showNotification({
                                    title: 'Error',
                                    message: 'Ha ocurrido un error al actualizar tu imagen',
                                    color: 'pink',
                                    icon: <RiErrorWarningLine />
                                })
                            }
                            else {
                                dispatch(loginUser(false))
                                notifications.showNotification({
                                    title: 'Proceso exitoso',
                                    message: 'Tu imagen ha sido actualizada correctamente',
                                    color: 'teal',
                                    icon: <RiImageEditLine />
                                })
                            }
                            return 0
                        }
                    }
                }}
                name="files"
                labelIdle='Actualizar imagen de perfil'
                className='cursor-pointer'
                stylePanelLayout='compact circle'
                imageResizeTargetWidth={200}
                imageResizeTargetHeight={200}
            />
        </div>
    )
}

export default UpdateImage
