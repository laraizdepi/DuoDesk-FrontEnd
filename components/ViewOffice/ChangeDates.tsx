import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { Button, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';

interface ChangeDatesProps {
  url?: string
}

const ChangeDates: FC<ChangeDatesProps> = () => {
  const router = useRouter()
  console.log('router3', router);

  const [value, setValue] = React.useState<Date | null>(
    new Date('2021-10-18T21:11:00'),
  )
  const form = useForm({
    initialValues: {
      cuantity: 5,
      period: 'month',
      date: '2021-10-18T21:11:00',
      people : 1
    }
  })
  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
    console.log('time', value)
  }
  const changeDatesValue = (values: any) => {
    const period = values.period
    const cuantity = values.cuantity
    const date = values.date

    console.log(`You have ${cuantity} ${period}s and you start at ${date}`)
    window.location.href = `/search/${router.query.id}?period=${period}&cuantity=${cuantity}`
  }
  return (
    <div>
      <form onSubmit={form.onSubmit((values: any) => changeDatesValue(values))}>
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
            description="This is anonymous"
            value={form.values.period}
            onChange={(event) => form.setFieldValue('period', event.currentTarget.value)}
            required
          />
        </div>
        <div>
          <NumberInput
            min={3}
            placeholder="Cantidad de tiempo"
            label="Cantidad de tiempo"
            radius="lg"
            required
            value={form.values.cuantity}
            onChange={(val) => form.setFieldValue('cuantity', val)}
          />
        </div>
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
        <div style= {{marginTop:'15px'}}>
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
        <Button type="submit">Submit</Button>

      </form>

    </div>
  )
}

export default ChangeDates