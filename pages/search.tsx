import React, { FC, useEffect, useState } from 'react'
import { Grid, Col, Card, Text, Select, MultiSelect, Popover, Button, Image, Input, Divider, RangeSlider } from '@mantine/core'
import axios from 'axios'
import Head from 'next/head'
import { ScrollPanel } from 'primereact/scrollpanel'

import Navbar from '../components/NavBar/Navbar'
import CardsSearch from '../components/Search/CardsSearch'
import Filters from '../components/Search/Filters'
import SearchMap from '../components/Maps/SearchMap';
import { SelectItem } from '@mantine/core/lib/src/components/Select/types';
// import { value } from 'dom7'
import { useRouter } from 'next/dist/client/router'

interface Offices {
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
        booking?: any
    }[],
    address: any,
    scores?: {
        averageScore: number,
        reviews: any
    },
    days: [{
        day: string,
        isAvailable: boolean,
        startHour?: string,
        endHour?: string
    }],
    notifications: string[],
    official: string[],
    openDate: string
}

const listAmenities: SelectItem[] = [
    { label: "Acceso a internet", value: "Acceso a internet", group: "Clasicas" },
    { label: "Protocolos de Bioseguridad", value: "Protocolos de Bioseguridad", group: "Clasicas" },
    { label: "Parqueadero para carros", value: "Parqueadero para carros", group: "Clasicas" },
    { label: "Parqueadero para motocicletas", value: "Parqueadero para motocicletas", group: "Clasicas" },
    { label: "Parqueadero para bicicletas", value: "Parqueadero para bicicletas", group: "Clasicas" },
    { label: "Parqueadero para carros gratis", value: "Parqueadero para carros gratis", group: "Clasicas" },
    { label: "Parqueadero para motocicletas gratis", value: "Parqueadero para motocicletas gratis", group: "Clasicas" },
    { label: "Parqueadero para bicicletas gratis", value: "Parqueadero para bicicletas gratis", group: "Clasicas" },
    { label: "Recepción", value: "Recepción", group: "Clasicas" },
    { label: "Elevador", value: "Elevador", group: "Clasicas" },
    { label: "Buena iluminación", value: "Buena iluminación", group: "Clasicas" },
    { label: "Impresora", value: "Impresora", group: "Tecnología/Conectividad" },
    { label: "Proyector", value: "Proyector", group: "Tecnología/Conectividad" },
    { label: "Televisor", value: "Televisor", group: "Tecnología/Conectividad" },
    { label: "Aire Acondicionado", value: "Aire Acondicionado", group: "Tecnología/Conectividad" },
    { label: "Fotocopiadora", value: "Fotocopiadora", group: "Tecnología/Conectividad" },
    { label: "Escaner", value: "Escaner", group: "Tecnología/Conectividad" },
    { label: "Cargadores", value: "Cargadores", group: "Tecnología/Conectividad" },
    { label: "Bancos de carga", value: "Bancos de carga", group: "Alimentación" },
    { label: "Refrigerador", value: "Refrigerador", group: "Alimentación" },
    { label: "Café Gratis", value: "Café Gratis", group: "Alimentación" },
    { label: "Té Gratis", value: "Té Gratis", group: "Alimentación" },
    { label: "Snacks Gratis", value: "Snacks Gratis", group: "Alimentación" },
    { label: "Venta de Cafe", value: "Venta de Cafe", group: "Alimentación" },
    { label: "Alchol Permitido", value: "Alchol Permitido", group: "Alimentación" },
    { label: "Restaurante", value: "Restaurante", group: "Alimentación" },
    { label: "Bar/Venta de alcohol disponible", value: "Bar/Venta de alcohol disponible", group: "Alimentación" },
    { label: "Cocina", value: "Cocina", group: "Alimentación" },
    { label: "Servicio de cafetería", value: "Servicio de cafetería", group: "Alimentación" },
    { label: "Zona de recreación", value: "Zona de recreación", group: "Diversión/Ocio" },
    { label: "Gimnasio", value: "Gimnasio", group: "Diversión/Ocio" },
    { label: "Espacio de Yoga", value: "Espacio de Yoga", group: "Diversión/Ocio" },
    { label: "Espacio de meditación", value: "Espacio de meditación", group: "Diversión/Ocio" },
    { label: "Zona arcade", value: "Zona arcade", group: "Diversión/Ocio" },
    { label: "Juegos de mesa", value: "Juegos de mesa", group: "Diversión/Ocio" },
    { label: "Libreria", value: "Libreria", group: "Diversión/Ocio" },
    { label: "Masajes", value: "Masajes", group: "Diversión/Ocio" },
    { label: "Lugar para fumar", value: "Lugar para fumar", group: "Diversión/Ocio" },
    { label: "Cabinas telefonicas", value: "Cabinas telefonicas", group: "Zonas" },
    { label: "Espacio para mascotas", value: "Espacio para mascotas", group: "Zonas" },
    { label: "Espacio para maternidad", value: "Espacio para maternidad", group: "Zonas" },
    { label: "Espacios al aire libre", value: "Espacios al aire libre", group: "Zonas" },
    { label: "Sala de estar", value: "Sala de estar", group: "Zonas" },
    { label: "Lugares para dormir", value: "Lugares para dormir", group: "Zonas" },
    { label: "Espacio para llamada", value: "Espacio para llamada", group: "Zonas" },
    { label: "Espacios/Zonas verdes", value: "Espacios/Zonas verdes", group: "Zonas" },
    { label: "Casillero personal", value: "Casillero personal", group: "Zonas" },
    { label: "Terraza", value: "Terraza", group: "Zonas" },
    { label: "Zonas verdes", value: "Zonas verdes", group: "Zonas" },
    { label: "Lugares de AirBnB cercanos", value: "Lugares de AirBnB cercanos", group: "Ubicación" },
    { label: "Estacion de transporte cerca", value: "Estacion de transporte cerca", group: "Ubicación" },
    { label: "Vista al mar", value: "Vista al mar", group: "Ubicación" },
    { label: "Cerca al Centro Comercial", value: "Cerca al Centro Comercial", group: "Ubicación" },
    { label: "Cerca al Aeropuerto", value: "Cerca al Aeropuerto", group: "Ubicación" },
    { label: "Cerca al Centro", value: "Cerca al Centro", group: "Ubicación" },
    { label: "Cerca a zonas verdes", value: "Cerca a zonas verdes", group: "Ubicación" },
    { label: "Cerca a restaurantes", value: "Cerca a restaurantes", group: "Ubicación" },
    { label: "Cerca a estacion de policias", value: "Cerca a estacion de policias", group: "Ubicación" },
    { label: "Servicio de limpieza", value: "Servicio de limpieza", group: "Servicios" },
    { label: "Primeros Auxilios", value: "Primeros Auxilios", group: "Servicios" },
    { label: "Servicio de correo", value: "Servicio de correo", group: "Servicios" },
    { label: "Tablero acrilico con marcadores", value: "Tablero acrilico con marcadores", group: "Servicios" },
    { label: "Tablero de notas/noticias", value: "Tablero de notas/noticias", group: "Servicios" },
    { label: "Servicio 24 horas", value: "Servicio 24 horas", group: "Servicios" },
    { label: "Sillas tipo Puff", value: "Sillas tipo Puff", group: "Servicios" },
    { label: "Sillas ergonómicas", value: "Sillas ergonómicas", group: "Servicios" },
    { label: "Servicio días festivos", value: "Servicio días festivos", group: "Servicios" },
    { label: "Servicio todos los días", value: "Servicio todos los días", group: "Servicios" },
    { label: "Permite Mascotas", value: "Permite Mascotas", group: "Servicios" },
    { label: "Seguridad Privada", value: "Seguridad Privada", group: "Servicios" },
    { label: "Duchas", value: "Duchas", group: "Servicios" }
]

