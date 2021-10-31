import react from 'react'
import Cards from './BaseCards'
import { Col, Container, Row } from 'react-bootstrap';
import { Title } from '@mantine/core'
import meetingRoom from '../../Img/home/Business-Meeting.svg'
import office from '../../Img/home/officePersonalCopy.svg'
import coworking from '../../Img/home/coworkin.svg'
import React from 'react';
import Slider from 'react-slick';

const AllCards = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    }

    const info = [
        {
            'image': 'https://pbs.twimg.com/profile_images/1173974474703724549/_pZpgYz__400x400.jpg',
            'title': '3 Tips para encontrar el espacio de coworking perfecto',
            'text': 'En la actualidad existen numerosas opciones en el mercado, son tantas que muchas veces no sobemos por cuál decidirnos. Encontrar el espacio ideal, no es una tarea sencilla. Pero si hay ciertos factores que debemos evaluar y tomar en cuenta antes de decantarnos por un espacio de coworking. El precio, sus instalaciones o la localización, son algunos aspectos claves que debemos valorar para decir, ¡este coworking me va como anillo al dedo!',
            'link': 'https://cinkcoworking.es/tips-encontrar-coworking-perfecto/'
        },
        {
            'image': 'https://crec.cc/wp-content/uploads/2017/01/Logo_CREC_coworking_200x200.png',
            'title': 'Coworking y startups: Una fórmula de éxito',
            'text': 'Siempre pensamos en el coworking como solución para startups… ¿Pero sabemos qué son realmente? Según la Cámara de Comercio de España, una startup es una empresa de nueva creación que presenta grandes posibilidades de crecimiento y comercializa productos y servicios a través del uso de las tecnología de la información y la comunicación. Esta definición es clara y, a priori, no da pie a ninguna confusión',
            'link': 'https://crec.cc/coworking-startups-formula-exito/'
        },
        {
            'image': 'data:image/png;base64,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',
            'title': 'Claves para trabajar en un coworking en época de coronavirus',
            'text': 'Aunque no lo creas, trabajar en un espacio común con otro tipo de especialistas no es un hecho imposible a día de hoy. Este tipo de espacios velan por la seguridad de todos los que optan por esta forma de trabajo y la seguridad está garantizada. Entre otras cuestiones, encontramos cuatro puntos clave que te convencerán para trasladarte a un espacio de coworking: limpieza constante en los puestos de trabajo, espacios amplios para una distancia segura, trabajo en equipo y reducción de gastos.',
            'link': 'https://ecolaboralcoworking.com/coworking-en-covid/'
        },
        {
            'image': 'data:image/png;base64,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',
            'title': '9 razones por la que un coworking es perfecto',
            'text': 'El modelo coworking está enfocado en la colaboración, que permita el crecimiento de las empresas. Esta basada en principios de la economía colaborativa donde se comparten áreas y servicios comunes lo que permiten por un lado la formación de una comunidad y por otro la reducción de costos. Esta pensado en lograr que los individuos interactúen y logren hacer negocios. El coworking no es solamente espacios compartidos, es más una organización que fomenta el crecimiento de sus miembros en todos los ámbitos.',
            'link': 'https://trigalcoworking.com/coworking/9-razones-un-coworking-es-perfecto/'
        },
        {
            'image': '',
            'title': '',
            'text': '',
            'link': ''
        },
    ]

    return (
        <div className='my-3 p-5' style={{ backgroundColor: '#f6f8fb' }}>
            <div className="my-3">
                <Title className="mb-15">Multiples servicios para tu comodidad</Title>
            </div>
            <Slider {...settings} >
                {info.map((element) => {
                    return (
                        <Cards
                            key={element.link}
                            title={element.title}
                            text={element.text}
                            img={element.image}
                            link={element.link}
                        />
                    )
                })}
            </Slider>
        </div >
    )
}

export default AllCards