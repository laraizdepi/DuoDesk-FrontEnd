import React, { useState } from 'react';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { mixed, number, object } from 'yup';
import { Calendar } from 'primereact/calendar';

import StepOne from './StepOne';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';

interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

const FormikStep = ({ children }: FormikStepProps) => {
  return <>{children}</>;
}

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  const isLastStep = () => {
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

const RegisterSteps = () => {
    const delay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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
                        title: ''
                    }}
                    onSubmit={async (values) => {
                        await delay(3000);
                        console.log('values', values);
                    }}
                >
                    <FormikStep label="Información básica">
                        <StepOne />
                    </FormikStep>
                    <FormikStep label="Registra tus espacios">
                        <Field id='firstName'
                            name={`open`} placeholder='Your Name'>
                            {({ field, form, meta }: any) => (
                                <Calendar
                                    id="horaApertura"
                                    value={field.value || undefined}
                                    onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                                    timeOnly
                                    hourFormat="12">
                                </Calendar>
                            )}
                        </Field>
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>)
}

export default RegisterSteps
