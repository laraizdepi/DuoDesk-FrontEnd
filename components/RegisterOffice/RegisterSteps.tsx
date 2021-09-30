// import { Steps, ButtonGroup, Button, Form } from 'rsuite';
// import { Container } from 'react-bootstrap';
// import React, { useState } from 'react';
// import { Modal, Input, NumberInput } from '@mantine/core';
// // import useForm  from '@mantine/hooks';
// import UploadImages from '../UploadImages/UploadImages'

import StepOne from './StepOne';
// import StepTwo from '../StepTwo/StepTwo';

// const RegisterSteps = () => {

//   const [step, setStep] = useState(0);
//   const [opened, setOpened] = useState(false);
//   const [send, setSend] = useState(0)
//   const onChange = (nextStep: React.SetStateAction<number>) => {
//     setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
//   };
//   const onNext = () => onChange(step + 1);
//   const onPrevious = () => onChange(step - 1);
//   const onSend = () => {
//     setOpened(false)
//     setSend(1)
//     onNext()
//   }
//   const onNextFunction = () => {
//     setOpened(true)
//     console.log('it worked');
//   }

//   if (step == 0) {
//     return (
//       <div>
//         <Modal
//           opened={opened}
//           onClose={() => setOpened(false)}
//           title="Datos De Contactos"
//         >
//           <Form>
//             {/* Correo */}
//             <Input
//               placeholder="Your email"
//               radius="lg"
//               size="md"
//             />
//             <NumberInput
//               // defaultValue={3000000000}
//               placeholder="320 458 6578"
//               label="Numero De Contacto"
//               radius="lg"
//               size="md"
//               required
//               hideControls
//             />
//             <NumberInput
//               defaultValue={0}
//               placeholder="Numero De Contacto"
//               label="Segundo Numero"
//               radius="lg"
//               size="md"
//               hideControls
//             />

//           </Form>

//           <Button onClick={onSend}>Omitir</Button>
//           <Button onClick={onSend}>Enviar</Button>

//         </Modal>

//         <Container>
//           <Steps current={step}>
//             <Steps.Item title="Informacion basica" />
//             <Steps.Item title="Espacios" />
//             <Steps.Item title="Amenidades" />
//             <Steps.Item title="Confirm" />
//           </Steps>
//           <hr />
//           <Form>
//             <StepOne />
//           </Form>
//           <hr />
//           {/* Buttons Of Moving Between */}
//           <ButtonGroup>
//             <Button onClick={onPrevious} disabled={step === 0}>
//               Anterior
//             </Button>
//             <Button onClick={onNextFunction} >
//               Siguiente
//             </Button>
//           </ButtonGroup>
//         </Container>
//       </div>
//     );
//   } else if (step == 1) {
//     return (
//       <Container>
//         <Steps current={step}>
//           <Steps.Item title="Informacion basica" />
//           <Steps.Item title="Espacios" />
//           <Steps.Item title="Amenidades" />
//           <Steps.Item title="Confirm" />
//         </Steps>
//         <hr />

//         <h1>Segundo Paso</h1>
//         <StepTwo/>

//         <hr />
//         {/* Buttons Of Moving Between */}
//         <ButtonGroup>
//           <Button onClick={onPrevious} >
//             Anterior
//           </Button>
//           <Button onClick={onNext} >
//             Siguiente
//           </Button>
//         </ButtonGroup>
//       </Container>
//     )
//   } else if (step == 2) {
//     return (
//       <Container>
//         <Steps current={step}>
//           <Steps.Item title="Informacion basica" />
//           <Steps.Item title="Espacios" />
//           <Steps.Item title="Amenidades" />
//           <Steps.Item title="Confirm" />
//         </Steps>
//         <hr />

//         <h1>Tercer Paso</h1>

//         <hr />
//         {/* Buttons Of Moving Between */}
//         <ButtonGroup>
//           <Button onClick={onPrevious} >
//             Anterior
//           </Button>
//           <Button onClick={onNext} >
//             Siguiente
//           </Button>
//         </ButtonGroup>
//       </Container>
//     )
//   } else {
//     return (
//       <Container>
//         <Steps current={step}>
//           <Steps.Item title="Informacion basica" />
//           <Steps.Item title="Espacios" />
//           <Steps.Item title="Amenidades" />
//           <Steps.Item title="Confirm" />
//         </Steps>
//         <hr />

//         <h1>Ultimo Paso</h1>

//         <hr />
//         {/* Buttons Of Moving Between */}
//         <ButtonGroup>
//           <Button onClick={onPrevious} >
//             Anterior
//           </Button>
//           <Button onClick={onNext} >
//             Publicar Oficina
//           </Button>
//         </ButtonGroup>
//       </Container>
//     )
//   }


// }
// export default RegisterSteps
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { mixed, number, object } from 'yup';

const sleep = (time: number | undefined) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values);
          }}
        >
          <FormikStep label="Personal Data">
            {/* <Box paddingBottom={2}>
              <Field fullWidth name="firstName" component={TextField} label="First Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field fullWidth name="lastName" component={TextField} label="Last Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: 'I am a millionaire' }}
              />
            </Box> */}
            <StepOne/>
            <Box paddingBottom={2}>
              <Field fullWidth name="lastName" component={TextField} label="Last Name" />
            </Box>

          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: mixed().when('millionaire', {
                is: true,
                then: number()
                  .required()
                  .min(
                    1_000_000,
                    'Because you said you are a millionaire you need to have 1 million'
                  ),
                otherwise: number().required(),
              }),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="money"
                type="number"
                component={TextField}
                label="All the money I have"
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field fullWidth name="description" component={TextField} label="Description" />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}