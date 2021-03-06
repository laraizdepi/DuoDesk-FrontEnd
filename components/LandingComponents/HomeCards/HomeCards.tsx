import Cards from './BaseCards'
import { Title } from '@mantine/core'
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

const AllCards = () => {
    const [mobile, setMobile] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth <= 800) {
			setMobile(true)
		}
		const handleResize = () => {
			if (window.innerWidth <= 800) {
				setMobile(true)
			}
			else {
				setMobile(false)
			}
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: mobile ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3500,
        pauseOnHover: false,
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
            'image': 'data:image/png;base64,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',
            'title': 'Nómadas digitales',
            'text': 'Según las predicciones de Pieter Levels, en el año 2035 habrá nueve mil millones de personas en la tierra de los que seis mil millones tendrán edad de trabajar, la mitad de éstos serán autónomos de los que un tercio – mil millones de personas – trabajarán en remoto, los llamados nómadas digitales.',
            'link': 'https://www.segurcoworking.com/nomadas-digitales/'
        },
        {
            'image': 'https://pbs.twimg.com/profile_images/1320687453871722501/rIFj6OVg_400x400.jpg',
            'title': 'Los espacios coworking como solución a las nuevas necesidades',
            'text': 'Trabajar desde un coworking destacan una serie de beneficios como; nuevas oportunidades laborales, el networking, vencerás el aislamiento de trabajar desde casa, o la productividad efectiva entre otros muchos beneficios',
            'link': 'https://www.welink.es/blog/espacios-coworking-solucion-nuevas-necesidades'
        },
    ]

    return (
        <div className='my-3 p-5' style={{ backgroundColor: '#f6f8fb' }}>
            <div className="my-3">
                <Title className="mb-15">¿Qué se está diciendo sobre el Coworking?</Title>
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