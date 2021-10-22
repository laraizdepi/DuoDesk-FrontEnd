import { FC, useState } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import * as React from "react";
// Parts of page 
import AboutViews from "./AboutViews";
import ImageGallery from 'react-image-gallery';
import AmenidadesGeneral from "./AmenidadesGeneral";
import CardSpace from "./CardSpace";
import style from './VIew.module.sass'
import { useRouter } from "next/dist/client/router"
import TabsSpace from './tabsSpace'
import OfficeMap from '../Maps/OfficeMap'
import ChangeDates from './ChangeDates'
import NavbarSection from './NavbarSection'
import NavbarSectionMateria from './NavbarSectionMateria'
import TestImages from './TestImages'
import ReactBnbGallery from 'react-bnb-gallery';

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
  let ImagesAll: any = []
  let ImagesIndi = {}
  let photos = []
  const [isOpen, setIsOpen] = useState(false);
  const [numberIma, setNumberIma] = useState(0)


  const office = props.office
  const spaces = office.spaces
  // const images = spaces.imagesUrls
  // console.log('office', office);

  // console.log('allSpaces', spaces);

  const router = useRouter()
  // console.log('Url', router.query);
  // console.log('This is the path');

  // _onScreenChange(fullScreenElement);{
  //   console.debug('isFullScreen?', !!fullScreenElement);
  // }

  spaces.map((space) => {
    const images = space.imagesUrls
    const typeOfImages = space.typeSpace
    // console.log("imagesPerSpace", images);

    images.map((image) => {
      let photo = {}
      const url = image.split('-', 2)
      const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
      const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`

      // console.log('imagesIndi', ImagesIndi);k=
      // console.log('src', src);

      ImagesIndi["original"] = src
      ImagesIndi["thumbnail"] = src
      ImagesIndi["originalTitle"] = 'Espacio Abierto'
      ImagesIndi["thumbnailTitle"] = 'Espacio luminoso'
      ImagesIndi["thumbnailLabel"] = 'Espacio Vista al mar'
      ImagesIndi["description"] = 'Oficina Privada'

      photo['photo'] = src
      photo['caption'] = typeOfImages
      photo['subcaption'] = typeOfImages

      // photos.push(src)
      photos.push(photo)

      ImagesAll.push(ImagesIndi)
      // console.log('All Images', ImagesAll);
      // console.log('All Images', ImagesAll);

      photo = {}  
      ImagesIndi = {}

    })
  })


  const img1 = spaces[0].imagesUrls[0]
  const img2 = spaces[0].imagesUrls[1]
  const img3 = spaces[0].imagesUrls[2]
  const img4 = spaces[0].imagesUrls[3]

  const toSrc = (srcRow: any) => {
    const url1 = srcRow.split('-', 2)
    const file1 = srcRow.substring(srcRow.indexOf(url1[1]) + url1[1].length + 1)
    const src1 = `http://localhost:5000/uploads/offices/${url1[0]}/${url1[1]}/${file1}`
    return (src1)
  }

  const changeOpenAndNumber = (number:number) =>{
    setNumberIma(number)
    setIsOpen(true)
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Row style={{ marginLeft: '5px' }}>
        <Col xs={6} onClick={() => { console.log('Hello World') }}>
          <div style={{ height: '100%', width: '100%', maxHeight: '' , cursor : 'pointer'}} onClick={() => (changeOpenAndNumber(0))}>
            <img src={toSrc(img1)} alt="" />
          </div>
        </Col>

        <Col xs={6}>
          <Row>
            <Col xs={6} >
              <div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(1)}>
                <img src={photos[1]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
              </div>
            </Col>
            <Col xs={6}>  
              <div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(2)}>
                <img src={photos[2]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(3)}>
                <img src={photos[3]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
              </div>
            </Col>
            <Col xs={6}>
              <div className={style.imagesMainMediun} onClick={() => changeOpenAndNumber(4)}>
                <img src={photos[4]['photo']} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
              </div>
              <div>
                <ReactBnbGallery
                  show={isOpen}
                  photos={photos}
                  onClose={() => setIsOpen(false)}
                  activePhotoIndex  = {numberIma}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Container>
        <NavbarSection/>
      </Container> */}
      <Container>
        <NavbarSectionMateria />
      </Container>
      <Container >
        <AboutViews office={office} />
      </Container>
      <div>
        <AmenidadesGeneral office={office} />
      </div>
      <div>
        <CardSpace office={office} />
      </div>
    </div>
  )
}

export default ViewOffice