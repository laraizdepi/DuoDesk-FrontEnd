import React, { FC, useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Button } from '@mantine/core'

import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree'
import axios from 'axios';
import { useNotifications } from '@mantine/notifications';
import { MdDoneAll, MdErrorOutline } from 'react-icons/md';
import { useRouter } from 'next/router'

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
									Atr??s
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

interface Office {
	id: any,
	name: string,
	description: string,
	host: any,
	isActive: boolean,
	generalAmenities: string[]
	spaces: {
		nameSpace: string,
		typeSpace: string,
		capacitySpace: number,
		availableSpace: number,
		hourPrice: number,
		dayPrice: number,
		weekPrice: number,
		monthPrice: number,
		nameAmenities: string[],
		imagesUrls: string[],
		isActive: boolean,
		bookings?: {
			idHost: any,
			idUser: any,
			idOffice: any,
			idTransaction?: string,
			startDate: string,
			endDate: string,
			people: number,
			priceSubtotal: number,
			priceTotal: number,
			dateReservation: number | Date,
			state: string,
			isActive: boolean
		}[]
	}[],
	address: any,
	scores?: {
		averageScore: number,
		reviews: any
	},
	days: {
		day: string,
		isAvailable: boolean,
		startHour?: string,
		endHour?: string
	}[],
	notifications: string[],
	official: string[],
	openDate: string
}

