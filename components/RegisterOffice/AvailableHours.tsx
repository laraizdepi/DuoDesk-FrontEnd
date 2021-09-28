import React, { FC, useState, useImperativeHandle, useEffect } from "react"
import { Calendar } from 'primereact/calendar';
import { Grid, Col, Switch } from '@mantine/core'

interface HoursProps {
    title: string,
    disable: boolean,
    ref: any
}

const AvailableHours: FC<HoursProps> = React.forwardRef((props, ref: any) => {
    const [dateI, setDateI] = useState<Date | Date[] | undefined>(undefined);
    const [dateF, setDateF] = useState<Date | Date[] | undefined>(undefined);
    const [active, setActive] = useState<boolean>(true)

    const handleDisable = (event: any) => {
        setActive(event.currentTarget.checked)
    }

    useImperativeHandle(ref, () => {
        return{
            initialDate: dateI,
            finishDate: dateF
        }
    })

    return (
        <div>
            <Grid id="title" grow={false}>
                <Col span={6}>
                    <h4>{props.title}</h4>
                </Col>
                {props.disable ?
                    <Col span={6}>
                        <Switch id={`switch-${props.title}`} checked={active} onChange={handleDisable} label={active? `Disponible ${props.title}`: `No disponible ${props.title}`}/>
                    </Col>
                :   
                   null
                }
            </Grid>
            <Grid id="available-hours">
                <Col span={12} md={6}>
                    <label htmlFor="horaApertura">Hora de apertura: &nbsp;</label>
                    <Calendar id="horaApertura" disabled={!active} value={dateI} onChange={(e) => setDateI(e.value)} timeOnly hourFormat="12" />                
                </Col>
                <Col span={12} md={6}>
                    <label htmlFor="horaCierre">Hora de cierre:</label>                        
                    <Calendar id="horaCierre" disabled={!active} value={dateF} onChange={(e) => setDateF(e.value)} timeOnly hourFormat="12" />                
                </Col>
            </Grid>
        </div>
    )
})

export default AvailableHours