import React, { FC, useState } from 'react'
import { Badge, Card, Divider, Group, Text, Title, Image, List, ThemeIcon, Spoiler } from '@mantine/core'
import { FaRegHeart, FaRegStar } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'
import { Carousel as BCarousel } from 'react-bootstrap'
import { Carousel as RCarousel } from 'rsuite';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { Col, Row, Container } from 'react-bootstrap'
import { Button } from '@mantine/core'
import { TabPanel } from '@mui/lab'
import TabsSpace from './tabsSpace'
import SearchValues from './SearchValues'
import { IoPeopleOutline } from 'react-icons/io5'


interface CardSearchBaseTestProps {
  spaces: any[]
  available?: boolean
}


const CardSearchBaseTest: FC<CardSearchBaseTestProps> = (props) => {
  const spaces = props.spaces
  const [opacity, setopacity] = useState(1)
  const available = props.available

  return (
    <>
      <Group direction="column" position="center">
        <Card.Section>
          <div>
            {spaces.map((space: any[]) => {
              return (
                <div>
                  <Card withBorder shadow="sm" radius="lg" style={{ margin: '0rem', height: '100%', opacity: opacity }}>
                    <Row style={{ marginBottom: '10px' }}>
                      {/* Images Slider for Spaces */}
                      <Col xs={12} md={6}>
                        <BCarousel>
                          {space.imagesUrls.map((image) => {
                            return (
                              <BCarousel.Item key={image} interval={3000}>
                                <img src={image} alt="" style={{ objectFit: 'cover', height: '26rem', width: '700px' }} />
                              </BCarousel.Item>
                            )
                          })}
                        </BCarousel>
                      </Col>
                      {/* Individual cards */}
                      <Col xs={12} md={6}>
                        <Card key={space.nameSpace} withBorder shadow="lg" radius="xl" style={{ padding: '2rem 3rem' }}>
                          <Card.Section>
                            <div >

                              <Row>
                                <Col md={10}>

                                  <Title order={5} style={{ fontSize: '25px' }}>{space.nameSpace}</Title>
                                  {/* <h1>t</h1> */}
                                </Col>
                                <Col md={2}>
                                  <h2 style={{ display: 'flex', alignItems: 'center', fontSize: '22px' }}>
                                    {/* <h2>   */}
                                    <IoPeopleOutline style={{ marginBottom: '2px', marginRight: '5px' }} /> {space.capacitySpace}
                                  </h2>
                                </Col>
                              </Row>
                              {/* <Row>
                                <Col md = {11}>
                                  </Col>
                                <Col md  = {1}>
                                </Col>
                               </Row> */}
                              <Row>
                                <Col>
                                  <Badge color="teal" size='lg' style={{ fontSize: '11px' }}>{space.typeSpace}</Badge>
                                </Col>
                              </Row>
                            </div>
                          </Card.Section>
                          <Divider margins="xs" label="Precios del espacio" labelPosition="center" />
                          <Card.Section style={{ marginBottom: '5px' }}>
                            <Group position="apart">
                              <div>
                                <Title order={6}>Por hora</Title>
                                <Text>${(space.hourPrice + space.hourPrice * 15 / 100) / 1000}k</Text>
                              </div>
                              <div>
                                <Title order={6}>Por día</Title>
                                <Text>${(space.dayPrice + space.dayPrice * 15 / 100) / 1000}k</Text>
                              </div>
                              <div>
                                <Title order={6}>Por semana</Title>
                                <Text>${(space.weekPrice + space.weekPrice * 15 / 100) / 1000}k</Text>
                              </div>
                              <div>
                                <Title order={6}>Por mes</Title>
                                <Text>${(space.monthPrice + space.monthPrice * 15 / 100) / 1000000}M</Text>
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
                            <IsAvailable space={space} available={available} setopacity={setopacity} />
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
    </>
    // </Card >
  )
}

const IsAvailable = ({ space, available, setopacity }) => {
  if (available) {
    setopacity(1)
    return (
      <Row>
        <Col xs={9}>
          <Button color="pink" radius="lg">
            Reserva este espacio
          </Button>
        </Col>
        <Col xs={3}>
          <SearchValues space={space} />
        </Col>
      </Row>

    )
  } else {
    setopacity(0.6)
    return (
      <Col xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '19px', opacity: '1' }}>No esta disponible</p>
      </Col>
    )
  }
}

export default CardSearchBaseTest

