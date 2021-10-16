import React, { FC, useState } from 'react'
import { Badge, Card, Divider, Group, Text, Title, Image, List, ThemeIcon, Spoiler } from '@mantine/core'
import { FaRegHeart, FaRegStar } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'
import { Carousel as BCarousel } from 'react-bootstrap'
import { Carousel as RCarousel } from 'rsuite';
import { IconButton, Typography } from '@mui/material'
import { Col, Row, Container } from 'react-bootstrap'
import { Button } from '@mantine/core'
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

const CardSearchBaseTest: FC<{ office: Offices }> = (props) => {

  return (
    // <Card withBorder shadow="sm" radius="lg" style={{ margin: '1rem', height: '100%' }}>
    <Group direction="column" position="center">
      <Card.Section>
        <div>
          {props.office.spaces.map((space) => {
            return (
              <div>

                <Card withBorder shadow="sm" radius="lg" style={{ margin: '1rem', height: '100%' }}>
                  <Row style={{ marginBottom: '10px' }}>
                    {/* Images Slider for Spaces */}
                    <Col xs={12} md={6}>
                      <BCarousel>
                        {space.imagesUrls.map((image) => {
                          const url = image.split('-', 2)
                          const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
                          const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`
                          return (
                            <BCarousel.Item key={image} interval={3000}>
                              <Image
                                height="25rem"
                                src={src}
                                // radius="lg"
                                fit="contain" />
                            </BCarousel.Item>
                          )
                        })}
                      </BCarousel>
                    </Col>
                    {/* Individual cards */}
                    <Col xs={12} md={6}>
                      <Card key={space.nameSpace} withBorder shadow="lg" radius="xl" style={{ padding: '2rem 3rem' }}>
                        <Card.Section>
                          <Group position="apart">
                            <Title order={5} style={{ fontSize: '25px' }}>{space.nameSpace}</Title>
                            <Badge color="teal" style={{ fontSize: '9px' }}>{space.typeSpace}</Badge>
                          </Group>
                        </Card.Section>
                        <Divider margins="xs" label="Precios del espacio" labelPosition="center" />
                        <Card.Section style={{ marginBottom: '5px' }}>
                          <Group position="apart">
                            <div>
                              <Title order={6}>Por hora</Title>
                              <Text>${space.hourPrice / 1000}k</Text>
                            </div>
                            <div>
                              <Title order={6}>Por día</Title>
                              <Text>${space.dayPrice / 1000}k</Text>
                            </div>
                            <div>
                              <Title order={6}>Por semana</Title>
                              <Text>${space.weekPrice / 1000}k</Text>
                            </div>
                            <div>
                              <Title order={6}>Por mes</Title>
                              <Text>${space.monthPrice / 1000000}M</Text>
                            </div>
                          </Group>
                        </Card.Section>
                        <Divider margins="xs" label="Amenidades del espacio" labelPosition="center" />
                        <Card.Section style={{ height: "14rem" }}>
                          <Spoiler maxHeight={190} showLabel="Ver todas las amenidades" hideLabel="Ocultar amenidades">
                            <div style={{ height: '170px' }} >
                              <Row>
                                {space.nameAmenities.map((amenity) => {
                                  return (
                                    // <List.Item key={amenity}>
                                    <Col md={6} style={{ display: 'flex', marginBottom: '10px' }}>
                                      <div style={{ marginLeft: '0px' }}>
                                        <ThemeIcon radius="lg" color="indigo" >
                                          <AiOutlineStar />
                                        </ThemeIcon>
                                      </div>
                                      <Text style={{ marginLeft: '5px' }}>
                                        {amenity}
                                      </Text>
                                    </Col>
                                    // </List.Item>
                                  )
                                })}
                              </Row>
                              {/* </List> */}
                            </div>
                          </Spoiler>
                          <Row>
                            <Col xs = {9}>
                              <Button color="pink" radius="lg">
                                Reserva este espacio
                              </Button>
                            </Col>
                            <Col xs = {3}>
                                <p>$PRECIO TOTAL</p>
                            </Col>
                          </Row>
                        </Card.Section>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </div>
            )
          })}
        </div>
      </Card.Section>
    </Group>
    // </Card >
  )
}

export default CardSearchBaseTest