import React, { FC, useState } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import ReactBnbGallery from 'react-bnb-gallery';

import AboutViews from "./AboutViews";
import AmenidadesGeneral from "./AmenidadesGeneral";
import CardSpace from "./CardSpace";
import style from './VIew.module.sass'
import OfficeMap from "../Maps/OfficeMap";

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

const ViewOffice: FC<{ office: Offices }> = (props) => {
	let photos: {
		photo: string,
		caption: string,
		subcaption: string,
	}[] = []
	const [isOpen, setIsOpen] = useState(false);

	const office = props.office
	const spaces = office.spaces

	spaces.map((space) => {
		space.imagesUrls.map((image) => {
			let photo: {
				photo: string,
				caption: string,
				subcaption: string,
			} = {
				photo: '',
				caption: '',
				subcaption: ''
			}

			photo['photo'] = image
			photo['caption'] = space.nameSpace
			photo['subcaption'] = space.typeSpace

			photos.push(photo)
		})
	})
	const changeOpenAndNumber = (number: number) => {
		setIsOpen(true)
	}

	return (
		<div className={style.ImagesCollage}>
			<Row >
				<Col xs={6} >
					<div className={style.ImageBig} onClick={() => (changeOpenAndNumber(0))}>
						<img src={photos[0]['photo']} alt="" className={style.ImageTest} />
					</div>
				</Col>

				<Col xs={6} style={{ paddingLeft: '0px' }}>
					<Row style={{ paddingLeft: '0px' }}>
						<Col xs={6} >
							<div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(1)}>
								<img src={photos[1]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
							</div>
						</Col>

						<Col xs={6} style={{ paddingLeft: '0px' }}>
							<div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(2)}>
								<img src={photos[2]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
							</div>
						</Col>

					</Row>

					<Row style={{ paddingLeft: '0px' }}>

						<Col xs={6} >
							<div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(3)}>
								<img src={photos[3]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
							</div>
						</Col>

						<Col xs={6} style={{ paddingLeft: '0px' }}>
							<div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(4)}>
								<img src={photos[0]['photo']} alt="" className={style.imagesSizeInvi} style={{ filter: 'brightness(30%)' }} />
								<p className={style.TextInside}>Hay {photos.length} images</p>
							</div>
							<div>
								<ReactBnbGallery
									show={isOpen}
									photos={photos}
									onClose={() => setIsOpen(false)}
									activePhotoIndex={0}
								/>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>

			<Container>
				<AboutViews office={office} />
			</Container>

			<div id='amenidades'>
				<AmenidadesGeneral office={office} />
			</div>
			<div id='spaces'>
				<CardSpace office={office} />
			</div>
			<div className={style.titleEnterAme} >
				<h1 id='BigMap'>Ubicacion</h1>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }} >
				<div style={{ width: '1350px' }}>
					<OfficeMap office={office} />
				</div>
			</div>

			<div>
			</div>
		</div>
	)
}

export default ViewOffice