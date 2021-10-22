import React, { useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Button } from '@mantine/core'

import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree'
import axios from 'axios';
import { useNotifications } from '@mantine/notifications';
import { MdDoneAll, MdErrorOutline } from 'react-icons/md';

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
			{(FormikProps) => (
				<Form>
					<Stepper alternativeLabel activeStep={step}>
						{childrenArray.map((child, index) => (
							<Step key={child.props.label} completed={step > index || completed}>
								<StepLabel>{child.props.label}</StepLabel>
							</Step>
						))}
					</Stepper>

					{currentChild}

					<Grid container spacing={5} style={{ marginTop: '2rem' }}>
						{step > 0 ? (
							<Grid item>
								<Button
									disabled={FormikProps.isSubmitting}
									color="indigo"
									onClick={() => setStep((s) => s - 1)}
								>
									Atrás
								</Button>
							</Grid>
						) : null}
						<Grid item>
							<Button
								leftIcon={FormikProps.isSubmitting ? <CircularProgress size="1rem" /> : null}
								disabled={FormikProps.isSubmitting}
								// variant="white"
								color="indigo"
								type="submit"
							>
								{FormikProps.isSubmitting ? 'Enviando' : isLastStep() ? 'Enviar' : 'Siguiente'}
							</Button>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
}

const RegisterSteps = () => {
	const notifications = useNotifications()

	const toSlug = (text: string) => {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '')
			.replace(/[^\w\-]^.+/g, '')
			.replace(/\-\-+/g, '')
			.replace(/^-+/, '')
			.replace(/-+$/, '')
	}
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
					onSubmit={async (values, actions) => {
						if (values.description.length < 120 || values.description.length > 550) {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `Por favor, introduce una descripción para tu oficina
								que tenga entre 120 y 550 caracteres.`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.officialEmail)) {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `Por favor, introduce correo de contacto valido.`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.notificationEmailMain)) {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `Por favor, introduce correo de notificaciones principal valido.`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!values.notificationPhoneMain || values.notificationPhoneMain.length !== 10) {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `Por favor, introduce un número valido, en el número
								para notificaciones principal`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!values.officialPhone || values.officialPhone.length !== 10) {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `Por favor, introduce un número valido, en el número
								de contacto`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						const data = new FormData()
						if (values.location) {
							data.append('location', JSON.stringify(values.location))
						}
						else {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `Por favor verifica que has colocado la
								dirección de tu oficina`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						data.append('title', values.title)
						data.append('description', values.description)
						data.append('generalAmenities', values.officeAmenities)
						data.append('weekSchedule', values["open-de-lunes-a-viernes"])
						data.append('weekSchedule', values["close-de-lunes-a-viernes"])
						if (values['open-sabado-time'] && values[`switch-sabado-time`]) {
							if (values['close-sabado-time']) {
								data.append('saturdaySchedule', values['open-sabado-time'])
								data.append('saturdaySchedule', values['close-sabado-time'])
							}
						}
						if (values['open-domingo-time'] && values[`switch-domingo-time`]) {
							if (values['close-domingo-time']) {
								data.append('sundaySchedule', values['open-domingo-time'])
								data.append('sundaySchedule', values['close-domingo-time'])
							}
						}
						for (let space of values.spaces) {
							space.imagesUrls = []
							console.log(space.spaceImages)
							console.log(space)
							for (let image of space.spaceImages) {
								const url = `${toSlug(values.title)}-${toSlug(space.nameSpace)}-${toSlug(image.name)}`
								data.append(url, image, image.name)
								space.imagesUrls.push(url)
							}
							data.append('spaces', JSON.stringify(space))
						}
						data.append('notifications', values.notificationEmailMain)
						data.append('notifications', values.notificationPhoneMain)
						data.append('official', values.officialEmail)
						data.append('official', values.officialPhone)
						data.append('openDate', values.openDate)
						console.log(values.openDate)
						if (values.numberNotifications !== 0) {
							for (let i = 0; i < Number(values.numberNotifications); i++) {
								if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values[`notificationEmail${i}`])) {
									notifications.showNotification({
										title: 'Algo ha salido mal',
										message: `Por favor, introduce un correo valido, en el correo
										para notificaciones número ${i + 1}`,
										color: 'pink', icon: <MdErrorOutline />
									})
									return
								}
								data.append('notifications', values[`notificationEmail${i}`])
								if (!values[`notificationPhoneMain${i}`] || values[`notificationPhoneMain${i}`].length !== 10) {
									notifications.showNotification({
										title: 'Algo ha salido mal',
										message: `Por favor, introduce un número valido, en el número
										para notificaciones número ${i + 1}`,
										color: 'pink', icon: <MdErrorOutline />
									})
									return
								}
								data.append('notifications', values[`notificationPhoneMain${i}`])
							}
						}
						try {
							const response = await axios.post('http://localhost:5000/offices', data, { withCredentials: true })
							if (response.status === 201) {
								notifications.showNotification({
									title: 'Oficina registrada correctamente',
									message: `Felicitaciones, hemos añadido tu oficina. Ahora,
									será disponible desde la fecha que has escogido. Sí necesitas modificar
									información sobre tu oficina, dirigete al Dashboard`,
									color: 'teal', icon: <MdDoneAll />
								})
							}
							else {
								notifications.showNotification({
									title: 'Algo ha salido mal',
									message: `${response.data}`,
									color: 'pink', icon: <MdErrorOutline />
								})
							}
						} catch (error) {
							notifications.showNotification({
								title: 'Algo ha salido mal',
								message: `${error}`,
								color: 'pink', icon: <MdErrorOutline />
							})
						}
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
