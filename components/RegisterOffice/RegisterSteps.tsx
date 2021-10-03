import React, { useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Button } from '@mantine/core'

import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree'

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

					<Grid container spacing={5} style={{marginTop: '2rem'}}>
						{step > 0 ? (
							<Grid item>
								<Button
									disabled={isSubmitting}
									// variant="white"
									color="indigo"
									onClick={() => setStep((s) => s - 1)}
								>
									Atrás
								</Button>
							</Grid>
						) : null}
						<Grid item>
							<Button
								leftIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
								disabled={isSubmitting}
								// variant="white"
								color="indigo"
								type="submit"
							>
								{isSubmitting ? 'Enviando' : isLastStep() ? 'Enviar' : 'Siguiente'}
							</Button>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
}

const RegisterSteps = () => {
	return (
		<Card>
			<CardContent>
				<FormikStepper
					initialValues={{
						nameSpace: '',
						typeSpace: '',
						capacitySpace: 1,
						availableSpace: 1,
						hourPrice: 10000,
						dayPrice: 50000,
						weekPrice: 400000,
						monthPrice: 1000000,
						nameAmenities: [],
					}}
					onSubmit={async (values) => {
						console.log('values', values);
					}}
				>
					<FormikStep label="Información básica">
						<StepOne />
					</FormikStep>
					<FormikStep label="Registra tus espacios">
						<StepTwo />
					</FormikStep>
					<FormikStep label="Información extra">
						<StepThree />
					</FormikStep>
				</FormikStepper>
			</CardContent>
		</Card>)
}

export default RegisterSteps
