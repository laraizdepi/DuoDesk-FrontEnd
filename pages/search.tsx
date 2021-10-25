import React, { FC, Ref, useEffect, useRef, useState } from 'react'
import { Grid, Col, Text, Select, Popover, Button, Image, Divider, Pagination, Center, LoadingOverlay, MultiSelect, RangeSlider, Modal, Container } from '@mantine/core'
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
    const [initialOffices, setInitialOffices] = useState<Offices[]>([])
    const [filteredOffices, setFilteredOffices] = useState<Offices[]>([])
    const [shownOffices, setShownOffices] = useState<Offices[]>([])
    const [total, setTotal] = useState<number>(Math.floor(shownOffices.length))
    const [pages, setPages] = useState<number>(1)

    const [mobile, setMobile] = useState<boolean>(false)
    const [loading, setLoading] = useState<0 | 1 | 2>(0)
    const [show, setShow] = useState<boolean>(true)
    const [opened, setOpened] = useState<boolean>(false)
    const [openedMap, setOpenedMap] = useState<boolean>(false)

    const [amenities, setAmenities] = useState<string[]>([])
    const [days, setDays] = useState<string | undefined>(undefined)
    const [period, setPeriod] = useState<string | undefined>(undefined)
    const [extremes, setExtremes] = useState<{ min: number, max: number }>({ min: 0, max: 1000 })
    const [prices, setPrices] = useState<[number, number]>([0, 0])


    useEffect(() => {
        const getData = async () => {
            let url = `http://localhost:5000/offices?`
            if (props.city) url = `${url}city=${props.city}&`
            if (props.type) url = `${url}type=${encodeURIComponent(props.type)}&`
            if (props.date) url = `${url}date=${encodeURIComponent(props.date)}&`
            if (props.people) url = `${url}people=${props.people}&`
            const response = await axios.get(url)
            if (response.data.length > 0) {
                setInitialOffices(response.data)
                setFilteredOffices(response.data)
                setShownOffices(response.data.slice((pages - 1) * 10, pages * 10))
                setExtremes(Filters.getMinMax(response.data))
                setPrices([Filters.getMinMax(response.data).min, Filters.getMinMax(response.data).max])
                setTotal(Math.floor(initialOffices.length / 10) + 1)
                setLoading(1)
            }
            else setLoading(2)
        }
        getData()
    }, [])


    useEffect(() => {
        setFilteredOffices(initialOffices)
        setPages(1)
        if (amenities && amenities.length > 0) setFilteredOffices(Filters.byAmenities(amenities, filteredOffices))
        if (days) setFilteredOffices(Filters.byDays(days, filteredOffices))
        if (period && prices) setFilteredOffices(Filters.byPrices(filteredOffices, prices, period))
    }, [amenities, days, period, prices, loading])

    useEffect(() => {
        if (filteredOffices.length > 0) {
            setShow(true)
            setShownOffices(filteredOffices.slice((pages - 1) * 10, pages * 10))
        }
        else setShow(false)
    }, [filteredOffices])

    useEffect(() => {
        if (window.innerWidth <= 800) {
            setMobile(true)
        }
        const handleResize = () => {
            if (window.innerWidth <= 800) {
                setMobile(true)
            }
            else {
                setMobile(false)
            }
            alert(mobile)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (loading === 0) {
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

    if (mobile) {
        return (
            <div>
                <Head>
                    <title>DuoDesk: Busca una oficina</title>
                </Head>
                <Navbar />
                <Container style={{ width: '100%', height: '90vh' }}>
                    <Grid id="search-filters" align="center" className="px-5 mt-3">
                        <Col span={12} md={4}>
                            <TagPicker
                                placeholder="Amenidades"
                                data={AminitiesList}
                                groupBy="group"
                                className="rounded-xl"
                                style={{ borderRadius: '10px', width: '100%', margin: 'auto' }}
                                onChange={(value) => setAmenities(value)}
                                trigger={'Enter'}
                            />
                        </Col>
                        <Col span={12} md={4}>
                            <Select
                                id="select-days"
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
                        <Col span={12} md={4}>
                            <Popover
                                opened={opened}
                                onClose={() => setOpened(false)}
                                target={<Button variant="outline" color="gray" onClick={() => setOpened(!opened)} className="w-full">Filtrar por precios</Button>}
                                position="bottom"
                                withArrow
                            >
                                <div>
                                    <Divider margins="xs" label="Precios de la oficina" labelPosition="center" />
                                    <Select style={{ marginBottom: '4rem' }}
                                        placeholder="Tipo de intervalo"
                                        data={[
                                            { label: 'Hora', value: 'hour' },
                                            { label: 'Día', value: 'day' },
                                            { label: 'Semana', value: 'week' },
                                            { label: 'Mes', value: 'month' },
                                        ]}
                                        onChange={setPeriod}
                                        value={period}
                                        clearable
                                    />
                                    <RangeSlider
                                        onChange={setPrices}
                                        value={prices}
                                        min={extremes.min}
                                        max={extremes.max}
                                        labelAlwaysOn
                                    />
                                </div>
                            </Popover>
                        </Col>
                    </Grid>
                    {show
                        ?
                        <div>
                            <div className="my-4 mx-5">
                                <Text>Viendo {pages} - {pages * shownOffices.length} de {filteredOffices.length} oficinas</Text>
                            </div>
                            <CardsSearch offices={shownOffices} date={props.date} people={props.people} />
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
                    <Modal
                        opened={openedMap}
                        onClose={() => setOpenedMap(false)}
                        title="Oficinas disponibles"
                    >
                        <SearchMap offices={shownOffices} city={props.city} />
                    </Modal>
                    <Button color="pink" onClick={() => setOpenedMap(true)} className="fixed bottom-5 right-5" style={{ position: 'fixed'}}>
                        Mapa
                    </Button>
                </Container>
            </div >
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
                        <Grid id="search-filters" align="center" className="px-5 mt-3">
                            <Col span={12} md={4}>
                                <TagPicker
                                    placeholder="Amenidades"
                                    data={AminitiesList}
                                    groupBy="group"
                                    className="rounded-xl"
                                    style={{ borderRadius: '10px', width: '100%', margin: 'auto' }}
                                    onChange={(value) => setAmenities(value)}
                                    trigger={'Enter'}
                                />
                            </Col>
                            <Col span={12} md={4}>
                                <Select
                                    id="select-days"
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
                            <Col span={12} md={4}>
                                <Popover
                                    opened={opened}
                                    onClose={() => setOpened(false)}
                                    target={<Button variant="outline" color="gray" onClick={() => setOpened(!opened)} className="w-full">Filtrar por precios</Button>}
                                    position="bottom"
                                    withArrow
                                >
                                    <div>
                                        <Divider margins="xs" label="Precios de la oficina" labelPosition="center" />
                                        <Select style={{ marginBottom: '4rem' }}
                                            placeholder="Tipo de intervalo"
                                            data={[
                                                { label: 'Hora', value: 'hour' },
                                                { label: 'Día', value: 'day' },
                                                { label: 'Semana', value: 'week' },
                                                { label: 'Mes', value: 'month' },
                                            ]}
                                            onChange={setPeriod}
                                            value={period}
                                            clearable
                                        />
                                        <RangeSlider
                                            onChange={setPrices}
                                            value={prices}
                                            min={extremes.min}
                                            max={extremes.max}
                                            labelAlwaysOn
                                        />
                                    </div>
                                </Popover>
                            </Col>
                        </Grid>
                        {show
                            ?
                            <div>
                                <div className="my-4 mx-5">
                                    <Text>Viendo {pages} - {pages * shownOffices.length} de {filteredOffices.length} oficinas</Text>
                                </div>
                                <CardsSearch offices={shownOffices} date={props.date} people={props.people} />
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
                    <SearchMap offices={shownOffices} city={props.city} />
                </Col>
            </Grid>
        </div>
    )
}

SearchPage.getInitialProps = async ({ query }: any) => {
    return query
}

export default SearchPage