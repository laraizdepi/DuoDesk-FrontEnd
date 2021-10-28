import { FC, useState } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import * as React from "react";
// Parts of page 
import AboutViews from "./AboutViews";
import AmenidadesGeneral from "./AmenidadesGeneral";
import CardSpace from "./CardSpace";
import style from './VIew.module.sass'
import ReactBnbGallery from 'react-bnb-gallery';
import Maps from './Maps'
import Schedule from './Schedule'
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
	let photos = []
	const [isOpen, setIsOpen] = useState(false);
	const [numberIma, setNumberIma] = useState(0)

	const office = props.office
	const spaces = office.spaces

	spaces.map((space) => {
		const images = space.imagesUrls
		const typeOfImages = space.typeSpace
		const [opacidad, setopacidad] = useState(0)

		images.map((image) => {
			let photo = {}
			const url = image.split('-', 2)
			const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
			const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`

			photo['photo'] = src
			photo['caption'] = typeOfImages
			photo['subcaption'] = typeOfImages

			photos.push(photo)
			photo = {}

		})
	})
	const changeOpenAndNumber = (number: number) => {
		setNumberIma(number)
		setIsOpen(true)
	}

	return (
		<div className={style.ImagesCollage}>
			<Row >
				<Col xs={6} >
					<div className={style.ImageBig} onClick={() => (changeOpenAndNumber(0))}>
						{/* <img src={'https://coworker.imgix.net/photos/colombia/bogota/selina-chapinero-cowork/main.jpg?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle'} alt="" className={style.ImageTest} /> */}
						{/* <img src={'https://a0.muscache.com/im/pictures/29440d04-fafe-447b-bf09-249573647c46.jpg?im_w=1200' } alt="" className={style.ImageTest} /> */}
						<img src={photos[0]['photo']} alt="" className={style.ImageTest} />
						{/* <img src={'https://a0.muscache.com/im/pictures/f58d0928-2b9b-459e-9633-f0d3cf0a5546.jpg?im_w=960'} alt="" className={style.ImageTest} /> */}
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
								<img src={photos[3]['photo']} alt="" className={style.imagesSizeInvi} style={{ filter: 'brightness(30%)' }} />
								<p className={style.TextInside}>Hay {photos.length} images</p>
							</div>
							<div>
								<ReactBnbGallery
									show={isOpen}
									photos={photos}
									onClose={() => setIsOpen(false)}
									activePhotoIndex={numberIma}
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
			<div className={style.titleEnterAme} id='BigMap'>
				<h1>Ubicacion</h1>
			</div>
			<div style = {{display : 'flex', justifyContent : 'center'}} >
			{/* <div> */}
				<div style={{ width: '1350px' }}>
					<OfficeMap office={office} />
				</div>
			</div>

			<div>
				{/* <Schedule office={office} /> */}
			</div>
		</div>
	)
}

export default ViewOffice