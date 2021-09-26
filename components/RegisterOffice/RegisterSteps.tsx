import { Steps, ButtonGroup, InputPicker, Button, Form,ButtonToolbar, Input, DatePicker } from 'rsuite';
import React from "react";


const RegisterSteps = () => {

  // const horario = [
  //   'lunes-viernes',
  //   'lunes-domingo',
  //   'lunes',
  //   'martes',
  //   'miercoles',
  //   'jueves',
  //   'viernes',
  //   'sabado',
  //   'domingo'
  // ]

  const horario = [
    {
      "label": "lunes-viernes",
      "value": "lunes-viernes",
      "role": "Master"
    },
    {
      "label": "lunes-domingo",
      "value": "lunes-domingo",
      "role": "Master"
    },
    {
      "label": "sabado-domingo",
      "value": "sabado-domingo",
      "role": "Master"
    },
    {
      "label": "lunes",
      "value": "lunes",
      "role": "Master"
    },
    {
      "label": "martes",
      "value": "martes",
      "role": "Master"
    },
    {
      "label": "miercoles",
      "value": "miercoles",
      "role": "Master"
    },
    {
      "label": "jueves",
      "value": "jueves",
      "role": "Developer"
    },
    {
      "label": "viernes",
      "value": "viernes",
      "role": "Developer"
    },
    {
      "label": "sabado",
      "value": "sabado",
      "role": "Developer"
    },
    {
      "label": "domingo",
      "value": "domingo",
      "role": "Developer"
    },
    
  ]

  const [step, setStep] = React.useState(0);
  const onChange = (nextStep: React.SetStateAction<number>) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);
  const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

  return (
    <div>
      <Steps current={step}>
        <Steps.Item title="Finished" description="Description" />
        <Steps.Item title="In Progress" description="Description" />
        <Steps.Item title="Waiting" description="Description" />
        <Steps.Item title="Waiting" description="Description" />
      </Steps>
      <hr />
      <Form>
        <Form.Group controlId="Title">
          <Form.ControlLabel>Title</Form.ControlLabel>
          <Form.Control name="name" />
        </Form.Group>

        <Form.Group controlId="dirrection">
          <Form.ControlLabel>dirrection</Form.ControlLabel>
          <Form.Control name="dirrection" />
        </Form.Group>
        <Form.Group controlId="horario">
          <Form.ControlLabel>Horario</Form.ControlLabel>
          {/* <Form.Control name="horario" /> */}
          <InputPicker size="md" placeholder="horario" data={horario}  />
          <DatePicker format="hh:mm aa" showMeridian  style={{ width: 260 }} placeholder = 'hora Inicial' />
          <DatePicker format="hh:mm aa" showMeridian  style={{ width: 260 }} placeholder = 'hora de cierre' />
        </Form.Group>
        <Form.Group controlId="horario">
          {/* <Form.Control name="horario" /> */}
          <InputPicker size="md" placeholder="horario" data={horario}  />
          <DatePicker format="hh:mm aa" showMeridian  style={{ width: 260 }} placeholder = 'hora Inicial' />
          <DatePicker format="hh:mm aa" showMeridian  style={{ width: 260 }} placeholder = 'hora de cierre' />
        </Form.Group>
        <Form.Group controlId="textarea">
          <Form.ControlLabel>Description</Form.ControlLabel>
          <Form.Control rows={5} name="textarea" accepter={Textarea} />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary">Submit</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Group>
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
    </div>

  );
};

export default RegisterSteps