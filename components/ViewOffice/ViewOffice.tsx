import { FC } from "react"
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import { Image } from 'primereact/image';
import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MdCoffeeMaker } from 'react-icons/md'
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


interface TestProps {
  office: any[]
}

const ViewOffice: FC<TestProps> = (props) => {
  let ImagesAll = []
  let ImagesIndi = {}

  const office = props.office
  const spaces = office.spaces
  // const images = spaces.imagesUrls
  console.log('office', office);

  console.log('allSpaces', spaces);


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


      ImagesAll.push(ImagesIndi)
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
  

  return (
    <div >
      <h1> {office.name}</h1>
      <ImageGallery 
        items={ImagesAll} 
        showIndex 
        showThumbnails = {false}
        showPlayButton = {false}
        showBullets/>
      <Container style={{ marginLeft: '50px' }}>
        <AboutViews office={office} />
      </Container>

      <div>
        <AmenidadesGeneral office={office} /> 
      </div>

      <div>
        <CardSpace office = {office}/>
      </div>
    </div>
  )
}

export default ViewOffice