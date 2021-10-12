import React, { FC, useState } from 'react'
import { Badge, Card, Divider, Group, Text, Title, Image, Grid, Col, List, ThemeIcon, Spoiler } from '@mantine/core'
import { FaRegHeart, FaRegStar } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'
import { Carousel as BCarousel } from 'react-bootstrap'
import { Carousel as RCarousel } from 'rsuite';
import { IconButton, Typography } from '@mui/material'
import { NextLink } from '../NextLink/NextLink'

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

const CardSearchBase: FC<{ office: Offices }> = (props) => {
    const [space, setSpace] = useState(props.office.spaces[0])
    const [opened, setOpened] = useState(false)

    const generalAmenities = props.office.generalAmenities.sort((amenity1, amenity2) => {
        if (amenity1.length < amenity2.length) {
            return -1
        }
        return 1
    })

    const sliderOnChange = (event: any) => {
        console.log(event.slideIndex)
        setSpace(props.office.spaces[event.slideIndex])
    }

    const direction = props.office.address.formatted_address.split(',', 2)

    return (
        <Card component={NextLink} href={`/search/${props.office.id}`}
            withBorder shadow="sm" radius="lg" style={{ margin: '1rem', height: '100%' }}
            className="hover:no-underline">
            <Group direction="column" position="left" style={{ marginLeft: '1rem' }}>
                <Card.Section>
                    <BCarousel>
                        {space.imagesUrls.map((image) => {
                            const url = image.split('-', 2)
                            const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
                            const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`
                            return (
                                <BCarousel.Item key={image} interval={3000}>
                                    <Image
                                        height="12rem"
                                        src={src}
                                        // radius="lg"
                                        fit="contain" />
                                </BCarousel.Item>
                            )
                        })}
                    </BCarousel>
                </Card.Section>
                <Card.Section>
                    <Group position="apart" className="my-0">
                        <Title order={2}>
                            {props.office.name}
                        </Title>
                        <IconButton color="primary" aria-label="upload picture" component="span" >
                            <AiOutlineHeart />
                        </IconButton>
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
                </Card.Section>
                <Card.Section>
                    <RCarousel onSelect={(index: number, event: React.ChangeEvent) => {
                        setSpace(props.office.spaces[index])
                    }}
                    onSlideStart={(index: number, event: React.ChangeEvent) => {
                        setSpace(props.office.spaces[index])
                    }}
                        as={Card}
                        style={{ height: '100%', padding: '0px' }}
                        autoplay
                        autoplayInterval={10000}
                    >
                        {props.office.spaces.map((element) => {
                            const spaceAmenities = element.nameAmenities.sort((amenity1, amenity2) => {
                                if (amenity1.length < amenity2.length) {
                                    return -1
                                }
                                return 1
                            })
                            return (
                                <Card key={element.nameSpace} withBorder shadow="lg" radius="xl" style={{ padding: '2rem 2rem' }}>
                                    <Card.Section>
                                        <Group direction="column" position="center">
                                            <Title order={5}>{element.nameSpace}</Title>
                                            <Text transform="capitalize">{element.typeSpace}</Text>
                                        </Group>
                                    </Card.Section>
                                    <Divider margins="xs" label="Precios del espacio" labelPosition="center" />
                                    <Card.Section style={{ marginBottom: '5px' }}>
                                        <Group position="apart">
                                            <div>
                                                <Title order={6}>Por hora</Title>
                                                <Text>$3k</Text>
                                            </div>
                                            <div>
                                                <Title order={6}>Por día</Title>
                                                <Text>$50k</Text>
                                            </div>
                                            <div>
                                                <Title order={6}>Por mes</Title>
                                                <Text>$300k</Text>
                                            </div>
                                            <div>
                                                <Title order={6}>Por semana</Title>
                                                <Text>$1.35M</Text>
                                            </div>
                                        </Group>
                                    </Card.Section>
                                    <Divider margins="xs" label="Amenidades del espacio" labelPosition="center" />
                                    <Card.Section>
                                        {/* <Spoiler maxHeight={90}
                                            onClick={(event) => event.preventDefault()}
                                            showLabel="Ver todas las amenidades" hideLabel="Ocultar amenidades"> */}
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
                                        {/* </Spoiler> */}
                                    </Card.Section>
                                </Card>
                            )
                        })}
                    </RCarousel>
                </Card.Section>
            </Group>
        </Card >
    )
}

export default CardSearchBase