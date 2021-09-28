import React from 'react'
import { Form, Input } from 'rsuite'
import { Grid, Col } from '@mantine/core'

import AvailableHours from './AvailableHours';
import NewOfficeMap from '../Maps/newOfficeMap';

const StepOne = () => {
	const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" />);
	const Title = React.forwardRef((props, ref) => <Input {...props} as="input" size="lg" />);

    return (
        <div>
            <Grid id="step-one" columns={24}>
                <Col span={24} md={11}>
                    <Form.Group controlId="Title">
                        <Form.ControlLabel>Title</Form.ControlLabel>
                        <Form.Control name="name" accepter={Title}/>
                        <Form.HelpText tooltip>El titulo de tu oficina </Form.HelpText>
                    </Form.Group>   

                    <Form.Group controlId="textarea">
                        <Form.ControlLabel>Description</Form.ControlLabel>
                        <Form.Control name="textarea" accepter={Textarea}/>
                    </Form.Group>

                    <h4>Horario</h4>
                    <Form.Group controlId="horario">
                        <AvailableHours title="De Lunes a Viernes" disable={false}/>
                    </Form.Group>

                    <Form.Group controlId="horario">
                        <AvailableHours title="Sabado" disable/>
                    </Form.Group>

                    <Form.Group controlId="horario">
                        <AvailableHours title="Domingo" disable/>
                    </Form.Group>
                </Col>
                <Col span={24} md={13}>
                    <NewOfficeMap />
                </Col>
            </Grid>
        </div>
    )
}

export default StepOne
