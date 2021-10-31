import React, { FC } from 'react';
import { Col, Grid, TextInput, NumberInput, Title, Divider, Button, Center, Select } from '@mantine/core';
import { Field, useFormikContext } from 'formik';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { BsFillStarFill } from 'react-icons/bs'
import { MdErrorOutline, MdDoneAll } from 'react-icons/md'
import { useNotifications } from '@mantine/notifications';

import UploadImages from './UploadImages';

interface AddSpaceProps {
    spaces: any[],
    setSpaces: Function
}

const AddSpace: FC<AddSpaceProps> = (props, ref) => {
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

    const groupedItemTemplate = (item: any) => {
        return (
            <div className="p-d-flex p-ai-center country-item">
                <div>{item.label}</div>
            </div>
        );
    }


    const comparePrices = (hour: number, day: number, week: number, month: number) => {
        if (hour <= day) {
            if (day <= week) {
                if (week <= month) {
                    return { error: false, message: null }
                }
                else {
                    return { error: true, message: "El precio por semana es mayor que el precio por mes. Por favor, corrige esto." }
                }
            }
            else {
                return { error: true, message: "El precio por día es mayor que el precio por semana. Por favor, corrige esto." }
            }
        }
        else {
            return { error: true, message: "El precio por hora es mayor que el precio por día. Por favor, corrige esto." }
        }
    }

    const uniqueField = (list: any[], field: string, value: any) => {
        for (let item of list) {
            if (item[field] === value) {
                return false
            }
        }
        return true
    }

    const formikContext = useFormikContext()
    const notifications = useNotifications()
    const { values } = formikContext
    const handleNewSpace = (values: any) => {
        if (!values.nameSpace) {
            notifications.showNotification({
                title: 'Error',
                message: `Introduce un nombre valido para tu espacio por favor`,
                color: 'pink', icon: <MdErrorOutline />
            })
            return
        }
        else if (values.nameSpace.length < 5) {
            notifications.showNotification({
                title: 'Error',
                message: `Introduce un nombre valido para tu espacio por favor`,
                color: 'pink', icon: <MdErrorOutline />
            })
            return
        }
        else if (!uniqueField(props.spaces, 'nameSpace', values.nameSpace)) {
            notifications.showNotification({
                title: 'Error',
                message: `Introduce un nombre unico para cada espacio por favor`,
                color: 'pink', icon: <MdErrorOutline />
            })
            return
        }
        if (!values.typeSpace) {
            notifications.showNotification({
                title: 'Error',
                message: `Escoge una categoria para tu espacio por favor`,
                color: 'pink', icon: <MdErrorOutline />
            })
            return
        }

        const pricesValidation = comparePrices(values.hourPrice, values.dayPrice, values.weekPrice, values.monthPrice)
        if (pricesValidation.error) {
            notifications.showNotification({
                title: 'Error',
                message: `${pricesValidation.message}`,
                color: 'pink', icon: <MdErrorOutline />
            })
            return
        }
        if (!values.spaceImages || values.spaceImages.length < 1) {
            notifications.showNotification({
                title: 'Error',
                message: `Introduce una o más imagenes para cada espacio. 
                Sí ya las has agregado en el formulario, no olvides oprimir en "Guardar imagenes"`,
                color: 'pink', icon: <MdErrorOutline />
            })
            return
        }
        const newSpace = {
            nameSpace: values.nameSpace,
            typeSpace: values.typeSpace,
            capacitySpace: values.capacitySpace,
            availableSpace: values.availableSpace,
            hourPrice: values.hourPrice,
            dayPrice: values.dayPrice,
            weekPrice: values.weekPrice,
            monthPrice: values.monthPrice,
            nameAmenities: values.nameAmenities,
            spaceImages: values.spaceImages,
        }
        props.setSpaces([...props.spaces, newSpace])
        notifications.showNotification({
            title: 'Espacio añadido correctamente',
            message: `Felicitaciones, tu espacio ha sido añadido exitosamente.
            Sí deseas, puedes seguir añadiendo más o puedes continuar
            el formulario.`,
            color: 'teal', icon: <MdDoneAll />
        })
        formikContext.setFieldValue("nameSpace", '')
        formikContext.setFieldValue("typeSpace", '')
        formikContext.setFieldValue("capacitySpace", 1)
        formikContext.setFieldValue("availableSpace", 1)
        formikContext.setFieldValue("hourPrice", 10000)
        formikContext.setFieldValue("dayPrice", 50000)
        formikContext.setFieldValue("weekPrice", 400000)
        formikContext.setFieldValue("monthPrice", 1000000)
        formikContext.setFieldValue("nameAmenities", [])
        formikContext.setFieldValue('spaceImages', [])
    }

    return (
        <div>
            <Title order={1}>Registra tus espacios</Title>
            <Divider margins="xs" label="Información básica" labelPosition="center" />
            <Grid>
                <Col span={12} md={6}>
                    <Field name="nameSpace">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                onBlur={(event) => form.setFieldValue(field.name, event.target.value)}
                                onLoad={(event) => form.setFieldValue(field.name, '')}
                                placeholder="Nombre de tu espacio"
                                label="Nombre de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="name-space"
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="typeSpace">
                        {({ field, form, meta }: any) => (
                            <Select
                                data={
                                    ["Oficina privada", "Escritorio personal", "Sala de conferencias", "Espacio abierto"]
                                }
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                onBlur={(event) => form.setFieldValue(field.name, event.target.value)}
                                onLoad={(event) => form.setFieldValue(field.name, '')}
                                placeholder="Tipo de tu espacio"
                                label="Tipo de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="type-space"
                            />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Grid>
                <Col span={12} md={6}>
                    <Field name="capacitySpace">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={1}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 1)}
                                placeholder="Capacidad de tu espacio"
                                label="Capacidad de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="capacity-space"
                                min={1}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="availableSpace">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={1}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 1)}
                                placeholder="Cupos disponibles actualmente"
                                label="Cupos disponibles actualmente"
                                aria-label="My textarea" radius="md" size="md"
                                id="available-space"
                                min={1}
                            />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Divider margins="xs" label="Precios" labelPosition="center" />
            <Grid>
                <Col span={12}>
                    <Field name="hourPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={10000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por hora"
                                label="Precio por hora"
                                aria-label="My textarea" radius="md" size="md"
                                id="hour-price"
                                min={3000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="dayPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={50000}
                                step={10000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por día"
                                label="Precio por día"
                                aria-label="My textarea" radius="md" size="md"
                                id="day-price"
                                min={10000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="weekPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={400000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por semana"
                                label="Precio por semana"
                                aria-label="My textarea" radius="md" size="md"
                                id="week-price"
                                min={50000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="monthPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={1000000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, Number(event.valueOf()))}
                                onLoad={(event) => form.setFieldValue(field.name, 10000)}
                                placeholder="Precio por mes"
                                label="Precio por mes"
                                aria-label="My textarea" radius="md" size="md"
                                id="month-price"
                                min={200000}
                            />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Divider margins="xs" label="Amenidades" labelPosition="center" />
            <Field name="nameAmenities">
                {({ field, form, meta }: any) => (
                    <Autocomplete
                        multiple
                        id="space-amenities"
                        options={amenities}
                        defaultValue={[]}
                        value={field.value}
                        onChange={(event, newInputValue) => {
                            form.setFieldValue(field.name, newInputValue)
                        }}
                        onLoad={(event) => form.setFieldValue(field.name, [])}
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip variant="filled" icon={<BsFillStarFill />} color="primary" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        groupBy={(option) => {
                            if(amenities.indexOf(option) < 11){
                                return "Clasicas"
                            }
                            else if(amenities.indexOf(option) < 18){
                                return 'Tecnología/Conectividad'
                            }
                            else if(amenities.indexOf(option) < 29){
                                return 'Alimentación'
                            }
                            else if(amenities.indexOf(option) < 38){
                                return 'Diversión/Ocio'
                            }
                            else if(amenities.indexOf(option) < 49){
                                return 'Zonas'
                            }
                            else if(amenities.indexOf(option) < 58){
                                return 'Ubicación'
                            }
                            else{
                                return 'Servicios'
                            }
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Amenidades"
                                    placeholder="Amenidades"
                                />
                            )
                        }}
                    />
                )}
            </Field>
            <Divider margins="xs" label="Imagenes" labelPosition="center" />
            <Grid>
                <Col span={12}>
                    <UploadImages />
                </Col>
            </Grid>
            <Center>
                <Button onClick={() => { handleNewSpace(values) }} color="teal">Añadir espacio</Button>
            </Center>
        </div>
    )
}

export default AddSpace