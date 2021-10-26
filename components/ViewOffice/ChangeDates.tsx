import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Button, NativeSelect, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap'
import { useNotifications } from '@mantine/notifications';
import { useWindowScroll } from '@mantine/hooks';
import { InputNumber } from 'rsuite';
import { Calendar, DatePicker } from '@mantine/dates';
import { Notification, toaster } from 'rsuite';

interface ChangeDatesProps {
  url?: string
}

const ChangeDates: FC<ChangeDatesProps> = () => {
  const [minimoValue, setminimoValue] = useState(1)
  const router = useRouter()
  const notifications = useNotifications();
  // const [scroll, scrollTo] = useWindowScroll();
  const [value3, setValue3] = useState(new Date());
  const [render, setrender] = useState(2)
  const [initPeriod, setinitPeriod] = useState('')

  const [type, setType] = React.useState('success');
  const [placement, setPlacement] = React.useState('topEnd');

  // const initPeriodBe = router.query.period
  useEffect(() => {
    async function test() {

      await setinitPeriod(router.query.period)
    }
    test()

  }, [])
  // const initCuantity = parseInt(router.query.cuantity)
  // const initPeople = parseInt(router.query.people) 
  // const initPeople = Number(router.query.people)
  // const initPeople = 3
  const initPeopleBe = router.query.people
  const initPeople = Number(initPeopleBe)

  const initCuantityBe = router.query.cuantity
  const initCuantity = Number(initCuantityBe)

  const initDate = router.query.date 
  const transfDate = Date.parse(initDate)


  console.log('date',initDate)
  console.log('transfateasd',transfDate)
  


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
    console.log('transform date', transDate.toUTCString())

    const date2 = Date.parse(date)/1000
    // const date3 = date2.getTime()
    console.log('date2', date2);

    const date5 = new Date(date2)
    console.log('date5', date5.getTime());
    
    


    // notification
    const title2 = 'Cambio de paramentros de busqueda realizado'
    const message = (
      <Notification type='success' header={title2} closable>
        {/* <Paragraph width={320} rows={3} /> */}
        {`You have ${cuantity} ${period}s for ${people} people and you start at ${date} 🤥 `}
      </Notification>
    );
    setrender(render + 1)
    window.location.href = '#changesValues'
    toaster.push(message, { placement })



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

  const handlePeriod = (event) => {
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
                  value={initPeriod}
                  // onChange={(event) => form.setFieldValue('period', event.currentTarget.value)}
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
                  // size= 'md'
                  required
                  hideControls
                  // defaultValue = {initCuantity}
                  // defaultValue={20}
                  // value={form.values.cuantity}
                  value={initCuantity}
                  onChange={(val) => form.setFieldValue('cuantity', val)}
                />
              </div>
            </Col>
            <Col xs={12} md={2}>
              <div>
                <NumberInput
                  min={1}
                  placeholder="Para Cuantas Personas"
                  label="Para cuantas personas"
                  radius="xs"
                  required
                  hideControls
                  // value={form.values.people}
                  value={initPeople}
                  // value = {3}
                  // defaultValue={initPeople}

                  onChange={(val) => form.setFieldValue('people', val)}
                />
              </div>
            </Col>
            <Col xs={12} md={3} style={{ height: '36px' }}>
              <div>
                <div>
                  <DatePicker
                    // icon={<BsCalendarWeek />}
                    id="date-search"
                    required
                    placeholder="Fecha de inicio"
                    label="Fecha de inicio"
                    radius="xs"
                    value={transfDate}

                    onChange={(event) => {
                      form.setFieldValue('date', event)
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

      {/* <InputNumber defaultValue={initPeople} max={100} min={10} /> */}

      {/* <Button onClick={() => toaster.push(message, { placement })}>Push</Button> */}
    </div>
  )
}

export default ChangeDates