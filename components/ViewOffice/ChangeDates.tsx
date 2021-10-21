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
interface ChangeDatesProps {
  url?: string
}

const ChangeDates: FC<ChangeDatesProps> = () => {
  const [minimoValue, setminimoValue] = useState(1)
  const router = useRouter()
  const notifications = useNotifications();

  console.log('router3', router);

  const [value, setValue] = React.useState<Date | null>(
    new Date('2021-10-18T21:11:00'),
  )
  const form = useForm({
    initialValues: {
      cuantity: minimoValue,
      period: 'month',
      date: '2021-10-21:11:00AM',
      people: 1
    }
  })
  const changeDatesValue = (values: any) => {
    const period = values.period
    const cuantity = values.cuantity
    const date = values.date
    const people = values.people

    notifications.showNotification({
      title: 'Cambio de paramentros de busqueda realizado',
      message: `You have ${cuantity} ${period}s and you start at ${date} 🤥 ` ,
    })

    console.log(`You have ${cuantity} ${period}s and you start at ${date}`)
    console.log('your new date is:', date);
    

    // changing The Url 
    // window.location.href = `/search/${router.query.id}?period=${period}&cuantity=${cuantity}`

    // Changing the url without refresh
    router.push({
      pathname: `/search/${router.query.id}`,
      query: { period: period,  cuantity: cuantity, people: people, date : date}
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
            <Col xs ={12}  md = {3}>
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
                  value={form.values.period}
                  onChange={(event) => form.setFieldValue('period', event.currentTarget.value)}
                  radius="lg"
                  required
                />
              </div>
            </Col>
            <Col xs ={12} md = {2}>
              <div>
                <NumberInput
                  min={minimoValue}
                  placeholder="Cantidad de tiempo"
                  label="Cantidad de tiempo"
                  radius="lg"
                  required
                  // value={form.values.cuantity}
                  value={minimoValue}
                  onChange={(val) => form.setFieldValue('cuantity', val)}
                />
              </div>
            </Col>
            <Col xs ={12} md = {2}>
              <div>
                <NumberInput
                  min={1}
                  placeholder="Para Cuantas Personas"
                  label="Para cuantas personas"
                  radius="lg"
                  required
                  value={form.values.people}
                  onChange={(val) => form.setFieldValue('people', val)}
                />
              </div>
            </Col>
            <Col xs ={12} md = {4}>
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

    </div>
  )
}

export default ChangeDates