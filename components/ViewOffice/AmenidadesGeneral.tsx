import { FC } from "react"
import AmenidadSingle from "./AmenidadSingle"
import { Container, Row, Col } from 'react-bootstrap'
import style from './VIew.module.sass'

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
const AmenidadesGeneral: FC<{ office: Offices }> = (props) => {
	const AmenidadesGenerales: any = {
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
	
	const office: Offices = props.office
	const generalAmenities = office.generalAmenities
	let listAmenidades = []

	const AmenidadesOrganizadas: any = {}

	// for(let item in AmenidadesGenerales){
	// 	AmenidadesOrganizadas.item = AmenidadesGenerales[item].filter((amenidad: string) => {
	// 		return generalAmenities.includes(amenidad)
	// 	})
	// }

	for (const titleAmenidades in AmenidadesGenerales) {
		for (const amenidad of generalAmenities) {
			if (AmenidadesGenerales[titleAmenidades].includes(amenidad)) {
				listAmenidades.push(amenidad)
			}
		}
		AmenidadesOrganizadas[titleAmenidades] = listAmenidades
		listAmenidades = []
	}

	return (
		<Container >
			<div className={style.titleEnterAme}>
				<h1>Amenidades Generales</h1>
			</div>

			<Row style={{ marginLeft: '50px' }}>
				{Object.keys(AmenidadesOrganizadas).map((title) => {
					const amenidadGroup = AmenidadesOrganizadas[title]
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