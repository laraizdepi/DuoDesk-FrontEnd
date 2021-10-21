import React, { FC, useState } from 'react'
import { Badge, Card, Divider, Group, Text, Title, Image, Grid, Col, List, ThemeIcon, Spoiler, Paper, Container, Center } from '@mantine/core'
import { FaRegHeart, FaRegStar } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'
import { Carousel as BCarousel } from 'react-bootstrap'
import { NextLink } from '../NextLink/NextLink'
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi'
import Head from 'next/head'
import Slider from "react-slick";


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

interface ArrowsInterface {
    className?: string,
    style?: any,
    onClick?: any,
}

const NextArrow: FC<ArrowsInterface> = (props) => {
    return (
        <ThemeIcon
            className={`${props.className} hover: bg-indigo`}
            onClick={props.onClick}
            radius="xl"
            color="indigo"
        >
            <HiArrowSmRight color="#000" />
        </ThemeIcon>
    )
}

const PrevArrow: FC<ArrowsInterface> = (props) => {
    return (
        <ThemeIcon
            className={`${props.className}`}
            onClick={props.onClick}
            radius="xl"
            color="indigo"
        >
            <HiArrowSmLeft />
        </ThemeIcon>
    )
}

const CardSearchBase: FC<{ office: Offices, date: string, people: number}> = (props) => {
    const [space, setSpace] = useState(props.office.spaces[0])
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 10000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current: number, next: number) => setSpace(props.office.spaces[next])
    }
    const pricesFunction = (price: number) => {
        let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
        const tier = Math.log10(Math.abs(price)) / 3 | 0;
        if (tier == 0) {
            return price
        }
        const suffix = SI_SYMBOL[tier]
        const scale = Math.pow(10, tier * 3);
        const scaled = price / scale;
        return scaled.toFixed(1) + suffix
    }

    return (
        <div>
            <Head>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <Card component={NextLink} href={`/search/${props.office.id}`}
                withBorder radius="lg" shadow="lg"
                style={{ margin: '1rem' }} className="hover:no-underline">
                <Group direction="column" position="left" style={{ marginLeft: '1rem' }}>
                    <div>
                        <BCarousel>
                            {space.imagesUrls.map((image) => {
                                const url = image.split('-', 2)
                                const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
                                const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`
                                return (
                                    <BCarousel.Item key={image} interval={5000}>
                                        <Image
                                            height="12rem"
                                            src={src}
                                            radius="lg"
                                            fit="cover" />
                                    </BCarousel.Item>
                                )
                            })}
                        </BCarousel>
                    </div>
                    <div>
                        <Group position="apart" className="my-0">
                            <Title order={2}>
                                {props.office.name}
                            </Title>
                        </Group>
                        <Group position="right">
                            <Text>{props.office.scores?.averageScore ? <div><FaRegStar color="#4C6EF5" />{props.office.scores?.averageScore}</div> : null}</Text>
                        </Group>
                        <Divider margins="xs" label="Amenidades de la oficina" labelPosition="center" />
                        <Group position="left">
                            <Spoiler
                                onClick={(event) => event.preventDefault()}
                                maxHeight={90}
                                showLabel="Ver todas las amenidades" hideLabel="Ocultar amenidades">
                                <List
                                    style={{ padding: '1rem 0' }}
                                    spacing="xs"
                                    icon={
                                        <ThemeIcon radius="lg" color="indigo">
                                            <AiOutlineStar />
                                        </ThemeIcon>
                                    }>
                                    {props.office.generalAmenities.map((amenity) => {
                                        return (
                                            <List.Item key={amenity}>
                                                <Text>{amenity}</Text>
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Spoiler>
                        </Group>
                    </div>
                </Group>
                <div className="m-2 p-3">
                    <Slider {...settings} >
                        {props.office.spaces.map((element) => {
                            return (
                                <Card shadow="lg" withBorder padding="xl" key={element.nameSpace}>
                                    <Container>
                                        <Group direction="column" position="center">
                                            <Title order={5}>{element.nameSpace}</Title>
                                            <Text transform="capitalize">{element.typeSpace}</Text>
                                        </Group>
                                    </Container>
                                    <Divider margins="xs" label="Precios del espacio" labelPosition="center" />
                                    <Container style={{ marginBottom: '5px' }}>
                                        <Group position="left">
                                            <div>
                                                <Title order={6}>Por hora</Title>
                                                <Text>{pricesFunction(element.hourPrice)}</Text>
                                            </div>
                                            <div>
                                                <Title order={6}>Por día</Title>
                                                <Text>{pricesFunction(element.dayPrice)}</Text>
                                            </div>
                                            <div>
                                                <Title order={6}>Por mes</Title>
                                                <Text>{pricesFunction(element.weekPrice)}</Text>
                                            </div>
                                            <div>
                                                <Title order={6}>Por semana</Title>
                                                <Text>{pricesFunction(element.monthPrice)}</Text>
                                            </div>
                                        </Group>
                                    </Container>
                                    <Divider margins="xs" label="Amenidades del espacio" labelPosition="center" />
                                    <Container>
                                        <Spoiler maxHeight={90}
                                            onClick={(event) => event.preventDefault()}
                                            showLabel="Ver todas las amenidades" hideLabel="Ocultar amenidades">
                                            <List
                                                style={{ padding: '1rem 0' }}
                                                spacing="xs"
                                                icon={
                                                    <ThemeIcon radius="lg" color="indigo">
                                                        <AiOutlineStar />
                                                    </ThemeIcon>
                                                }>
                                                {element.nameAmenities.map((amenity) => {
                                                    return (
                                                        <List.Item key={amenity}>
                                                            <Text>{amenity}</Text>
                                                        </List.Item>
                                                    )
                                                })}
                                            </List>
                                        </Spoiler>
                                    </Container>
                                </Card>
                            )
                        })}
                    </Slider>
                </div>
            </Card >
        </div>
    )
}

export default CardSearchBase