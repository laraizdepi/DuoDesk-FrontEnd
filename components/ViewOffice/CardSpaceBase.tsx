import React, { FC, useState } from 'react'
import { Badge, Card, Divider, Group, Text, Title, ThemeIcon, Spoiler } from '@mantine/core'
import { AiOutlineStar } from 'react-icons/ai'
import { Carousel as BCarousel } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'
import { Button } from '@mantine/core'
import SearchValues from './SearchValues'
import { IoPeopleOutline } from 'react-icons/io5'


interface CardSearchBaseTestProps {
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
		isActive: boolean,
		booking?: any
	}[]
	available?: boolean
}

const CardSearchBaseTest: FC<CardSearchBaseTestProps> = (props) => {
	const spaces = props.spaces
	const [opacity, setopacity] = useState(1)
	return (
		<div>
			<Group direction="column" position="center">
				<Card.Section>
					<div>
						{spaces.map((space) => {
							return (
								<div>
									<Card withBorder shadow="sm" radius="lg" style={{ margin: '0rem', height: '100%', opacity: opacity }}>
										<Row style={{ marginBottom: '10px' }}>
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
											<Col xs={12} md={6}>
												<Card key={space.nameSpace} withBorder shadow="lg" radius="xl" style={{ padding: '2rem 3rem' }}>
													<Card.Section>
														<div >
															<Row>
																<Col md={10}>

																	<Title order={5} style={{ fontSize: '25px' }}>{space.nameSpace}</Title>
																</Col>
																<Col md={2}>
																	<h2 style={{ display: 'flex', alignItems: 'center', fontSize: '22px' }}>
																		<IoPeopleOutline style={{ marginBottom: '2px', marginRight: '5px' }} /> {space.capacitySpace}
																	</h2>
																</Col>
															</Row>
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
																		)
																	})}
																</Row>
															</div>
														</Spoiler>
														<IsAvailable space={space} setopacity={setopacity} />
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
		</div>
	)
}

interface isAvailableProps {
	space: {
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
		isActive: boolean,
		booking?: any
	},
	setopacity: (opacity: number) => unknown
}

const IsAvailable: FC<isAvailableProps> = (props) => {
	if (props.space.isActive) {
		props.setopacity(1)
		return (
			<Row>
				<Col xs={9}>
					<Button color="pink" radius="lg">
						Reserva este espacio
					</Button>
				</Col>
				<Col xs={3}>
					<SearchValues space={props.space} />
				</Col>
			</Row>

		)
	} else {
		props.setopacity(0.6)
		return (
			<Col xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<p style={{ fontSize: '19px', opacity: '1' }}>No esta disponible</p>
			</Col>
		)
	}
}

export default CardSearchBaseTest

