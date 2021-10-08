

import React, { FC, useState } from "react";
import { Carousel } from "react-bootstrap";

interface imagesProps {
  images: any[]
}
const offices = [
  {
    "id": "1000",
    "title": "Escritorio Personal",
    "image": "https://distintaslatitudes.net/wp-content/uploads/2017/03/shridhar-gupta-dZxQn4VEv2M-unsplash.jpg",
    "description": "Whether you’re an established enterprise or a growing startup, discover flexible spaces and solutions to move your business forward.",
    "images": [
      {
        "main": true,
        "src": "https://www.petguide.com/wp-content/uploads/2018/07/funniest-dog-breeds-pug.jpg",
        "id": 1
      },
      {
        "main": false,
        "src": "https://coworker.imgix.net/photos/colombia/bogota/selina-chapinero-cowork/3.jpg?w=580&h=323&q=90&auto=format&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle",
        "id": 1
      },
      {
        "main": false,
        "src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
        "id": 1
      }
    ],
    "price": "4000",
    "prices": {
      "priceHour": 5000,
      "priceDay": 30000,
      "priceWeek": 200000,
      "priceMoth": 1500000
    },
    "type": "Escritorio Personal",
    "quantity": 5,
    "cantidadPersonas": 2,
    "direction": "Avenida 39 ## 92-78",
    "amenidades": [
      "Ascensor",
      "Playa",
      "parqueadero",
      "mascotas",
      "Wifi"
    ]
  },
  {
    "id": "1001",
    "title": "Escritorio para 2 personas",
    "description": "We offer private offices, individual workstations and meeting rooms for independent professionals, entrepreneurs and small business owners in a building with high specifications of infrastructure and security",
    "image": "https://revistaaxxis.com.co/wp-content/uploads/2019/12/coworking.jpg",
    "images": [
      {
        "main": true,
        "src": "https://distintaslatitudes.net/wp-content/uploads/2017/03/shridhar-gupta-dZxQn4VEv2M-unsplash.jpg",
        "id": 1
      },
      {
        "main": false,
        "src": "https://revistaaxxis.com.co/wp-content/uploads/2019/12/coworking.jpg",
        "id": 1
      },
      {
        "main": false,
        "src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
        "id": 1
      }
    ],
    "price": "5000",
    "prices": {
      "priceHour": 3800,
      "priceDay": 56000,
      "priceWeek": 680000,
      "priceMoth": 2300000
    },
    "type": "Oficina Privada",
    "quantity": 2,
    "cantidadPersonas": 4,
    "direction": "Calle 152 ## 92-32",
    "amenidades": [
      "Ascensor",
      "impresora",
      "parqueadero",
      "mascotas"
    ]
  },
  {
    "id": "1002",
    "title": "Sala de coferencias",
    "description": "Whether you’re an established enterprise or a growing startup, discover flexible spaces and solutions to move your business forward.",
    "image": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
    "images": [
      {
        "main": true,
        "src": "https://distintaslatitudes.net/wp-content/uploads/2017/03/shridhar-gupta-dZxQn4VEv2M-unsplash.jpg",
        "id": 1
      },
      {
        "main": false,
        "src": "https://revistaaxxis.com.co/wp-content/uploads/2019/12/coworking.jpg",
        "id": 1
      },
      {
        "main": false,
        "src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
        "id": 1
      }
    ],
    "price": "5500",
    "prices": {
      "priceHour": 7300,
      "priceDay": 76000,
      "priceWeek": 320000,
      "priceMoth": 1800000
    },
    "type": "Sala de reuniones",
    "quantity": 4,
    "cantidadPersonas": 5,
    "direction": "Ac. 53 ## 23-32",
    "amenidades": [
      "Cafe",
      "impresora",
      "parqueadero",
      "Wifi",
      "Yoga",
      "maternidad",
      "Estacionamiento para carros"
    ]
  }
]


const ImagesSlide: FC<imagesProps> = (props) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  const imagesAll: any = props.images
  // const imagesAll: any = offices[0].images
  // const {images} = props.images
  let indexN = 0
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} style={{ maxWidth: 350 , maxHeight: 220 }}>
        {imagesAll.map((image: any, index: number) => {
          // console.log(image.src);
          indexN ++
          return (
            <Carousel.Item key = {indexN}>
              <img
                className="d-block w-100"
                src={image.src}
                alt="First slide"
                // key = {indexN}
                // style={{ maxWidth: 350 , maxHeight: 230, minHeight: 230 }}
              />
            </Carousel.Item>
          )
        }
        )}
      </Carousel>
     </div>
    // <div>
    //   <Carousel>
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="holder.js/800x400?text=First slide&bg=373940"
    //         alt="First slide"
    //       />
    //       <Carousel.Caption>
    //         <h3>First slide label</h3>
    //         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="holder.js/800x400?text=Second slide&bg=282c34"
    //         alt="Second slide"
    //       />

    //       <Carousel.Caption>
    //         <h3>Second slide label</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src="holder.js/800x400?text=Third slide&bg=20232a"
    //         alt="Third slide"
    //       />

    //       <Carousel.Caption>
    //         <h3>Third slide label</h3>
    //         <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   </Carousel>
    // </div>
  )
}

export default ImagesSlide