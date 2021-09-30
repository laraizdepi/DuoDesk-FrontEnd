import React, { useState, useRef, useEffect } from 'react'
import { Grid, Col, TextInput, Textarea, Group } from '@mantine/core'
import { useDispatch } from 'react-redux';
import { Field, connect } from 'formik'
import yup from 'yup'

import AvailableHours from './AvailableHours';
import NewOfficeMap from '../Maps/NewOfficeMap';
// import { Box, TextField } from '@mui/material';


const StepOne = () => {
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '1%' }}>
                <h3>Datos básicos de tu oficina</h3>
            </div>
            <Grid id="step-one" columns={24}>
                <Col span={24} md={11}>
                    <Field id='firstName' name='title' placeholder='Your Name'>
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
                    <Field id='firstName' name='description' placeholder='Your Name'>
                        {({ field, form, meta }: any) => (
                            <Textarea
                                value={field.value}
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                placeholder="Introduce la descripción de tu oficina"
                                label="Descripción de la oficina"
                                aria-label="My textarea" radius="md" size="md"
                                id="officeDescription"
                                autosize
                                maxRows={7}
                            />
                        )}
                    </Field>
                    <hr/>
                    <h4 style={{ marginBottom: '1%' }}>Horarios de tu oficina</h4>
                    <AvailableHours title="De Lunes a Viernes"/>
                    <AvailableHours title="Sabado" disable />
                    <AvailableHours title="Domingo"disable />
                </Col>
                <Col span={24} md={13}>
                    <NewOfficeMap/>
                </Col>
            </Grid>
        </div>
    )
}

export default connect(StepOne)
