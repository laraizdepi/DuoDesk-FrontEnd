import { Grid, Col } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Navbar from '../components/NavBar/Navbar'
import CardsSearch from '../components/Search/CardsSearch'

const SearchPage = () => {
    const [ offices, setOffices ] = useState([])
    useEffect(() => {
        const getData = async() => {
            const response = await axios.get('http://localhost:5000/offices')
            console.log(response)
            setOffices(response.data)
        }
        getData()
    }, [])

    return (
        <div>
            <Navbar />
            <Grid id="id-search" grow>
                <Col span={12} md={7}>
                    <CardsSearch offices={offices}/>
                </Col>
                <Col span={1} md={5}>
                    <h1>Hello world</h1>
                </Col>
            </Grid>
        </div>
    )
}

export default SearchPage