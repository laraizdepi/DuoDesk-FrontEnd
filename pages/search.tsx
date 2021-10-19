import React, { FC, Ref, useEffect, useRef, useState } from 'react'
import { Grid, Col, Text, Select, Popover, Button, Image, Divider, Pagination, Center, LoadingOverlay } from '@mantine/core'
import axios from 'axios'
import { TagPicker } from 'rsuite'
import Head from 'next/head'
import { ScrollPanel } from 'primereact/scrollpanel'

import Navbar from '../components/NavBar/Navbar'
import CardsSearch from '../components/Search/CardsSearch'
import Filters from '../components/Search/Filters'
import SearchMap from '../components/Maps/SearchMap';

import AminitiesList from '../components/Search/AminitiesList'

import NoOfficesImages from '../Img/search/not-found.svg'
import WaitOfficeImage from '../Img/search/wait-office.svg'

interface Offices {
    id: string,
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

const SearchPage = (props: any) => {
    const [offices, setOffices] = useState<Offices[]>([])
    const [finalOffices, setFinalOffices] = useState<Offices[]>([])
    const [showOffices, setShowOffices] = useState<Offices[]>([])
    const [loading, setLoading] = useState<0 | 1 | 2 >(0)
    const [show, setShow] = useState<boolean>(true)
    const [opened, setOpened] = useState<boolean>(false)
    const [type, setType] = useState<string>('all')
    const [amenities, setAmenities] = useState<string[]>([])
    const [time, setTime] = useState<'hour' | 'day' | 'week' | 'month' | undefined>(undefined)
    const [prices, setPrices] = useState<[number, number]>([0, 0])
    const [days, setDays] = useState<string | undefined>(undefined)
    const [pages, setPages] = useState<number>(1)
    const [visible, setVisible] = useState(false)
    const [total, setTotal] = useState<number>(Math.floor(showOffices.length))

    const cardsRef: any = useRef(CardsSearch)

    useEffect(() => {
        const getData = async () => {
            let url = 'http://localhost:5000/offices?'
            if (props.city) {
                url = `${url}city=${props.city}&`
            }
            console.log(url)
            const response = await axios.get(url)
            if(response.data.length > 0){
                setOffices(response.data)
                setFinalOffices(response.data)
                setShowOffices(response.data.slice((pages - 1) * 10, pages * 10))
                setTotal(Math.floor(response.data.length / 10 )+ 1)
                setLoading(1)
            }
            else{
                setLoading(2)
            }
        }
        getData()
        console.log('Total', total)
    }, [])

    useEffect(() => {
        if (finalOffices.length === 0) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }, [finalOffices])

    useEffect(() => {
        setFinalOffices(offices)
        if (type !== 'all' && type !== "" && type) {
            Filters.byType(type, finalOffices, setFinalOffices)
        }
        if (amenities.length > 0) {
            if (type !== 'all' && type !== "") {
                Filters.byAmenities(amenities, finalOffices, setFinalOffices, type)
            }
            else {
                Filters.byAmenities(amenities, finalOffices, setFinalOffices)
            }
        }
        if (days) {
            Filters.byDays(days, finalOffices, setFinalOffices)
        }
        if (prices && JSON.stringify(prices) !== JSON.stringify([0, 0]) && time) {
            console.log("Final Offices:", finalOffices)
            Filters.byPrices(finalOffices, setFinalOffices, time, prices)
        }
    }, [type, amenities, time, days, prices])

    useEffect(() => {
        setVisible(true)
        setShowOffices(finalOffices.slice((pages - 1) * 10, pages * 10))
        setVisible(false)
    }, [pages])

    if(loading === 0){
        return (
            <div className="flex flex-col justify-center">
                <Head>
                    <title>DuoDesk: Busca una oficina</title>
                </Head>
                <Navbar />
                <Image
                    src={WaitOfficeImage.src}
                    width="35%"
                    fit="cover"
                    className="m-auto"
                    caption={
                        <Text align="center" size="lg" transform="capitalize" weight="bold" className="m-auto">
                            Estamos buscando las mejores oficinas para ti, 
                            te pedimos que por favor esperes un momento.
                        </Text>
                    } />
            </div>
        )
    }

    if (loading === 2) {
        return (
            <div className="flex flex-col justify-center">
                <Head>
                    <title>DuoDesk: Busca una oficina</title>
                </Head>
                <Navbar />
                <Image
                    src={NoOfficesImages.src}
                    width="35%"
                    fit="cover"
                    className="m-auto"
                    caption={
                        <Text align="center" size="lg" transform="capitalize" weight="bold" className="m-auto">
                            No hay oficinas con esas caracteristicas. Lo sentimos.
                            Por favor, intenta buscar con otros parametros o sí
                            quieres puedes registrar una oficina.
                        </Text>
                    } />
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>DuoDesk: Busca una oficina</title>
            </Head>
            <Navbar />
            <Grid id="id-search" style={{ width: '100%' }}>
                <Col span={12} md={7}>
                    <ScrollPanel style={{ width: '100%', height: '90vh' }}>
                        <Grid id="search-filters" align="end">
                            <Col span={12} md={3} style={{ display: 'flex' }}>
                                <TagPicker
                                    placeholder="Amenidades"
                                    data={AminitiesList}
                                    groupBy="group"
                                    style={{ borderRadius: '10px', width: '90%', margin: 'auto' }}
                                    onChange={(event) => setAmenities(event.target.value)}
                                    trigger={'Enter'} />
                            </Col>
                            <Col span={12} md={3}>
                                <Select
                                    id="typeSpaces"
                                    radius="xl"
                                    placeholder="Filtrar por espacios"
                                    data={["Oficina privada", "Escritorio personal", "Sala de conferencias", "Espacio abierto"]}
                                    onChange={setType}
                                    clearable
                                />
                            </Col>
                            <Col span={12} md={3}>
                                <Select
                                    id="select-days"
                                    radius="xl"
                                    placeholder="Filtrar por días"
                                    data={[
                                        { label: 'Todos los días', value: 'all' },
                                        { label: 'Entre semana', value: 'week' },
                                        { label: 'Entre semana y Sabado', value: 'with saturday' },
                                        { label: 'Entre semana y Domingo', value: 'with sunday' },
                                    ]}
                                    onChange={setDays}
                                    clearable
                                />
                            </Col>
                            <Col span={12} md={3}>
                                <Popover
                                    opened={opened}
                                    onClose={() => setOpened(false)}
                                    target={<Button variant="outline" color="gray" radius="xl" onClick={() => setOpened((o) => !o)}>Filtrar por precios</Button>}
                                    styles={{ body: { width: 260 } }}
                                    position="bottom"
                                    withArrow
                                >
                                    <div>
                                        <Divider margins="xs" label="Precios de la oficina" labelPosition="center" />
                                        <Select style={{ marginBottom: '4rem' }}
                                            value={time}
                                            radius="xl"
                                            placeholder="Tipo de intervalo"
                                            data={[
                                                { label: 'Hora', value: 'hour' },
                                                { label: 'Día', value: 'day' },
                                                { label: 'Semana', value: 'week' },
                                                { label: 'Mes', value: 'month' },
                                            ]}
                                            onChange={(value: string) => {
                                                if (value === 'hour' || value === 'day' || value === 'week' || value === 'month' || value === undefined) {
                                                    setTime(value)
                                                }
                                            }}
                                            clearable
                                        />
                                    </div>
                                </Popover>
                            </Col>
                        </Grid>
                        <div className="my-4 mx-5">
                            <Text>Viendo {pages} - {pages * showOffices.length} de {finalOffices.length} oficinas</Text>
                        </div>
                        {show
                            ?
                            <div>
                                <LoadingOverlay visible={visible} transitionDuration={0} />
                                <CardsSearch offices={showOffices} ref={cardsRef} />
                                <Center>
                                    <Pagination
                                        total={total}
                                        color="violet" 
                                        radius="xl" 
                                        page={pages} 
                                        onChange={setPages} 
                                        withGutter
                                    />
                                </Center>
                            </div>
                            : <Image
                                src={NoOfficesImages.src}
                                width="35%"
                                fit="cover"
                                className="m-auto"
                                caption={
                                    <Text align="center" size="lg" transform="capitalize" weight="bold" className="m-auto">
                                        No hay oficinas con dichas caracterisiticas.
                                        Intenta con otros filtros o parametros de busqueda
                                    </Text>
                                } />
                        }
                    </ScrollPanel>
                </Col>
                <Col span={12} md={5}>
                    <SearchMap onlyOffices={showOffices} city={props.city} />
                </Col>
            </Grid>
        </div>
    )
}

SearchPage.getInitialProps = async ({ query }: any) => {
    return query
}

export default SearchPage