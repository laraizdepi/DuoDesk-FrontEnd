import React, { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { Card, Text } from '@mantine/core'
import ReactDOMServer from 'react-dom/server'
import Script from 'next/script'

const styles = [
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ff0000"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#9b30f2"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7620bd"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#c4c6f4"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#d3d4f3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#000000"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eeeeff"
            },
            {
                "visibility": "on"
            }
        ]
    }
]

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

const SearchMap: FC<{ onlyOffices: Offices[], city: string }> = (props) => {
    useEffect(() => {
        const types = {
            "Oficina privada": "Estos espacios privados pueden tomar la forma de una oficina o incluso suites personalizadas diseñadas específicamente para equipos grandes. Los miembros de una empresa comparten la habitación dedicada o la combinación de áreas alquiladas o alquiladas por la empresa.", 
            "Escritorio personal": "Para un espacio más permanente, puede alquilar un escritorio personal o una cantidad de escritorios fijos para usted y su equipo. Esto significa que puede dejar su equipo en el trabajo durante la noche y personalizar el escritorio como desee. Normalmente, compartirá la habitación con otras empresas, lo que es ideal para establecer contactos y compartir conocimientos. Puede obtener un escritorio fijo para usted o para un equipo más grande, ideal si su negocio está creciendo, ya que es fácil alquilar más escritorios en el mismo espacio.", 
            "Sala de conferencias": "Los espacios de coworking suelen ser más asequibles y más modernos que el centro de conferencias tradicional. Los anfitriones de eventos que buscan un lugar más pequeño, o uno que esté más alineado con su audiencia, se sienten atraídos por las características únicas de los espacios de trabajo flexibles, además de sus precios accesibles y su personal amigable.", 
            "Espacio abierto": "Atendiendo a la distribución, podemos encontrar los conocidos como centros de coworking abiertos. Su característica principal se encuentra en que la totalidad de la zona de trabajo es de uso común. De esta manera, cualquier coworker podrá acceder a cualquier parte del área de trabajo."
        }
        let map: google.maps.Map | google.maps.StreetViewPanorama | google.maps.InfoWindowOpenOptions | null | undefined
        const initMap = (): void => {
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 11.3,
                styles
            })
            const places = new google.maps.places.PlacesService(map)

            places.findPlaceFromQuery({
                query: props.city,
                fields: ['geometry']
            }, (results, status) => {
                if (results && map) {
                    map.setCenter(results[0].geometry?.location)
                }
            })

            for (let office of props.onlyOffices) {
                let spaces: string[] = []
                for (let space of office.spaces) {
                    if (!spaces.includes(space.typeSpace)) {
                        spaces.push(space.typeSpace)
                    }
                }
                console.log(spaces)
                const url = office.spaces[0].imagesUrls[0].split('-', 2)
                const file = office.spaces[0].imagesUrls[0].substring(office.spaces[0].imagesUrls[0].indexOf(url[1]) + url[1].length + 1)
                const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`
                const content = `
                <div class="card m-2 rounded-md" style="width: 18rem;">
                    <img src=${src} />
                    <div class="card-body p-3">
                        <h1 class="my-1">${office.name}</h1>
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            ${spaces.map((element) => {
                                return(
                                    `<div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=${`#${element}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                            ${element}
                                        </button>
                                        </h2>
                                        <div id=${element} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                ${types[element]}
                                            </div>
                                        </div>
                                    </div>`
                                )
                            })}
                        </div>
                        <div class="flex justify-end my-1">
                            <button class="btn btn-primary">
                                <a href=${`/search/${office.id}`}>
                                    Revisar oficina
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                `

                console.log(office.description)

                const mark = new google.maps.Marker({
                    position: { lat: office.address.geometry.location.lat, lng: office.address.geometry.location.lng },
                    map,
                    title: office.name,
                    icon: {
                        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                        fillColor: "blue",
                        fillOpacity: 0.6,
                        strokeWeight: 0,
                        rotation: 0,
                        scale: 2,
                        anchor: new google.maps.Point(15, 30),
                    }
                })

                const infowindow = new google.maps.InfoWindow({ content: content })
                mark.addListener('click', (event: any) => {
                    infowindow.open(map, mark)
                })
                // mark.addListener('clickoutside', () => { infowindow.close() })
            }
        }
        initMap()
        return () => {
            map = null
        }
    }, [props.onlyOffices])

    return (
        <div id="map" style={{ height: '90vh' }}>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"/>
        </div>
    )
}

export default SearchMap
