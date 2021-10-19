import { FC } from "react"
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import { Image } from 'primereact/image';
import * as React from "react";
import { useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MdCoffeeMaker } from 'react-icons/md'
import testImagesCarousel from './testImagesCarousel'
// Parts of page 
import AboutViews from "./AboutViews";
import ImageGallery from 'react-image-gallery';
import AmenidadesGeneral from "./AmenidadesGeneral";
import CardSpace from "./CardSpace";
import style from './VIew.module.sass'
const imagesT = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/1000/600/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];


interface srcRowProps {
  office: any[]
}

const ViewOffice: FC<srcRowProps> = (props) => {
  let ImagesAll = []
  let ImagesIndi = {}

  const office = props.office
  const spaces = office.spaces
  // const images = spaces.imagesUrls
  console.log('office', office);

  console.log('allSpaces', spaces);

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
      ImagesIndi["originalWidth"] = '200px'
      ImagesIndi["thumbnailHeight"] = 200
      ImagesIndi["thumbnailWidth"] = 200


      ImagesAll.push(ImagesIndi)
      console.log('All Images', ImagesAll);
      console.log('All Images', ImagesAll);

      ImagesIndi = {}

    })
  })
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 2
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger"
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera"
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      cols: 2
    }
  ];

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
    <div >
      <h1> {office.name}</h1>
      <Row>
        <Col xs={6} onClick = {() =>{console.log('Hello World')}}>
          <div style={{ height: '100%', width: '100%', maxHeight: '' }} onClick = {() =>{console.log('Hello World')}}>
            <img src={toSrc(img1)} alt="" />
          </div>
        </Col>

        <Col xs={6}>
          <Row>
            <Col xs={6} >
              <div className = {style.imagesMainMediun}>
                <img src={toSrc(img2)} alt="" className ={style.imagesSizeInvi} onClick = {() =>{console.log('Hello World')}}/>
              </div>
            </Col>
            <Col xs={6}>
              <div className = {style.imagesMainMediun}>
                <img src={toSrc(img3)} alt="" className ={style.imagesSizeInvi} onClick = {() =>{console.log('Hello World')}}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className = {style.imagesMainMediun}>
                <img src={toSrc(img4)} alt="" className ={style.imagesSizeInvi} onClick = {() =>{console.log('Hello World')}}/>
 
              </div>
            </Col>
            <Col xs={6}>
              <div className = {style.imagesMainMediun}>
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
    </div>
  )
}

export default ViewOffice