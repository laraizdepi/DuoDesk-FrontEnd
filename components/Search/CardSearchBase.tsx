import React, { FC, useState } from 'react'
import { Badge, Card, Col, Divider, Grid, Group, Text, ThemeIcon, Title, Image } from '@mantine/core'
import { FaRegHeart, FaRegStar } from 'react-icons/fa'
import { Carousel } from 'react-bootstrap'

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

    return (
        <div>
            <Card withBorder shadow="sm" radius="md">
                <Grid>
                    <Col span={12} md={4}>
                        <Card.Section>
                            <Carousel as={Card}>
                                {space.imagesUrls.map((image) => {
                                    const url = image.split('-', 2)
                                    const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
                                    const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`
                                    return (
                                        <Carousel.Item key={image}>
                                            <Image
                                                width={200}
                                                height={80}
                                                src={src}
                                                fit="contain" />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </Card.Section>
                    </Col>
                    <Col span={12} md={8}>
                        <Card.Section>
                            <Group position="apart" className="my-2">
                                <Title order={3}>{props.office.name}</Title>
                                <ThemeIcon>
                                    <FaRegHeart />
                                </ThemeIcon>
                            </Group>
                            <Group position="apart">
                                <Text size="xs">{props.office.address.formatted_address}</Text>
                                <Text>{props.office.scores?.averageScore || null}<FaRegStar /></Text>
                            </Group>
                            <Divider margins="xs" label="Amenidades de la oficina" labelPosition="center" />
                            <Group>
                                <Badge>{generalAmenities[0]}</Badge>
                                <Badge>{generalAmenities[1]}</Badge>
                                <Badge>{generalAmenities[2]}</Badge>
                                <Badge>{generalAmenities.length - 3}+</Badge>
                            </Group>
                            <Card>
                                <Card.Section>
                                    {props.office.spaces.map((element) => {
                                        const spaceAmenities = element.nameAmenities.sort((amenity1, amenity2) => {
                                            if (amenity1.length < amenity2.length) {
                                                return -1
                                            }
                                            return 1
                                        })
                                        return (
                                            <Card key={element.nameSpace} withBorder shadow="lg" style={{ margin: '1rem', padding: '2rem 3rem' }}>
                                                <Card.Section>
                                                    <Group position="apart">
                                                        <Title order={4}>{element.nameSpace}</Title>
                                                        <Badge color="teal">{element.typeSpace}</Badge>
                                                    </Group>
                                                </Card.Section>
                                                <Divider margins="xs" label="Amenidades del espacio" labelPosition="center" />
                                                <Card.Section>
                                                    <Group position="left">
                                                        <Badge style={{ width: '90px' }}>{spaceAmenities[0]}</Badge>
                                                        <Badge style={{ width: '110px' }}>{spaceAmenities[1]}</Badge>
                                                        <Badge style={{ width: '110px' }}>{spaceAmenities[2]}</Badge>
                                                        {spaceAmenities.length - 3 === 0 ? null : <Badge>{spaceAmenities.length - 3}+</Badge>}
                                                    </Group>
                                                </Card.Section>
                                                <Divider margins="xs" label="Precios del espacio" labelPosition="center" />
                                                <Card.Section>
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
                                            </Card>
                                        )
                                    })}
                                </Card.Section>
                            </Card>
                        </Card.Section>
                    </Col>
                </Grid>
            </Card>
        </div>
    )
}

export default CardSearchBase
