import { FC } from "react"
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

  const office = props.office
  const spaces = office.spaces
  // const images = spaces.imagesUrls
  console.log('office', office);

  console.log('allSpaces', spaces);

  const router = useRouter()
  console.log('Url', router.query);
  console.log('This is the path');

  // _onScreenChange(fullScreenElement);{
  //   console.debug('isFullScreen?', !!fullScreenElement);
  // }


  spaces.map((space) => {
    const images = space.imagesUrls
    console.log("imagesPerSpace", images);

    images.map((image) => {
      const url = image.split('-', 2)
      const file = image.substring(image.indexOf(url[1]) + url[1].length + 1)
      const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`

      console.log('imagesIndi', ImagesIndi);
      console.log('src', src);

      ImagesIndi["original"] = src
      ImagesIndi["thumbnail"] = src
      ImagesIndi["originalHeight"] = '200px'
      ImagesIndi["originalHeight"] = 200
      ImagesIndi["originalWidth"] = 200
      ImagesIndi["originalWidth"] = '200px'
      ImagesIndi["thumbnailHeight"] = 200
      ImagesIndi["thumbnailWidth"] = 200


      ImagesAll.push(ImagesIndi)
      console.log('All Images', ImagesAll);
      console.log('All Images', ImagesAll);

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



  return (
    <div style={{ marginTop: '10px' }}>
      <Row style={{ marginLeft: '5px' }}>
        <Col xs={6} onClick={() => { console.log('Hello World') }}>
          <div style={{ height: '100%', width: '100%', maxHeight: '' }} onClick={() => { console.log('Hello World') }}>
            <img src={toSrc(img1)} alt="" />
          </div>
        </Col>

        <Col xs={6}>
          <Row>
            <Col xs={6} >
              <div className={style.imagesMainMediun}>
                <img src={toSrc(img2)} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
              </div>
            </Col>
            <Col xs={6}>
              <div className={style.imagesMainMediun}>
                <img src={toSrc(img3)} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className={style.imagesMainMediun}>
                <img src={toSrc(img4)} alt="" className={style.imagesSizeInvi} onClick={() => { console.log('Hello World') }} />

              </div>
            </Col>
            <Col xs={6}>
              <div className={style.imagesMainMediun}>
                <ImageGallery
                  items={ImagesAll}
                  showIndex
                  showThumbnails={false}
                  showPlayButton={false}
                  // originalHeight = {'220px'}
                  showBullets />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container >
        <AboutViews office={office} />
      </Container>
      <div>
        <AmenidadesGeneral office={office} />
      </div>
      <div>
        <CardSpace office={office} />
      </div>
      {/* <div >
        <h1 className={style.titleAbout}>
          Ubicacion de la oficina
        </h1>
        <OfficeMap office={office} />
      </div> */}

    </div>
  )
}

export default ViewOffice