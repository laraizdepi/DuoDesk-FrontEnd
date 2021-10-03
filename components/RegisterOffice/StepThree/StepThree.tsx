import React, { FC, useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import { DatePicker } from '@mantine/dates'
import { ActionIcon, Button, Card, Center, Col, Divider, Grid, Group, TextInput, Title, Text, List, ThemeIcon, Highlight, NumberInput } from '@mantine/core'
import { FiDelete } from 'react-icons/fi'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'


const AddContacts: FC<{ length: number, changeLength: Function }> = (props) => {
    let fields = Array.from(Array(props.length || 0).keys())
    const formikContext = useFormikContext()

    useEffect(() => {
        formikContext.setFieldValue('numberNotifications', fields.length)
    }, [fields])

    return (
        <div>
            {fields.map((element) => (
                <Grid>
                    <Col span={12} md={6}>
                        <Field name={`notificationEmail${element}`}>
                            {({ field, form, meta }: any) => (
                                <TextInput
                                    type="email"
                                    value={field.value}
                                    onChange={event => form.setFieldValue(field.name, event.target.value)}
                                    placeholder={`Email para notificaciones ${element + 1}`}
                                    label={`Email para notificaciones ${element + 1}`} />
                            )}
                        </Field>
                    </Col>
                    <Col span={12} md={6}>
                        <Field name={`notificationPhoneMain${element}`}>
                            {({ field, form, meta }: any) => (
                                <Grid align="end">
                                    <Col span={11}>
                                        <TextInput
                                            type="number"
                                            icon={<div>+57|</div>}
                                            value={field.value}
                                            onChange={event => form.setFieldValue(field.name, event.target.value)}
                                            placeholder={`Telefono para notificaciones ${element + 1}`}
                                            label={`Telefono para notificaciones ${element + 1}`} />
                                    </Col>
                                    <Col span={1}>
                                        <ActionIcon onClick={() => {
                                            console.log(fields.length - 1)
                                            props.changeLength(fields.length - 1)
                                            form.setFieldValue(`notificationPhoneMain${element}`, '')
                                            form.setFieldValue(`notificationEmail${element}`, '')
                                        }}>
                                            <FiDelete />
                                        </ActionIcon>
                                    </Col>
                                </Grid>
                            )}
                        </Field>
                    </Col>
                </Grid>
            ))}
        </div>
    )
}

const StepThree: FC = () => {
    const [dataNumber, setDataNumber] = useState<number>(0)

    return (
        <div>
            <Grid justify="center">
                <Col span={6}>
                    <Field name="openDate">
                        {({ field, form, meta }: any) => (
                            <DatePicker
                                value={field.value}
                                onChange={event => form.setFieldValue(field.name, event?.toString())}
                                placeholder="Escoge desde cuando tu espacio estará disponible"
                                label="Escoge desde cuando tu espacio estará disponible"
                                excludeDate={(date) => new Date(date).getTime() <= new Date(Date.now()).getTime()} />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Divider margins="xs" label="Información de contacto" labelPosition="center" />
            <Grid>
                <Col span={12} md={6}>
                    <Field name="officialEmail">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                type="email"
                                value={field.value}
                                onChange={event => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Email Oficial"
                                label="Email Oficial" />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="officialPhone">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                type="number"
                                icon={<div>+57|</div>}
                                placeholder="31234567890"
                                value={field.value}
                                onChange={event => form.setFieldValue(field.name, event.target.value)}
                                label="Telefono Oficial" />
                        )}
                    </Field>
                </Col>
            </Grid>
            <Divider margins="xs" label="Información para notificaciones" labelPosition="center" />
            <Grid>
                <Col span={12} md={6}>
                    <Field name="notificationEmailMain">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                type="email"
                                value={field.value}
                                onChange={event => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Email para notificaciones principal"
                                label="Email para notificaciones principal" />
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name="notificationPhoneMain">
                        {({ field, form, meta }: any) => (
                            <TextInput
                                type="number"
                                icon={<div>+57|</div>}
                                value={field.value}
                                onChange={event => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Telefono para notificaciones principal"
                                label="Telefono para notificaciones principal" />
                        )}
                    </Field>
                </Col>
            </Grid>
            <AddContacts length={dataNumber} changeLength={setDataNumber} />
            <Group>
                <Button color="pink" onClick={(event: any) => setDataNumber(dataNumber + 1)}>Añadir contacto</Button>
            </Group>
            <Divider margins="xs" label="¿Como funciona nuestra plataforma?" labelPosition="center" />
            <Center>
                <Card withBorder radius="md" style={{ width: '75%' }} padding="xl">
                    <Card.Section style={{ marginTop: '1rem' }}>
                        <Center>
                            <Title>¿Como funciona nuestra plataforma?</Title>
                        </Center>
                    </Card.Section>
                    <Divider margins="md" />
                    <Card.Section style={{ margin: '1rem' }}>
                        <Text>En DuoDesk, lo más importante son nuestros usuarios.
                            Eso te incluye a ti, quién busca ayudar a otros a conseguir un
                            espacio más comodo para trabajar. Por eso queremos explicarte como
                            funciona nuestra plataforma. Anteriormente te hemos contado como
                            se trabajan los precios en la plataforma. Ahora, queremos enseñarte como será el resto.
                        </Text>
                    </Card.Section>
                    <Card.Section style={{ padding: '1rem' }}>
                        <Grid grow id="whatToDo">
                            <Col span={12} md={6}>
                                <Title style={{ marginBottom: '1rem' }}>
                                    ¿Qué hace un <span style={{ textDecoration: 'underline #12b886' }}>DuoHost</span>?
                                </Title>
                                <List size="sm" spacing="md" icon={
                                    <ThemeIcon color="teal" radius="xl">
                                        <IoCheckmarkDoneCircleOutline />
                                    </ThemeIcon>
                                }>
                                    <List.Item>Registra tu oficina</List.Item>
                                    <List.Item>Enterate cuando un usuario reserve uno de tus espacios</List.Item>
                                    <List.Item>Te mantendremos informado sobre el usuario y su tiempo de estadía</List.Item>
                                    <List.Item>Nos aseguramos de que el pago sea automatico, sin que tu te tengas que preocupar por ello</List.Item>
                                    <List.Item>Reclama tu dinero de forma más fácil y segura</List.Item>
                                </List>
                            </Col>
                            <Col span={12} md={6}>
                                <Title style={{ marginBottom: '1rem' }}>
                                    ¿Qué hace un <span style={{ textDecoration: 'underline #4C6EF5' }}>DuoUser</span>?
                                </Title>
                                <List size="sm" spacing="md" icon={
                                    <ThemeIcon color="indigo" radius="xl">
                                        <IoCheckmarkDoneCircleOutline />
                                    </ThemeIcon>
                                }>
                                    <List.Item>Escoger su ciudad y fechas</List.Item>
                                    <List.Item>Revisar que oficinas están disponibles</List.Item>
                                    <List.Item>Encontrar tu oficina y revisar sus grandes servicios</List.Item>
                                    <List.Item>Reservar un espacio de tu oficina, de forma que nosotros nos encargamos de que el pago sea efectivo</List.Item>
                                    <List.Item>Disfrutar de un lugar comodo y una nueva experiencia</List.Item>
                                </List>
                            </Col>
                        </Grid>
                    </Card.Section>
                </Card>
            </Center>
        </div>
    )
}

export default StepThree
