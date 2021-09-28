import { Steps, ButtonGroup, Button, Form, ButtonToolbar, DatePicker } from 'rsuite';
import React from "react";
import AvailableHours from '../AvailableHour/AvailableHours';
import { Input } from 'rsuite'
import { Container  } from 'react-bootstrap';
// import { Input } from '@mantine/core';


const RegisterSteps = () => {

  const [step, setStep] = React.useState(0);
  const onChange = (nextStep: React.SetStateAction<number>) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);
  const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" />);

  return (
    <Container>
      <Steps current={step}>
        <Steps.Item title="Informacion basica" />
        <Steps.Item title="Espacios" />
        <Steps.Item title="Amenidades" />
        <Steps.Item title="Confirm" />
      </Steps>
      <hr />
      <Form>
        <h4>Horario</h4>
        {/* Title  */}
        <Form.Group controlId="Title">
          <Form.ControlLabel>Title</Form.ControlLabel>
          <Form.Control name="name" />
          <Form.HelpText tooltip>El titulo de tu oficina </Form.HelpText>
          {/* <Input placeholder = 'Title' radius = 'lg' /> */}
        </Form.Group>
        {/* Description */}
        <Form.Group controlId="textarea">
          <Form.ControlLabel>Description</Form.ControlLabel>
          <Form.Control name="textarea"
            accepter={Textarea}
            rows={4}
          />
        </Form.Group>


        {/* <AvailableHours/> */}
        <h4>Horario</h4>
        <Form.Group controlId="horario">
          <h5>Lunes - Viernes</h5>
          {/* <Form.ControlLabel>Lunes - Viernes</Form.ControlLabel> */}
          <AvailableHours />
          {/* <DatePicker format="hh:mm aa" showMeridian style={{ width: 260 }} placeholder='hora Inicial' /> */}
          {/* <DatePicker format="hh:mm aa" showMeridian style={{ width: 260 }} placeholder='hora de cierre' /> */}
        </Form.Group>

        <Form.Group controlId="horario">
          {/* <Form.ControlLabel>Sabado</Form.ControlLabel> */}
          <h5>Sabado</h5>
          <AvailableHours />
          {/* <DatePicker format="hh:mm aa" showMeridian style={{ width: 260 }} placeholder='hora Inicial' /> */}
          {/* <DatePicker format="hh:mm aa" showMeridian style={{ width: 260 }} placeholder='hora de cierre' /> */}
        </Form.Group>

        <Form.Group controlId="horario">
          {/* <Form.ControlLabel>Domingo</Form.ControlLabel> */}
          <h5>Domingo</h5>
          <AvailableHours/>
          {/* <DatePicker format="hh:mm aa" showMeridian style={{ width: 260 }} placeholder='hora Inicial' /> */}
          {/* <DatePicker format="hh:mm aa" showMeridian style={{ width: 260 }} placeholder='hora de cierre' /> */}
        </Form.Group>


        {/* Dirrection */}

        <Form.Group controlId="dirrection">
          <Form.ControlLabel>dirrection</Form.ControlLabel>
          <Form.Control name="dirrection" />
        </Form.Group>
        {/* <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary">Submit</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Group> */}
      </Form>
      <hr />


      {/* Buttons Of Moving Between */}
      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          Anterior
        </Button>
        <Button onClick={onNext} disabled={step === 3}>
          Siguiente
        </Button>
      </ButtonGroup>
    </Container>

  );
};

export default RegisterSteps