const SearchPage = (props: any) => {
    const [offices, setOffices] = useState<Offices[]>([])
    const [finalOffices, setFinalOffices] = useState<Offices[]>([])
    const [opened, setOpened] = useState<boolean>(false)
    const [type, setType] = useState<string>('all')
    const [amenities, setAmenities] = useState<string[]>([])
    const [time, setTime] = useState<string | undefined>(undefined)
    const [rangePrices, setRangePrices] = useState<{ min: number, max: number }>({ min: 0, max: 0 })
    const [days, setDays] = useState<'week' | 'with saturday' | 'with sunday' | 'all'>('all')

    useEffect(() => {   
        const getData = async () => {
            let url = 'http://localhost:5000/offices?'
            if(props.city){
                url = `${url}city=${props.city}&`
            }
            console.log(url)
            const response = await axios.get(url)
            setOffices(response.data)
            setFinalOffices(response.data)
        }
        getData()
    }, [])

    useEffect(() => {
        const extremes = Filters.getMinMax(finalOffices)
        console.log(extremes)
        setRangePrices({ min: extremes.min, max: extremes.max })
    }, [offices])

    useEffect(() => {
        setFinalOffices(offices)
        if (type !== 'all' && type !== "") {
            Filters.byType(type, offices, setFinalOffices)
        }
        if (amenities.length > 0) {
            if(type !== 'all' && type !== ""){
                Filters.byAmenities(amenities, offices, setFinalOffices, type)
            }
            else{
                Filters.byAmenities(amenities, offices, setFinalOffices)
            }
        }
        if (rangePrices.min > 0 && rangePrices.max && time === 'hour' || time === 'day' || time === 'week' || time === 'month') {
            Filters.byPrices(offices, setFinalOffices, time, rangePrices)
        }
        // if (days) {
        //     Filters.byDays(days, offices, setFinalOffices)
        // }
    }, [type, amenities, time, rangePrices, days])

    return (
        <div>
            <Head>
                <title>DuoDesk: Busca una oficina</title>
            </Head>
            <Navbar />
            <Grid id="id-search" style={{ width: '100%' }}>
                <Col span={12} md={8}>
                    <ScrollPanel style={{ width: '100%', height: '90vh' }}>
                        <Grid id="search-filters" align="end">
                            <Col span={3}>
                                <Select
                                    radius="xl"
                                    label="Filtrar por espacios"
                                    placeholder="Filtrar por espacios"
                                    data={["Oficina privada", "Escritorio personal", "Sala de conferencias", "Espacio abierto"]}
                                    onChange={setType}
                                    clearable
                                />
                            </Col>
                            <Col span={3}>
                                <Select
                                    id="select-days"
                                    radius="xl"
                                    label="Filtrar por días"
                                    placeholder="Filtrar por días"
                                    data={[
                                        { label: 'Todos los días', value: 'all' },
                                        { label: 'Entre semana', value: 'week' },
                                        { label: 'De Lunes a Sabado', value: 'with saturday' },
                                        { label: 'De Lunes a Domingo', value: 'with sunday' },
                                    ]}
                                    onChange={(value) => {
                                        if (value === 'all' || value === 'week' || value === 'with saturday' || value === 'with sunday') {
                                            setDays(value)
                                        }
                                    }}
                                    clearable
                                />
                            </Col>
                            <Col span={3}>
                                <Popover
                                    opened={opened}
                                    onClose={() => setOpened(false)}
                                    target={<Button variant="outline" color="gray" radius="xl" onClick={() => setOpened((o) => !o)}>Filtrar por precios</Button>}
                                    styles={{ body: { width: 260 } }}
                                    position="bottom"
                                    withArrow
                                >
                                    <div>
                                        <Divider margins="xs" label="Amenidades de la oficina" labelPosition="center" />
                                        <Select style={{ marginBottom: '3rem' }}
                                            radius="xl"
                                            label="Filtrar por espacios"
                                            placeholder="Filtrar por espacios"
                                            data={[
                                                { label: 'Hora', value: 'hour' },
                                                { label: 'Día', value: 'day' },
                                                { label: 'Semana', value: 'week' },
                                                { label: 'Mes', value: 'month' },
                                            ]}
                                            onChange={(value) => { setTime(value) }}
                                            clearable
                                        />
                                        <RangeSlider
                                            radius="xl"
                                            defaultValue={[rangePrices.min, rangePrices.max]}
                                            min={rangePrices.min}
                                            max={rangePrices.max}
                                            step={100000}
                                            onChange={(value) => { setRangePrices({ min: value[0], max: value[1] }) }}
                                            labelAlwaysOn />
                                    </div>
                                </Popover>
                            </Col>
                            <Col span={12}>
                                <MultiSelect
                                    radius="xl"
                                    id="amenities-filters"
                                    label="Filtrar por amenidades"
                                    placeholder="Filtrar por amenidades"
                                    data={listAmenities}
                                    onChange={setAmenities}
                                    clearable
                                    searchable
                                />
                            </Col>
                        </Grid>
                        <CardsSearch offices={finalOffices} />
                    </ScrollPanel>
                </Col>
                <Col span={12} md={4}>
                    <SearchMap offices={finalOffices} />
                </Col>
            </Grid>
        </div>
    )
}

SearchPage.getInitialProps = async ({ query }: any) => {
    return query
}

export default SearchPage