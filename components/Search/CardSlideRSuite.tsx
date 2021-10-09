import React from 'react';
import { Carousel } from 'rsuite';
import SlideRSuite from './SlideRsuite';
import style from './Search.module.sass'
import { Card } from "@mantine/core";

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
    "amenidadesGenerales": [
      "Cine",
      "Cerca a Airbnb",
      "parqueadero",
      "mascotas",
      "Wifi"
    ],
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
    "amenidadesGenerales": [
      "Cine",
      "Cerca a Airbnb",
      "parqueadero",
      "mascotas",
      "Wifi"
    ],
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
    "amenidadesGenerales": [
      "Cine",
      "Cerca a Airbnb",
      "parqueadero",
      "mascotas",
      "Wifi"
    ],
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
const CardSlideRSuite = () => {
  return (
    <div  onClick={() => console.log('you clicked the card')}>
      <div>
        <Carousel autoplay
          autoplayInterval={37000}
          className={style.Carousel}
          //  test position and button
          placement={'bottom'}
          shape='dot'
         as = {('div')}
        // onClick={() => console.log('Hello World')}
        >
          {offices.map((office) => {
            return (
              <div className={style.CarouselItem}>
                <SlideRSuite office={office} />
              </div >
            )
          })}
        </Carousel>
      </div>
    </div>
  )

}
export default CardSlideRSuite