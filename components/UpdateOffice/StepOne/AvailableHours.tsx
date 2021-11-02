import React, { FC, useState, useEffect } from "react"
import { Grid, Col, Switch } from '@mantine/core'
import { Field, useFormikContext } from "formik";
import DateAdapter from '@mui/lab/AdapterDayjs'
import TimePicker from '@mui/lab/TimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TextField from '@mui/material/TextField';

interface HoursProps {
    title: string,
    disable?: boolean,
}

const AvailableHours: FC<HoursProps> = React.forwardRef((props, ref: any) => {
    const formikContext: any = useFormikContext()
    const [active, setActive] = useState<boolean>(props.disable || false)

    const slugTitle = props.title.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

    useEffect(() => {
        if (!props.disable) {
            formikContext.setFieldValue(`switch-${slugTitle}-time`, true)
        }
        // if (Array.isArray(formikContext.values.schedule)) {
        //     if (props.title === 'De Lunes a Viernes') {
        //         const open = new Date(Date.now())
        //         const openDate = formikContext.values.schedule[0].startHour.split(':')
        //         open.setHours(Number(openDate[0]), Number(openDate[1]))
        //         if (Object.prototype.toString.call(open) === '[object Date]') {
        //             if (isNaN(open.getTime())) {
        //                 alert('NO DATE')
        //             }
        //             else {
        //                 alert('YES DATE')
        //             }
        //         }
        //         else {
        //             alert('NO DATE TYPE')
        //         }
        //         formikContext.setFieldValue(`open-${slugTitle}`, {
        //             '$L': 'en',
        //             '$u': undefined,
        //             '$d': open,
        //             '$x': {},
        //             '$y': open.getFullYear(),
        //             '$M': open.getMonth(),
        //             '$D': open.getDate(),
        //             '$W': 1,
        //             '$H': open.getHours(),
        //             '$m': open.getMinutes(),
        //             '$s': 0,
        //             '$ms': 0
        //         })
        //         formikContext.setFieldValue(`open-${slugTitle}-time`, formikContext.values.schedule[0].startHour)
        //     }
        // }
    }, [])

    return (
        <div>
            <Grid id="title" grow={false}>
                <Col span={6}>
                    <h4>{props.title}</h4>
                </Col>
                {props.disable ?
                    <Field name={`switch-${slugTitle}-time`}>
                        {({ field, form, meta }: any) => (
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <Col span={6}>
                                    <Switch id={`switch-${slugTitle}`}
                                        checked={field.value || false}
                                        onChange={() => form.setFieldValue(`switch-${slugTitle}-time`, !field.value)}
                                        label={field.value ? `Disponible ${props.title}` : `No disponible ${props.title}`} />
                                </Col>
                            </LocalizationProvider>
                        )}
                    </Field>
                    :
                    null
                }
            </Grid>
            <Grid id="available-hours">
                <Col span={12} md={6}>
                    <Field name={`open-${slugTitle}-time`}>
                        {({ field, form, meta }: any) => (
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <TimePicker
                                    label={`Apertura ${props.title}`}
                                    disabled={!form.values[`switch-${slugTitle}-time`]}
                                    value={field.value || undefined}
                                    onChange={(newValue) => {
                                        const date = new Date(newValue.$d)
                                        let hours = String(date.getHours())
                                        let minutes = String(date.getMinutes())
                                        if (hours.length < 2) {
                                            hours = `0${hours}`
                                        }
                                        if (minutes.length < 2) {
                                            minutes = `0${minutes}`
                                        }
                                        const time = `${hours}:${minutes}`
                                        form.setFieldValue(`open-${slugTitle}`, time)
                                        form.setFieldValue(field.name, newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        )}
                    </Field>
                </Col>
                <Col span={12} md={6}>
                    <Field name={`close-${slugTitle}-time`}>
                        {({ field, form, meta }: any) => (
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <TimePicker
                                    label={`Cierre ${props.title}`}
                                    disabled={!form.values[`switch-${slugTitle}-time`]}
                                    value={field.value || undefined}
                                    onChange={(newValue) => {
                                        const date = new Date(newValue.$d)
                                        let hours = String(date.getHours())
                                        let minutes = String(date.getMinutes())
                                        if (hours.length < 2) {
                                            hours = `0${hours}`
                                        }
                                        if (minutes.length < 2) {
                                            minutes = `0${minutes}`
                                        }
                                        const time = `${hours}:${minutes}`
                                        form.setFieldValue(`close-${slugTitle}`, time)
                                        form.setFieldValue(field.name, newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        )}
                    </Field>
                </Col>
            </Grid>
        </div>
    )
})

export default AvailableHours