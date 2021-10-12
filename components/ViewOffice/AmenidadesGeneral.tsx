import { FC } from "react"
import Amenidad from "./AmenidadSingle"
import AiFillHeart from 'react-icons/ai'
import AmenidadSingle from "./AmenidadSingle"
import { Container, Row, Col } from 'react-bootstrap'
import { MdCoffeeMaker } from 'react-icons/md'
import style from './VIew.module.sass'

interface AmenidadesProps {
  office: any[]
}
const AmenidadesGeneral: FC<AmenidadesProps> = (props) => {
  const AmenidadesGen = {
    'Clasicas': [
      'Acceso a internet',
      'Protocolos de Bioseguridad',
      'Parqueadero para carros',
      'Parqueadero para motocicletas',
      'Parqueadero para bicicletas',
      'Parqueadero para carros gratis',
      'Parqueadero para motocicletas gratis',
      'Parqueadero para bicicletas gratis',
      'Recepción',
      'Elevador',
      'Buena iluminación'
    ],
    'Tecnología/Conectividad': [
      'Impresora',
      'Proyector',
      'Proyector',
      'Aire Acondicionado',
      'Fotocopiadora',
      'Escaner',
      'Cargadores',
      'Bancos de carga'
    ],
    'Alimentación': [
      'Refrigerador',
      'Cafe Gratis',
      'Té Gratis',
      'Snacks Gratis',
      'Venta de Cafe',
      'Alchol Permitido',
      'Restaurante',
      'Bar/Venta de alcohol disponible',
      'Cocina',
      'Servicio de cafetería'
    ],
    'Diversión/Ocio': [
      'Zona de recreación',
      'Gimnasio',
      'Espacio de Yoga',
      'Espacio de meditación',
      'Zona arcade',
      'Juegos de mesa',
      'Libreria',
      'Masajes',
      'Lugar para fumar'
    ],
    'Zonas': [
      'Cabinas telefonicas',
      'Espacio para mascotas',
      'Espacio para maternidad',
      'Espacios al aire libre',
      'Sala de estar',
      'Lugares para dormir',
      'Espacio para llamada',
      'Espacios / Zonas verdes',
      'Casillero personal',
      'Terraza',
      'Zonas verdes'
    ],
    'Ubicación': [
      'Lugares de AirBnB cercanos',
      'Estacion de transporte cerca',
      'Vista al mar',
      'Cerca al Centro Comercial',
      'Cerca al Aeropuerto',
      'Cerca al Centro',
      'Cerca a zonas verdes',
      'Cerca a restaurantes',
      'Cerca a estacion de policias'
    ],
    'Servicios': [
      'Servicio de limpieza',
      'Primeros Auxilios',
      'Servicio de correo',
      'Tablero acrilico con marcadores',
      'Tablero de notas/noticias',
      'Servicio 24 horas',
      'Sillas tipo Puff',
      'Sillas ergonómicas',
      'Servicio días festivos',
      'Servicio todos los días',
      'Permite Mascotas',
      'Seguridad Privada',
      'Duchas']
  }
  const AmenidadesOrgani = {}

  const office: any = props.office
  const generalAmenities = office.generalAmenities
  let listAmenidades = []
  for (const titleAmenidades in AmenidadesGen) {
    for (const amenidad of generalAmenities) {
      if (AmenidadesGen[titleAmenidades].includes(amenidad)) {
        listAmenidades.push(amenidad)
      }
    }
    AmenidadesOrgani[titleAmenidades] = listAmenidades
    listAmenidades = []

  }
  console.log('Asi queda organizado', AmenidadesOrgani);

  return (
    <Container style={{ marginLeft: '50px' }}>

      <div className={style.titleEnterAme}>
        {/* <MdCoffeeMaker /> */}
        <h1>Amenidades Generales</h1>
      </div>

      <Row>
        {Object.keys(AmenidadesOrgani).map((title) => {
          console.log('return amenidad', title);
          const amenidadGroup = AmenidadesOrgani[title]
          return (
            <Col xs={12} md={4}>
              <AmenidadSingle title={title} amenidadGroup={amenidadGroup} />
            </Col>
          )
        })}
      </Row>

    </Container>
  )
}

export default AmenidadesGeneral