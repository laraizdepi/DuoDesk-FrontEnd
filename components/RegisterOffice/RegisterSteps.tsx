import { Steps, ButtonGroup, Button, Form } from 'rsuite';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import { Modal, Input, NumberInput } from '@mantine/core';
// import useForm  from '@mantine/hooks';
import UploadImages from '../UploadImages/UploadImages'

import StepOne from './StepOne';
import StepTwo from '../StepTwo/StepTwo';

const RegisterSteps = () => {

  const [step, setStep] = useState(0);
  const [opened, setOpened] = useState(false);
  const [send, setSend] = useState(0)
  const onChange = (nextStep: React.SetStateAction<number>) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };
  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);
  const onSend = () => {
    setOpened(false)
    setSend(1)
    onNext()
  }
  const onNextFunction = () => {
    setOpened(true)
    console.log('it worked');
  }

  if (step == 0) {
    return (
      <div>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Datos De Contactos"
        >
          <Form>
            {/* Correo */}
            <Input
              placeholder="Your email"
              radius="lg"
              size="md"
            />
            <NumberInput
              // defaultValue={3000000000}
              placeholder="320 458 6578"
              label="Numero De Contacto"
              radius="lg"
              size="md"
              required
              hideControls
            />
            <NumberInput
              defaultValue={0}
              placeholder="Numero De Contacto"
              label="Segundo Numero"
              radius="lg"
              size="md"
              hideControls
            />

          </Form>

          <Button onClick={onSend}>Omitir</Button>
          <Button onClick={onSend}>Enviar</Button>

        </Modal>

        <Container>
          <Steps current={step}>
            <Steps.Item title="Informacion basica" />
            <Steps.Item title="Espacios" />
            <Steps.Item title="Amenidades" />
            <Steps.Item title="Confirm" />
          </Steps>
          <hr />
          <Form>
            <StepOne />
          </Form>
          <hr />
          {/* Buttons Of Moving Between */}
          <ButtonGroup>
            <Button onClick={onPrevious} disabled={step === 0}>
              Anterior
            </Button>
            <Button onClick={onNextFunction} >
              Siguiente
            </Button>
          </ButtonGroup>
        </Container>
      </div>
    );
  } else if (step == 1) {
    return (
      <Container>
        <Steps current={step}>
          <Steps.Item title="Informacion basica" />
          <Steps.Item title="Espacios" />
          <Steps.Item title="Amenidades" />
          <Steps.Item title="Confirm" />
        </Steps>
        <hr />

        <h1>Segundo Paso</h1>
        <StepTwo/>

        <hr />
        {/* Buttons Of Moving Between */}
        <ButtonGroup>
          <Button onClick={onPrevious} >
            Anterior
          </Button>
          <Button onClick={onNext} >
            Siguiente
          </Button>
        </ButtonGroup>
      </Container>
    )
  } else if (step == 2) {
    return (
      <Container>
        <Steps current={step}>
          <Steps.Item title="Informacion basica" />
          <Steps.Item title="Espacios" />
          <Steps.Item title="Amenidades" />
          <Steps.Item title="Confirm" />
        </Steps>
        <hr />

        <h1>Tercer Paso</h1>

        <hr />
        {/* Buttons Of Moving Between */}
        <ButtonGroup>
          <Button onClick={onPrevious} >
            Anterior
          </Button>
          <Button onClick={onNext} >
            Siguiente
          </Button>
        </ButtonGroup>
      </Container>
    )
  } else {
    return (
      <Container>
        <Steps current={step}>
          <Steps.Item title="Informacion basica" />
          <Steps.Item title="Espacios" />
          <Steps.Item title="Amenidades" />
          <Steps.Item title="Confirm" />
        </Steps>
        <hr />

        <h1>Ultimo Paso</h1>

        <hr />
        {/* Buttons Of Moving Between */}
        <ButtonGroup>
          <Button onClick={onPrevious} >
            Anterior
          </Button>
          <Button onClick={onNext} >
            Publicar Oficina
          </Button>
        </ButtonGroup>
      </Container>
    )
  }


}
export default RegisterSteps