import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Button, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap'
import { useNotifications } from '@mantine/notifications';
import { useWindowScroll } from '@mantine/hooks';
import { InputNumber } from 'rsuite';

interface ChangeDatesProps {
  url?: string
}

const ChangeDates: FC<ChangeDatesProps> = () => {
  const [minimoValue, setminimoValue] = useState(1)
  const router = useRouter()
  const notifications = useNotifications();
  const [scroll, scrollTo] = useWindowScroll();

  const initPeriod = router.query.period
  // const initCuantity = parseInt(router.query.cuantity)
  // const initPeople = parseInt(router.query.people)
  // const initPeople = Number(router.query.people)
  // const initPeople = 3
  const initPeopleBe = router.query.people
  const initPeople = Number(initPeopleBe)
  const initDate = router.query.date
  const initValues = async (query) => {
    const router2 = await useRouter()
    // const initPe
  }
  if (initPeople !== 4) {
    console.log('I hate javascript');
  } else {
    console.log('I hate more javascript');

  }
  console.log('The type of people IS:', typeof initPeople)
  console.log('The cantidad of people IS:', initPeople)


  const [value, setValue] = React.useState<Date | null>(
    new Date('2021-10-18T21:11:00'),
  )
  const form = useForm({
    initialValues: {
      cuantity: minimoValue,
      period: 'month',
      date: '2021-10-21:11:00AM',
      people: initPeople
    }
  })
  const changeDatesValue = (values: any) => {
    const period = values.period
    const cuantity = values.cuantity
    const date = values.date
    const people = values.people
    scrollTo({ y: 10000 })


    notifications.showNotification({
      title: 'Cambio de paramentros de busqueda realizado',
      message: `You have ${cuantity} ${period}s and you start at ${date} 🤥 `,
    })

    // changin the url
    router.push({
      pathname: `/search/${router.query.id}`,
      query: { period: period, cuantity: cuantity, people: people, date: date }
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
  return (
    <div>
      <form onSubmit={form.onSubmit((values: any) => changeDatesValue(values))}>
        <Container>
          <Row>
            <Col xs={12} md={3}>
              <div>
                <NativeSelect
                  data={[
                    { value: 'hour', label: 'hora' },
                    { value: 'day', label: 'dia' },
                    { value: 'week', label: 'semana' },
                    { value: 'month', label: 'mes' },
                  ]}
                  placeholder="Elegi tu formato de tiempo"
                  label="Elige tu rango de tiempo"
                  // value={initPeriod}
                  value={form.values.period}

                  onChange={(event) => form.setFieldValue('period', event.currentTarget.value)}
                  radius="lg"
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
                  radius="lg"
                  required
                  // defaultValue = {initCuantity}
                  // defaultValue={20}
                  value={form.values.cuantity}
                  // value={initCuantity}
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
                  radius="lg"
                  required
                  value={form.values.people}
                  // value = {initPeople}
                  // value = {3}
                  // defaultValue={initPeople}

                  onChange={(val) => form.setFieldValue('people', val)}
                />
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ marginTop: '15px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DateTimePicker
                      label="El dia y hora que comienzas"
                      value={form.values.date}
                      onChange={(val) => form.setFieldValue('date', val)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </Col>
          </Row>
          <Button type="submit" radius="lg" color="indigo">Cambiar Datos</Button>

        </Container>
      </form>

      <InputNumber defaultValue={initPeople} max={100} min={10} />


    </div>
  )
}

export default ChangeDates