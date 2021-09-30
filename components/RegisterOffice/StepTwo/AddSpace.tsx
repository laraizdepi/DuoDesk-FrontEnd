import React, { FC, useState } from 'react';
import { Col, Grid, Card, TextInput, NumberInput, Title, Divider, Textarea, Button, Text, Center, Group, Badge, ActionIcon, Modal } from '@mantine/core';
import { Field } from 'formik';
import { DataScroller } from 'primereact/datascroller';

import UploadImages from './UploadImages/UploadImages';
import { TiDelete, TiEdit } from 'react-icons/ti';

const itemTemplate: FC<{name: string, description: string}> = (props) => {
    return(
        <div>
            <Card>
                <Card.Section>
                    <Group position="apart">
                        <Text>{props.name}</Text>
                        <Badge color="red">
                            <ActionIcon color="red">
                                <TiDelete/>
                            </ActionIcon>
                        </Badge>
                    </Group>
                </Card.Section>
                <Card.Section style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    <Group position="apart">
                        <Text style={{width: '50%' ,overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.description}</Text>
                        <Badge>
                            <ActionIcon>
                                <TiEdit/>
                            </ActionIcon>
                        </Badge>
                    </Group>
                </Card.Section>
            </Card>
        </div>
    )
}

const AddSpace = () => {
    const [amenities, setAmenities] = useState<{ name: string, description: string }[]>([{
        name:"Hello",
        description:"Amenidad 1"
    }])

    const addAmenity = (name: string, description: string) => {
        setAmenities([...amenities, {name, description}])
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
                                onChange={(event) => form.setFieldValue(field.name, event.valueOf())}
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
            </Grid>
            <Divider margins="xs" label="Amenidades" labelPosition="center" />
            <Grid>
                <Col span={12} md={6}>
                    <Field name="nameAmenities">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Nombre de cada amenidad"
                                label="Nombre de cada amenidad"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                            />
                        )}
                    </Field>
                    <Field name="descriptionAmenities">
                        {({ field, form, meta }: any) => (
                            <div>
                                <Textarea
                                    value={field.value}
                                    onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                    placeholder="Descripción de la amenidad"
                                    label="Descripción de la amenidad"
                                    aria-label="My textarea" radius="md" size="md"
                                    id="officeDescription"
                                    rows={3}
                                    maxRows={3}
                                />
                                <br />
                                <Button>Añadir</Button>
                            </div>
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    {amenities.length !== 0 ? (
                        <DataScroller
                            value={amenities}
                            itemTemplate={itemTemplate}
                            rows={5} inline />
                    )
                        :
                        (
                            <Center style={{ height: '100%' }}>
                                <Title order={3}>Introduce amenidades!</Title>
                            </Center>
                        )}
                </Col>
            </Grid>
            <Divider margins="xs" label="Imagenes" labelPosition="center" />
            <Grid>
                <Col span={12}>
                    <UploadImages />
                </Col>
            </Grid>
        </div>
    )
}

export default AddSpace