import React, { useState, FC } from "react";
import { Carousel } from "primereact/carousel";
import ImagesSlide from "./ImagesSlide";
import { Badge, Divider, Group } from "@mantine/core"
import Amenidades from "./Amenidades";
import style from './stepTwo.module.sass'
import { Row, Col } from 'react-bootstrap'


const PreviewTwo: FC = () => {
	const [products, setProducts] = useState([]);

	const productTemplate = (product: any) => {
		return (
			<div>
				<div style={{ padding: '30px' }}>
					<div>
						<ImagesSlide images={product.images} />
					</div>
					<div>
						<div className={style.InfoBasics}>
							<div>
								<Row style={{ marginBottom: '10px' }}>
									<Col xs={7}>
										<p className={style.TitleBasics}>{product.title}</p>
									</Col>
									<Col xs={5}>
										<Badge
											color="pink"
											variant="filled"
											size="md"
											radius='md'
											className={style.Badge}>
											{product.type}
										</Badge>
									</Col>
								</Row>
							</div>
							<p>Capacidad: {product.cantidadPersonas} personas</p>
							<p>Cantidad: {product.quantity} espacios</p>
						</div>
						<div className={style.Prices}>
							<Divider margins="xs" label="Precios" labelPosition="center" />
							<p className={style.PricesTitle}>Precios</p>

							<Group position="center">

								<div className={style.PriceUnid} >
									<h5>Por Hora</h5>
									<p>${(product.prices.priceHour)}</p>
								</div>

								<Divider orientation="vertical" margins="sm" />

								<div className={style.PriceUnid} >
									<h5>Por Dia</h5>
									<p>${(product.prices.priceDay)}</p>
								</div>

								<Divider orientation="vertical" margins="sm" />

								<div className={style.PriceUnid} >
									<h5>Por Semana</h5>
									<p>${(product.prices.priceWeek)}</p>
								</div>

								<Divider orientation="vertical" margins="sm" />

								<div className={style.PriceUnid} >
									<h5>Por Mes</h5>
									<p>${(product.prices.priceMoth)}</p>
								</div>
							</Group>
						</div>
						<div style={{ marginTop: "20px" }}>
							<Amenidades AmenidadesL={product.amenidades} />
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={style.carouselDemo}>
			<div className="card">
				<Carousel
					value={products}
					numVisible={1}
					numScroll={1}
					itemTemplate={productTemplate}
					circular
					autoplayInterval={15000}
				/>
			</div>
		</div>
	);
};

export default PreviewTwo