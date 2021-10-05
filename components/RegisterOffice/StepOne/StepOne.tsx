import React, { useState, useRef, useEffect } from 'react'
import { Grid, Col, TextInput, Textarea, Group, Divider } from '@mantine/core'
import { useDispatch } from 'react-redux';
import { Field, connect } from 'formik'
import yup from 'yup'

import AvailableHours from './AvailableHours';
import NewOfficeMap from '../../Maps/NewOfficeMap';
import { BsFillStarFill } from 'react-icons/bs';
import { Chip, TextField, Autocomplete } from '@mui/material';
import { useNotifications } from '@mantine/notifications';
import { MdErrorOutline } from 'react-icons/md';


const StepOne = () => {
    const amenities = [
        'Acceso a internet',
        'Protocolos de Bioseguridad',
        'Parqueadero para carros',
        'Parqueadero para motocicletas',
        'Parqueadero para bicicletas',
        'Parqueadero para carros gratis',
        'Parqueadero para motocicletas gratis',
        'Parqueadero para bicicletas gratis',
        'Recepción',
        'Elevador',
        'Buena iluminación',
        'Impresora',
        'Proyector',
        'Televisor',
        'Aire Acondicionado',
        'Fotocopiadora',
        'Escaner',
        'Cargadores',
        'Bancos de carga',
        'Refrigerador',
        'Café Gratis',
        'Té Gratis',
        'Snacks Gratis',
        'Venta de Cafe',
        'Alchol Permitido',
        'Restaurante',
        'Bar/Venta de alcohol disponible',
        'Cocina',
        'Servicio de cafetería',
        'Zona de recreación',
        'Gimnasio',
        'Espacio de Yoga',
        'Espacio de meditación',
        'Zona arcade',
        'Juegos de mesa',
        'Libreria',
        'Masajes',
        'Lugar para fumar',
        'Cabinas telefonicas',
        'Espacio para mascotas',
        'Espacio para maternidad',
        'Espacios al aire libre',
        'Sala de estar',
        'Lugares para dormir',
        'Espacio para llamada',
        'Espacios/Zonas verdes',
        'Casillero personal',
        'Terraza',
        'Zonas verdes',
        'Lugares de AirBnB cercanos',
        'Estacion de transporte cerca',
        'Vista al mar',
        'Cerca al Centro Comercial',
        'Cerca al Aeropuerto',
        'Cerca al Centro',
        'Cerca a zonas verdes',
        'Cerca a restaurantes',
        'Cerca a estacion de policias',
        'Servicio de limpieza',
        'Primeros Auxilios',
        'Servicio de correo',
        'Tablero acrilico con marcadores',
        'Tablero de notas/noticias',
        'Servicio 24 horas',
        'Sillas tipo Puff',
        'Sillas ergonómicas',
        'Servicio días festivos',
        'Servicio todos los días',
        'Permite Mascotas',
        'Seguridad Privada',
        'Duchas'
    ]

    const notifications = useNotifications()

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '1%' }}>
                <h3>Datos básicos de tu oficina</h3>
            </div>
            <Grid id="step-one" columns={24}>
                <Col span={24} md={11}>
                    <Field name='title'>
                        {({ field, form, meta }: any) => (
                            <TextInput
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Introduce el titulo de tu oficina"
                                label="Titulo de tu oficina"
                                radius="md"
                                size="md"
                                id="office-title"
                            />
                        )}
                    </Field>
                    <Field name='description'>
                        {({ field, form, meta }: any) => (
                            <Textarea
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                onBlur={(event) => {
                                    if(field.value.length < 120 || field.value.length > 550){
                                        notifications.showNotification({
                                            title: 'Error en la descripción de tu oficina',
                                            message: `Por favor, introduce una descripción para tu oficina
                                            que tenga entre 120 y 550 caracteres.`,
                                            color: 'pink', icon: <MdErrorOutline />
                                        })
                                        return
                                    }
                                }}
                                placeholder="Introduce la descripción de tu oficina"
                                label="Descripción de la oficina"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                minRows={4}
                                autosize
                                maxRows={9}
                            />
                        )}
                    </Field>
                    <Field name="officeAmenities">
                        {({ field, form, meta }: any) => (
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={amenities}
                                defaultValue={[]}
                                value={field.value}
                                onChange={(event, newInputValue) => {
                                    form.setFieldValue(field.name, newInputValue)
                                    console.log(field.value)
                                }}
                                onLoad={(event) => form.setFieldValue(field.name, [])}
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="filled" icon={<BsFillStarFill />} color="primary" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                groupBy={(option) => {
                                    if (amenities.indexOf(option) < 11) {
                                        return "Clasicas"
                                    }
                                    else if (amenities.indexOf(option) < 18) {
                                        return 'Tecnología/Conectividad'
                                    }
                                    else if (amenities.indexOf(option) < 29) {
                                        return 'Alimentación'
                                    }
                                    else if (amenities.indexOf(option) < 38) {
                                        return 'Diversión/Ocio'
                                    }
                                    else if (amenities.indexOf(option) < 49) {
                                        return 'Zonas'
                                    }
                                    else if (amenities.indexOf(option) < 58) {
                                        return 'Ubicación'
                                    }
                                    else {
                                        return 'Servicios'
                                    }
                                }}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Amenidades generales"
                                            placeholder="Amenidades generales"
                                        />
                                    )
                                }}
                            />
                        )}
                    </Field>
                    <Divider margins="xs" label="Horarios" labelPosition="center" />
                    <AvailableHours title="De Lunes a Viernes" />
                    <AvailableHours title="Sabado" disable />
                    <AvailableHours title="Domingo" disable />
                </Col>
                <Col span={24} md={13}>
                    <NewOfficeMap />
                </Col>
            </Grid>
        </div>
    )
}

export default StepOne