import { useState } from 'react';
import dayjs from 'dayjs';
import { NumberInput } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@mantine/core';
import { SiGooglemaps } from 'react-icons/si'
import style from './StylesImputTest.module.sass';
import { IoPeopleOutline } from 'react-icons/io5'
import { BsCalendar } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'


const SearchImputTest = () => {
  const [value, setValue] = useState<[Date, Date]>([
    dayjs(new Date()).startOf('month').toDate(),
    dayjs(new Date()).startOf('month').add(4, 'days').toDate(),
  ]);
  return (
    <Container className={style.search}>
      <div className={style.SearchButtons}>
        {/* Selecting the city  */}
        <div className={style.City}>
          <Autocomplete
            placeholder="City"
            variant="unstyled"
            size="lg"
            required
            data={['Bogota', 'Medellin', 'Barranquilla', 'Cali']}
            id="city"
            icon={<SiGooglemaps />}
          />

          
        </div>
        {/* Calendar */}
        <div className={style.Calendar}>
          <DateRangePicker
            icon={<BsCalendar />}
            // dropdownType="modal"s
            placeholder="fechas"
            variant="unstyled"
            id="SearchDates"
            size="lg"
            inputFormat="DD-MM" />
        </div>

        {/* Button for how many people */}
        <div className={style.SearchButtons}>

          <NumberInput
            icon={<IoPeopleOutline />}
            placeholder="sillas"
            size="lg"
            defaultValue={undefined}
            required
            min={1}
            hideControls
            variant="unstyled"
            id="SearchPeople"
          />
        </div>
        {/* Button for Search */}
        <div className={style.SearchButtons}>
          <Button
            className={style.ButtonSearch}
            color="dark"
            radius="xl"
            leftIcon={<BiSearchAlt width={20} height={20} />}
          >
          </Button>
        </div>

      </div >
    </Container >

  );
}

export default SearchImputTest;