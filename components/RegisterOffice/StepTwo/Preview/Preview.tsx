import React, { FC, useEffect } from "react";
import { Badge, Center, Divider, Group, Title } from "@mantine/core"
import { Carousel } from "primereact/carousel";
import { Row, Col } from 'react-bootstrap'

import Amenidades from "./Amenidades";
import ImagesSlide from "./ImagesSlide";

import style from './stepTwo.module.sass'

interface PreviewProps{
	spaces: any[]
}

const Preview: FC<PreviewProps> = (props) => {
	if(props.spaces.length === 0){
		return(
			<Center style={{height: '100%'}}>
				<Title order={2}>Empieza a añadir tus espacios</Title>
			</Center>
		)
	}

	useEffect(() => {
		console.log(props.spaces)
	})

	const spaceTemplate = (space: any) => {
		return (
			<div>
				<div style={{ padding: '30px' }}>
					<div>
						<ImagesSlide images={space.spaceImages} />
					</div>
					<div>
						<div className={style.InfoBasics}>
							<div>
								<Row style={{ marginBottom: '10px' }}>
									<Col xs={7}>
										<p className={style.TitleBasics}>{space.nameSpace}</p>
									</Col>
									<Col xs={5}>
										<Badge
											color="pink"
											variant="filled"
											size="md"
											radius='md'
											className={style.Badge}
										>
											{space.typeSpace}
										</Badge>
									</Col>
								</Row>
							</div>
							<p>Capacidad: {space.capacitySpace} personas</p>
							<p>Cantidad: {space.availableSpace} espacios</p>
						</div>
						<div className={style.Prices}>
							<Divider margins="xs" label="Precios" labelPosition="center" />
							<p className={style.PricesTitle}>Precios</p>

							<Group position="center">
								<div className={style.PriceUnid} >
									<h5>Por Hora</h5>
									<p>${(space.hourPrice)}</p>
								</div>

								<Divider orientation="vertical" margins="sm" />
								<div className={style.PriceUnid} >
									<h5>Por Dia</h5>
									<p>${(space.dayPrice)}</p>
								</div>

								<Divider orientation="vertical" margins="sm" />
								<div className={style.PriceUnid} >
									<h5>Por Semana</h5>
									<p>${(space.weekPrice)}</p>
								</div>

								<Divider orientation="vertical" margins="sm" />
								<div className={style.PriceUnid} >
									<h5>Por Mes</h5>
									<p>${(space.monthPrice)}</p>
								</div>
							</Group>
						</div>
						<div style={{ marginTop: "20px" }}>
							<Amenidades AmenidadesL={space.nameAmenities} />
						</div>
					</div>
				</div>
			</div>
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