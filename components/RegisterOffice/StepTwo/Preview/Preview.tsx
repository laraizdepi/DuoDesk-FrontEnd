import React, { FC, useEffect } from "react";
import { Badge, Center, Divider, Group, Title, Text, Button, Card, Image } from "@mantine/core"
import { Carousel } from "primereact/carousel";
import _ from "lodash";

import Amenidades from "./Amenidades";
import ImagesSlide from "./ImagesSlide";

import SpacesEmpty from '../../../../Img/register/spaces-empty.svg'

import style from './stepTwo.module.sass'

interface PreviewProps {
	spaces: any[],
	setSpaces: Function,
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

	useEffect(() => {
		console.log(props.spaces)
	}, [props.spaces])

	const colors = ["teal", "indigo", "pink"]

	const spaceTemplate = (space: any) => {
		let color;
		if (space.typeSpace === "Oficina privada") {
			color = "teal"
		}
		else if (space.typeSpace === "Escritorio personal") {
			color = "pink"
		}
		else if (space.typeSpace === "Sala de conferencias") {
			color = "indigo"
		}
		else {
			color = "teal"
		}

		return (
			<Card>
				<div style={{ padding: '30px' }}>
					<div>
						<ImagesSlide images={space.spaceImages} />
					</div>
					<div>
						<div className={style.InfoBasics}>
							<div>
								<Group position="apart" style={{ marginBottom: '10px' }}>
									<p className={style.TitleBasics}>{space.nameSpace}</p>
									<Badge
										color={color}
										variant="filled"
										size="md"
										radius='md'
										className={style.Badge}
									>
										{space.typeSpace}
									</Badge>
								</Group>
							</div>
							<p>Capacidad: {space.capacitySpace} personas</p>
							<p>Cantidad: {space.availableSpace} espacios</p>
						</div>
						<div className={style.Prices}>
							<Divider margins="xs" label="Precios" labelPosition="center" />
							<Title order={3} className={style.PricesTitle}>Precios</Title>

							<Group position="left" noWrap spacing="xs">
								<div>
									<Title order={5}>Por Hora</Title>
									<Text>${(space.hourPrice)}</Text>
								</div>

								<Divider orientation="vertical" margins="xs" />
								<div>
									<Title order={5}>Por Dia</Title>
									<Text>${(space.dayPrice)}</Text>
								</div>

								<Divider orientation="vertical" margins="xs" />
								<div>
									<Title order={6}>Por Semana</Title>
									<Text>${(space.weekPrice)}</Text>
								</div>
								<Divider orientation="vertical" margins="xs" />
								<div>
									<Title order={5}>Por Mes</Title>
									<Text>${(space.monthPrice)}</Text>
								</div>
							</Group>
						</div>
						<div style={{ marginTop: "20px" }}>
							<Amenidades color={color} AmenidadesL={space.nameAmenities} />
						</div>
					</div>
				</div>
				<Center>
					<Button color="red" onClick={() => {
						props.setSpaces(props.spaces.filter((value: any) => {
							return !_.isEqual(value, space)
						}))
					}}>Eliminar espacio</Button>
				</Center>
			</Card>
		);
	};

	return (
		<div>
			<div className="card">
				<Carousel
					value={props.spaces}
					numVisible={1}
					numScroll={1}
					itemTemplate={spaceTemplate}
					circular={props.spaces.length > 1 ? true : false}
					autoplayInterval={15000}
				/>
			</div>
		</div>
	);
}

export default Preview