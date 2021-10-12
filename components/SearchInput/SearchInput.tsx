import { useState } from 'react';
import dayjs from 'dayjs';
import { NumberInput } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@mantine/core';
import { SiGooglemaps } from 'react-icons/si'
import style from './StylesInput.module.sass';
import { IoPeopleOutline } from 'react-icons/io5'
import { BsCalendar } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { useRouter } from 'next/dist/client/router';


const SearchImputTest = () => {
	const router = useRouter()
	const [city, setCity] = useState<string | null>(null)
	const [dates, setDates] = useState<[Date | null, Date | null]>([
		dayjs(new Date()).startOf('month').toDate(),
		dayjs(new Date()).startOf('month').add(4, 'days').toDate(),
	])
	const [people, setPeople] = useState<number>(1)

	const submitSearch = (event: any) => {
		event.preventDefault()
		let url = `/search?`
		if (city) {
			url = `${url}city=${city}&`
		}
		if (dates) {
			if (dates[0]) {
				url = `${url}startDate=${dates[0]}&`
			}
			if (dates[1]) {
				url = `${url}endDate=${dates[1]}&`
			}
		}
		if (people) {
			url = `${url}people=${people}&`
		}
		window.location.replace(url)
	}

	return (
		<Container className={style.search}>
			<form onSubmit={submitSearch}>

				<div className={style.SearchButtons}>
					{/* Selecting the city  */}
					<div className={style.City}>
						<Autocomplete
							placeholder="City"
							variant="unstyled"
							size="lg"
							required
							onChange={setCity}
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
							onChange={(values) => setDates(values)}
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
							value={people}
							onChange={setPeople}
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
							type="submit"
						>
						</Button>
					</div>

				</div >
			</form>
		</Container>

	);
}

export default SearchImputTest;