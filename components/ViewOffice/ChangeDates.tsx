import * as React from 'react';
import { Button, NativeSelect, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap'
import { useNotifications } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import { Notification, toaster } from 'rsuite';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';

interface ChangeDatesProps {
	url?: string
}

const ChangeDates: FC<ChangeDatesProps> = () => {
	const [minimoValue, setminimoValue] = useState(1)
	const router = useRouter()
	const notifications = useNotifications()
	const [value3, setValue3] = useState(new Date());
	const [render, setrender] = useState(2)
	const [initPeriod, setinitPeriod] = useState<string>('')

	const [type, setType] = React.useState('success');
	const [placement, setPlacement] = React.useState('topEnd');

	// const initPeriodBe = router.query.period
	useEffect(() => {
		async function test() {
			if (router.query.period && typeof router.query.period === 'string') {
				await setinitPeriod(router.query.period)
			}
		}
		test()
	}, [router.query.period])

	useEffect(() => {
		
	})

	const initPeriodBe = router.query.period
	const initPeoriodTwo = Number(initPeriodBe)

	const initPeopleBe = router.query.people
	const initPeople = Number(initPeopleBe)

	const initCuantityBe = router.query.cuantity
	const initCuantity = Number(initCuantityBe)

	const initDateBef = router.query.date
	const initDate = initDateBef?.toString() || Date.now().toString()
	const transfDate = Date.parse(initDate)

	console.log('date', initDate)

	const [value, setValue] = React.useState<Date | null>(
		new Date('2021-10-18T21:11:00'),
	)
	const form = useForm({
		initialValues: {
			cuantity: initCuantity,
			period: 'month',
			// date: '2021-10-21:11:00AM',
			date: new Date(Date.now()),
			people: initPeople
		}
	})

	const changeDatesValue = (values: any) => {
		const period = values.period
		const cuantity = values.cuantity
		const date = values.date
		const people = values.people

		console.log('date', date);
		console.log('New date', Date.parse(date))
		const numberDate = Date.parse(date)

		const transDate = new Date(Date.parse(date));
		// console.log('transform date', transDate.toUTCString())

		const date2 = Date.parse(date) / 1000
		// const date3 = date2.getTime()
		console.log('date2', date2);

		const date5 = new Date(date2)
		console.log('date5', date5.getTime());

		notifications.showNotification({
			title: 'Cambio en tus parametros realizado',
			color: 'teal',
			message: `Has seleccionado un uso de ${cuantity} ${period} para ${people} personas y que empieza el ${new Date(date).toLocaleDateString('es-CO',
				{
					day: 'numeric', 
					weekday: 'long',
					month: 'long',
					year: 'numeric'
				})}`,
			icon: <MdOutlinePublishedWithChanges/>
		})

		// notification
		
		setrender(render + 1)
		window.location.href = '#changesValues'

		// changin the url
		router.push({
			pathname: `/search/${router.query.id}`,
			query: { period: period, cuantity: cuantity, people: people, date: numberDate }
		},
			undefined, { shallow: true }
		)
	}
	React.useEffect(() => {
		if (form.values.period == 'hour') {
			setminimoValue(3)
			form.setFieldValue('cuantity', 3)
		} else {
			setminimoValue(1)
		}
	}, [form.values.period])

	const handlePeriod = (event: any) => {
		setinitPeriod(event.valueOf())
		form.setFieldValue('period', event.valueOf())
	}
	return (
		<div style={{ marginLeft: '50px', }} id='changesValues'>
			<form onSubmit={form.onSubmit((values: any) => changeDatesValue(values))}>
				<Container>
					<Row>
						<Col xs={12} md={3}>
							<div>
								<Select
									data={[
										{ value: 'hour', label: 'hora' },
										{ value: 'day', label: 'dia' },
										{ value: 'week', label: 'semana' },
										{ value: 'month', label: 'mes' },
									]}
									placeholder="Elegi tu formato de tiempo"
									label="Elige tu rango de tiempo"
									value={initPeoriodTwo.toString() || ''}
									onChange={event => handlePeriod(event)}
									radius="md"
									// radius="lg"
									required
								/>
							</div>
						</Col>
						<Col xs={12} md={2}>
							<div>
								<NumberInput
									min={minimoValue}
									placeholder="Cantidad de tiempo"
									label="Cantidad de tiempo"
									radius="xs"
									required
									hideControls
									value={initCuantity}
									onChange={(val) => form.setFieldValue('cuantity', val)}
								/>
							</div>
						</Col>
						<Col xs={12} md={2}>
							<div>
								<NumberInput
									min={initPeople}
									placeholder="Para Cuantas Personas"
									label="Para cuantas personas"
									radius="xs"
									required
									hideControls
									value={initPeople}
									onChange={(val) => form.setFieldValue('people', val)}
								/>
							</div>
						</Col>
						<Col xs={12} md={3} style={{ height: '36px' }}>
							<div>
								<div>
									<DatePicker
										id="date-search"
										required
										placeholder="Fecha de inicio"
										label="Fecha de inicio"
										radius="xs"
										value={transfDate ? new Date(transfDate) : new Date(Date.now())}
										onChange={(event) => {
											form.setFieldValue('date', event || new Date(Date.now()))
										}} />
								</div>
							</div>
							<div>

							</div>
						</Col>
						<Col>
						</Col>
					</Row>
					<div style={{ marginTop: '14px', marginBottom: '14px' }}>
						<Button type="submit" radius="lg" color="indigo">Cambiar Datos</Button>
					</div>
				</Container>
			</form>
		</div>
	)
}

export default ChangeDates