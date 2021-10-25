import React, { FC, useEffect, useState } from "react";
import { Badge, Center, Divider, Group, Title, Text, Button, Card, Image, ThemeIcon, List, Spoiler, Container } from "@mantine/core"
import { Carousel as BCarousel } from 'react-bootstrap'
import { AiOutlineStar } from 'react-icons/ai'
import _ from "lodash";

import Amenidades from "./Amenidades";
import ImagesSlide from "./ImagesSlide";

import SpacesEmpty from '../../../../Img/register/spaces-empty.svg'

import style from './stepTwo.module.sass'
import Head from "next/head";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa";
import Slider from "react-slick";
import { useFormikContext } from "formik";

interface PreviewProps {
	spaces: any[],
	setSpaces: Function,
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

const Preview: FC<PreviewProps> = (props) => {
	if (props.spaces.length === 0) {
		return (
			<Center style={{ height: '100%' }}>
				<Image
					src={SpacesEmpty.src}
					width="90%"
					fit="cover"
					className="m-auto"
					caption={
						<Text component={Title} order={4} align="center" size="lg" transform="capitalize" weight="bold" className="m-auto w-3/5">
							Empieza a añadir tus espacios con el formulario de la
							derecha. Por favor verifica todos los campos antes de añadir cada espacio.
						</Text>
					} />
			</Center>
		)
	}

	const [actualSpace, setActualSpace] = useState<any>(props.spaces[0])
	const formikContext: any = useFormikContext()

	useEffect(() => {
		console.log(props.spaces)
	}, [props.spaces])

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
		beforeChange: (current: number, next: number) => setActualSpace(props.spaces[next])
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
			<Card
				withBorder radius="lg" shadow="lg"
				style={{ margin: '1rem' }} className="p-5 hover:no-underline">
				<Group direction="column" position="left">
					<div>
						<BCarousel>
							{actualSpace.spaceImages.map((image: any) => {
								return (
									<BCarousel.Item key={image} interval={5000}>
										<Image
											height="auto"
											width="80%"
											className="m-auto"
											src={image.objectURL}
											radius="lg"
											fit="contain" 
											/>
									</BCarousel.Item>
								)
							})}
						</BCarousel>
					</div>
					<div>
						<Group position="apart" className="my-0">
							<Title order={2} className="w-3/4">
								{formikContext.values.title}
							</Title>
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
									{formikContext.values.officeAmenities ? formikContext.values.officeAmenities.map((amenity: string) => {
										return (
											<List.Item key={amenity}>
												<Text>{amenity}</Text>
											</List.Item>
										)
									}) : null}
								</List>
							</Spoiler>
						</Group>
					</div>
				</Group>
				<div className="m-2 p-3">
					<Slider {...settings} >
						{props.spaces.map((element) => {
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
										<Group position="apart">
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
												{element.nameAmenities.map((amenity: string) => {
													return (
														<List.Item key={amenity}>
															<Text>{amenity}</Text>
														</List.Item>
													)
												})}
											</List>
										</Spoiler>
									</Container>
									<Container className="flex flex-row mt-3">
										<Button onClick={() => props.setSpaces(props.spaces.filter((space) => {
											if (space === actualSpace) {
												return false
											}
											return true
										}))} color="pink" className="m-auto">Eliminar espacio</Button>
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

export default Preview