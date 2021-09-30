import React, { useState, useRef, useEffect } from 'react'
import { Grid, Col, TextInput, Textarea } from '@mantine/core'
import { useDispatch } from 'react-redux';

import AvailableHours from './AvailableHours';
import NewOfficeMap from '../Maps/newOfficeMap';

const StepOne = () => {
    const [ officeTitle, setOfficeTittle ] = useState<string>("")
    const [ officeDescription, setOfficeDescription ] = useState<string>("")

    const handleInputChange = (event: any, setFunction: any) => {
        setFunction(event.currentTarget.value)
    }

    const weekScheduleRef: any = useRef() as React.MutableRefObject<typeof AvailableHours>
    const saturdayScheduleRef: any = useRef() as React.MutableRefObject<typeof AvailableHours>
    const sundayScheduleRef: any = useRef() as React.MutableRefObject<typeof AvailableHours>
    const mapRef: any = useRef() as React.MutableRefObject<typeof NewOfficeMap>

    return (
        <div>
            <div style={{textAlign: 'center', marginBottom: '1%'}}>
                <h3>Datos básicos de tu oficina</h3>
            </div>
            <Grid id="step-one" columns={24}>
                <Col span={24} md={11}>
                    <TextInput 
                        value={officeTitle} 
                        onChange={(event) => handleInputChange(event, setOfficeTittle)} 
                        placeholder="Introduce el titulo de tu oficina" 
                        label="Titulo de tu oficina" 
                        radius="md" 
                        size="md" 
                        id="office-title"
                    />
                    <Textarea 
                        value={officeDescription} 
                        onChange={(event) => handleInputChange(event, setOfficeDescription)} 
                        placeholder="Introduce la descripción de tu oficina" 
                        label="Descripción de la oficina" 
                        aria-label="My textarea" radius="md" size="md" 
                        id="officeDescription"
                        autosize
                        maxRows={7}
                    />
                    <hr/>
                    <h4 style={{marginBottom: '1%'}}>Horarios de tu oficina</h4>
                    <AvailableHours title="De Lunes a Viernes" ref={weekScheduleRef} disable={false}/>
                    <AvailableHours title="Sabado" ref={saturdayScheduleRef} disable/>
                    <AvailableHours title="Domingo" ref={sundayScheduleRef} disable/>
                </Col>
                <Col span={24} md={13}>
                    <NewOfficeMap ref={mapRef}/>
                </Col>
            </Grid>
        </div>
    )
}

export default StepOne

