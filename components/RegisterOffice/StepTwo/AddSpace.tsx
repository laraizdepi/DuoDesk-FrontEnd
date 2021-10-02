import React, { FC, useState } from 'react';
import { Col, Grid, Card, TextInput, NumberInput, Title, Divider, Textarea, Button, Text, Center, Group, Badge, ActionIcon, Modal, MultiSelect, InputWrapper, Input } from '@mantine/core';
import { Field } from 'formik';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { BsFillStarFill } from 'react-icons/bs'

import UploadImages from './UploadImages/UploadImages';
import { TiDelete, TiEdit } from 'react-icons/ti';

const AddSpace = () => {
    const amenities = [
        "Protocolos de Bioseguridad",
        "Parqueadero para carros",
        "Parqueadero para motocicletas",
        "Parqueadero para bicicletas",
        "Conectividad a internet",
        "Cabinas telefonicas",
        "Impresora",
        "Espacio para mascotas",
        "Zona de recreación",
        "Espacio para maternidad",
        "Gimnasio",
        "Espacio de meditación",
        "Espacios al aire libre",
        "Servicio de cafetería",
        "Cocina",
        "Casillero personal",
        "Fotocopiadora",
        "Libreria",
        "Bar/Venta de alcohol disponible",
        "Espacio de Yoga"
    ]

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
                                placeholder="Nombre de tu espacio"
                                label="Nombre de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="typeSpace">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Tipo de tu espacio"
                                label="Tipo de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
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
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                placeholder="Capacidad de tu espacio"
                                label="Capacidad de tu espacio"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
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
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                placeholder="Cupos disponibles actualmente"
                                label="Cupos disponibles actualmente"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
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
                                onChange={(event) => {
                                    console.log(form)
                                    form.setFieldValue(field.name, event.valueOf())}}
                                placeholder="Precio por hora"
                                label="Precio por hora"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={4000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="dayPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={10000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                placeholder="Precio por día"
                                label="Precio por día"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={4000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="weekPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={10000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                placeholder="Precio por semana"
                                label="Precio por semana"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={4000}
                            />
                        )}
                    </Field>
                </Col>
                <Col span={12}>
                    <Field name="monthPrice">
                        {({ field, form, meta }: any) => (
                            <NumberInput
                                defaultValue={10000}
                                step={1000}
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
                                placeholder="Precio por mes"
                                label="Precio por mes"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                min={4000}
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
                        id="tags-filled"
                        options={amenities}
                        defaultValue={[]}
                        freeSolo
                        value={field.value}
                        onChange={(event: any, newValue: any[] | null) => {
                            console.log(field.value)
                        }}
                        onInputChange={(event, newInputValue) => {
                            form.setFieldValue(field.name, newInputValue)
                            console.log(field.value)
                        }}
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip variant="filled" icon={<BsFillStarFill/>}  color="primary" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => {
                            console.log(params)
                            return(
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Amenidades"
                                    placeholder="Amenidades"
                                />
                        )}}
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
                <Button color="teal">Añadir espacio</Button>
            </Center>
        </div>
    )
}

export default AddSpace