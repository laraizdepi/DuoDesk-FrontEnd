import React, { useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Button } from '@mantine/core'

import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree'
import axios from 'axios';

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
				<Form autoComplete="on">
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
						title: '',
						description: '',
						"open-de-lunes-a-viernes": '',
						"open-sabado": '',
						"open-domingo": '',
						direction: '',
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
						// const data = new FormData()
						// data.append('title', values.title)
						// data.append('description', values.description)
						// data.append('weekSchedule', values["open-de-lunes-a-viernes"])
						// data.append('weekSchedule', values["close-de-lunes-a-viernes"])
						// if(values['open-sabado']){
						// 	if(values['close-sabado']){
						// 		data.append('saturdaySchedule', values['open-sabado'])
						// 		data.append('saturdaySchedule', values['close-sabado'])
						// 	}
						// }
						// if(values['open-domingo']){
						// 	if(values['close-domingo']){
						// 		data.append('sundaySchedule', values['open-domingo'])
						// 		data.append('sundaySchedule', values['close-domingo'])
						// 	}
						// }
						// data.append('location', JSON.stringify(values.location))
						// data.append('spaces', JSON.stringify(values.spaces))
						// data.append('notifications', values.notificationEmailMain)
						// data.append('notifications', values.notificationPhoneMain)
						// data.append('official', values.officialEmail)
						// data.append('official', values.officialPhone)
						// data.append('openDate', values.openDate)
						// if(values.numberNotifications){
						// 	for(let i = 0; i<=Number(values.numberNotifications); i++){
						// 		data.append('notifications', values[`notificationEmail${i}`])
						// 		data.append('notifications', values[`notificationPhoneMain${i}`])		
						// 	}
						// }
						// await axios.post('http://localhost:5000/offices', data, {withCredentials: true})
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