const UpdateSteps: FC<{ office: Office }> = (props) => {
	const notifications = useNotifications()
	const router = useRouter()

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
						title: props.office.name,
						description: props.office.description,
						officeAmenities: props.office.generalAmenities,
						location: props.office.address,
						direction: props.office.address.formatted_address,
						nameSpace: '',
						typeSpace: '',
						capacitySpace: 1,
						availableSpace: 1,
						hourPrice: 10000,
						dayPrice: 50000,
						weekPrice: 400000,
						monthPrice: 1000000,
						spaces: props.office.spaces,
						nameAmenities: [],
						officialEmail: props.office.official[0],
						officialPhone: props.office.official[1],
						notificationEmailMain: props.office.notifications[0],
						notificationPhoneMain: props.office.notifications[1],
						numberNotifications: (props.office.notifications.length - 2) / 2,
						notificationsContacts: props.office.notifications.slice(2),
						schedule: props.office.days
					}}
					onSubmit={async (values, actions) => {
						notifications.clean()
						const progress = notifications.showNotification({
							loading: true,
							title: 'Subiendo tus datos',
							message: 'Estamos subiendo tu informaci??n a la base de datos. Cuando terminemos en breves, ser??s redirigido al Dashboard donde puedes controlar tus oficinas',
							autoClose: false,
							disallowClose: true,
						})
						if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.officialEmail)) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `Por favor, introduce correo de contacto valido.`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.notificationEmailMain)) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `Por favor, introduce correo de notificaciones principal valido.`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!values.notificationPhoneMain || values.notificationPhoneMain.length !== 10) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `Por favor, introduce un n??mero valido, en el n??mero
								para notificaciones principal`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (!values.officialPhone || values.officialPhone.length !== 10) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `Por favor, introduce un n??mero valido, en el n??mero
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
							if (props.office.address) {
								data.append('location', JSON.stringify(props.office.address))
							}
							else {
								notifications.updateNotification(progress, {
									id: progress,
									title: 'Algo ha salido mal',
									message: `Por favor verifica que has colocado la
									direcci??n de tu oficina`,
									color: 'pink', icon: <MdErrorOutline />
								})
								return
							}
						}
						if (values.description.length < 120) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `Por favor, introduce una descripci??n para tu oficina
								que tenga entre 120 y 550 caracteres.`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						if (values.title.length < 16) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `Por favor, introduce un titulo con
								un minimo de 16 caracteres`,
								color: 'pink', icon: <MdErrorOutline />
							})
							return
						}
						data.append('title', values.title)
						data.append('description', values.description)
						data.append('generalAmenities', values.officeAmenities)
						if (values["open-de-lunes-a-viernes"] && values["open-de-lunes-a-viernes"]) {
							data.append('weekSchedule', values["open-de-lunes-a-viernes"])
							data.append('weekSchedule', values["close-de-lunes-a-viernes"])
						}
						else {
							if (props.office.days[0].startHour && props.office.days[0].endHour) {
								data.append('weekSchedule', props.office.days[0].startHour)
								data.append('weekSchedule', props.office.days[0].endHour)
							}
						}
						if (values['open-sabado-time'] && values[`switch-sabado-time`]) {
							if (values['close-sabado-time']) {
								data.append('saturdaySchedule', values['open-sabado'])
								data.append('saturdaySchedule', values['close-sabado'])
							}
						}
						else {
							if (props.office.days[1].startHour && props.office.days[1].endHour && props.office.days[1].day === 'Saturday') {
								data.append('saturdaySchedule', props.office.days[1].startHour)
								data.append('saturdaySchedule', props.office.days[1].endHour)
							}
						}
						if (values['open-domingo-time'] && values[`switch-domingo-time`]) {
							if (values['close-domingo-time']) {
								data.append('sundaySchedule', values['open-domingo'])
								data.append('sundaySchedule', values['close-domingo'])
							}
						}
						else {
							if (props.office.days[1].startHour && props.office.days[1].endHour && props.office.days[1].day === 'Sunday') {
								data.append('sundaySchedule', props.office.days[1].startHour)
								data.append('sundaySchedule', props.office.days[1].endHour)
							}
							else if(props.office.days[2].startHour && props.office.days[2].endHour && props.office.days[2].day === 'Sunday'){
								data.append('sundaySchedule', props.office.days[2].startHour)
								data.append('sundaySchedule', props.office.days[2].endHour)
							}
						}
						for (let space of values.spaces) {
							alert(JSON.stringify(space.spaceImages))
							alert(JSON.stringify(space.imagesUrls))
							if (space.spaceImages) {
								space.imagesUrls = []
								for (let image of space.spaceImages) {
									if (typeof image !== 'string') {
										const url = `${toSlug(values.title)}-${toSlug(space.nameSpace)}-${toSlug(image.name)}${String(Date.now())}`
										data.append(url, image, url + image.name)
										space.imagesUrls.push(url)
									}
									else space.imagesUrls.push(image)
								}
								data.append('spaces', JSON.stringify(space))
							}
							else {
								data.append('spaces', JSON.stringify(space))
							}
						}
						data.append('notifications', values.notificationEmailMain)
						data.append('notifications', values.notificationPhoneMain)
						data.append('official', values.officialEmail)
						data.append('official', values.officialPhone)
						data.append('id', props.office.id)
						if (values.numberNotifications !== 0) {
							for (let i = 0; i < Number(values.numberNotifications); i++) {
								if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values[`notificationEmail${i}`])) {
									notifications.updateNotification(progress, {
										id: progress,
										title: 'Algo ha salido mal',
										message: `Por favor, introduce un correo valido, en el correo
										para notificaciones n??mero ${i + 1}`,
										color: 'pink', icon: <MdErrorOutline />
									})
									return
								}
								data.append('notifications', values[`notificationEmail${i}`])
								if (!values[`notificationPhoneMain${i}`] || values[`notificationPhoneMain${i}`].length !== 10) {
									notifications.updateNotification(progress, {
										id: progress,
										title: 'Algo ha salido mal',
										message: `Por favor, introduce un n??mero valido, en el n??mero
										para notificaciones n??mero ${i + 1}`,
										color: 'pink', icon: <MdErrorOutline />
									})
									return
								}
								data.append('notifications', values[`notificationPhoneMain${i}`])
							}
						}
						try {
							const response = await axios({
								method: 'PUT',
								url: 'http://localhost:5000/offices/',
								data: data,
								withCredentials: true
							})
							if (response.status === 201) {
								router.push(`/search/${response.data.data}`, `/search/${response.data.data}`)
								notifications.updateNotification(progress, {
									id: progress,
									title: 'Oficina registrada correctamente',
									message: `Tu oficina ha sido actualizada correctamente. En
									pocos momentos ser??s redireccionado a tu Dashboard`,
									color: 'teal', icon: <MdDoneAll />,
									autoClose: false
								})
							}
							else {
								notifications.updateNotification(progress, {
									id: progress,
									title: 'Algo ha salido mal',
									message: `${JSON.stringify(response.data)}`,
									color: 'pink', icon: <MdErrorOutline />
								})
							}
						} catch (error) {
							notifications.updateNotification(progress, {
								id: progress,
								title: 'Algo ha salido mal',
								message: `${error}`,
								color: 'pink', icon: <MdErrorOutline />
							})
						}
					}}
				>
					<FormikStep label="Informaci??n b??sica">
						<StepOne />
					</FormikStep>
					<FormikStep label="Registra tus espacios">
						<StepTwo />
					</FormikStep>
					<FormikStep label="Informaci??n extra">
						<StepThree />
					</FormikStep>
				</FormikStepper>
			</CardContent>
		</Card>)
}

export default UpdateSteps
