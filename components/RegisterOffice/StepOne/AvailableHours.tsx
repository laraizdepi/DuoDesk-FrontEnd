import React, { FC, useState, useImperativeHandle, useEffect } from "react"
import { Calendar } from 'primereact/calendar';
import { Grid, Col, Switch } from '@mantine/core'
import { Field } from "formik";

interface HoursProps {
    title: string,
    disable?: boolean,
}

const AvailableHours: FC<HoursProps> = React.forwardRef((props, ref: any) => {
    const [active, setActive] = useState<boolean>(props.disable || false)

    const handleDisable = () => {
        setActive(!active)
    }

    const slugTitle = props.title.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

    return (
        <div>
            <Grid id="title" grow={false}>
                <Col span={6}>
                    <h4>{props.title}</h4>
                </Col>
                {props.disable ?
                    <Col span={6}>
                        <Switch id={`switch-${slugTitle}`} checked={!active} onChange={handleDisable} label={!active? `Disponible ${props.title}`: `No disponible ${props.title}`}/>
                    </Col>
                :   
                   null
                }
            </Grid>
            <Grid id="available-hours">
                <Col span={12} md={6}>
                    <label htmlFor="horaApertura">Hora de apertura: &nbsp;</label>
                    <Field id='firstName' 
                    name={`open-${slugTitle}`} placeholder='Your Name'>
                        {({ field, form, meta }: any) => (
                            <Calendar 
                                id="horaApertura" 
                                disabled={active} 
                                value={field.value || undefined} 
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)} 
                                timeOnly 
                                hourFormat="12">
                            </Calendar>
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <label htmlFor="horaCierre">Hora de cierre:</label>                        
                    <Field id='firstName' 
                    name={`close-${slugTitle}`} placeholder='Your Name'>
                        {({ field, form, meta }: any) => (
                            <Calendar 
                                id="horaApertura" 
                                disabled={active} 
                                value={field.value} 
                                onChange={(event) => form.setFieldValue(field.name, event.target.value)} 
                                timeOnly 
                                hourFormat="12" />
                        )}
                    </Field>
                </Col>
            </Grid>
        </div>
    )
})

export default AvailableHours