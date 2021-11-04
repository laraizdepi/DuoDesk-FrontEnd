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

	const initPeopleBe = router.query.people
	const initPeople = Number(initPeopleBe)

	const initCuantityBe = router.query.cuantity
	const initCuantity = Number(initCuantityBe)

	const form = useForm({
		initialValues: {
			cuantity: initCuantity,
			period: 'day',
			date: new Date(Date.now()),
			people: initPeople
		}
	})

	const changeDatesValue = (values: any) => {
		const period = values.period
		const cuantity = values.cuantity
		const date = values.date
		const people = values.people
		const numberDate = Date.parse(date)

		notifications.showNotification({
			title: 'Cambio en tus parametros realizado',
			message: `Has seleccionado un uso de ${cuantity} ${period} para ${people} personas y que empieza el ${new Date(date).toLocaleDateString('es-CO',
			{
				day: 'numeric', 
				weekday: 'long',
				month: 'long',
				year: 'numeric'
			})}`,
			color: 'teal',
			icon: <MdOutlinePublishedWithChanges/>
		})
		
		window.location.href = '#changesValues'
		router.replace({
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
										{ value: 'hour', label: 'Hora' },
										{ value: 'day', label: 'Día' },
										{ value: 'week', label: 'Semana' },
										{ value: 'month', label: 'Mes' },
									]}
									placeholder="Elegi tu formato de tiempo"
									label="Elige tu rango de tiempo"
									value={form.values.period}
									onChange={event => handlePeriod(event)}
									radius="md"
									required
								/>
							</div>
						</Col>
						<Col xs={12} md={2}>
							<div>
								<NumberInput
									min={Number(minimoValue)}
									placeholder="Cantidad de tiempo"
									label="Cantidad de tiempo"
									radius="xs"
									required
									hideControls
									value={form.values.cuantity}
									onChange={(value) => form.setFieldValue('cuantity', value)}
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
										value={form.values.date}
										onChange={(event) => {
											form.setFieldValue('date', event || new Date(Date.now()))
										}} />
								</div>
							</div>
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