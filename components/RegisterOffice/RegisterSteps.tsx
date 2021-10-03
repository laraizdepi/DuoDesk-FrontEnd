import React, { useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';

import StepOne from './StepOne/StepOne';
import { Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import StepTwo from './StepTwo/StepTwo';

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
                        <StepTwo />
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>)
}

export default RegisterSteps
