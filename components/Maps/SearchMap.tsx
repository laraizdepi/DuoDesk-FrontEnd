import React, { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { Card, Container, Image, Text } from '@mantine/core'
import ReactDOMServer from 'react-dom/server'
import Script from 'next/script'
import { Carousel as BCarousel } from 'react-bootstrap'

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
        const pricesFunction = (price: number) => {
            let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
            const tier = Math.log10(Math.abs(price)) / 3 | 0;
            if (tier == 0) {
                return price
            }
            const suffix = SI_SYMBOL[tier]
            const scale = Math.pow(10, tier * 3);
            const scaled = price / scale;
            return scaled.toFixed(1) + suffix
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
                let images: string[] = []
                for (let space of office.spaces) {
                    for (let image of space.imagesUrls) {
                        images.push(image)
                    }
                }
                const url = office.spaces[0].imagesUrls[0].split('-', 2)
                const file = office.spaces[0].imagesUrls[0].substring(office.spaces[0].imagesUrls[0].indexOf(url[1]) + url[1].length + 1)
                const src = `http://localhost:5000/uploads/offices/${url[0]}/${url[1]}/${file}`
                const content = ReactDOMServer.renderToString(
                    <figure className="md:flex bg-green-500 p-8 md:p-0 flex-col rounded-xl">
                        <img className="pt-6 rounded-xl w-32 h-32 md:w-48 md:h-auto md:rounded-none mx-auto" src={src} alt="" width="384" height="512" />
                        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                            <blockquote>
                                <p className="text-lg font-semibold">
                                    {office.name}
                                </p>
                            </blockquote>
                            <hr className="w-1/2 m-auto"/>
                            <blockquote>
                                <p className="text-base font-medium  text-left">
                                    “{office.description}”
                                </p>
                            </blockquote>
                            <figcaption className="font-medium">
                                <div className="text-indigo">
                                    {office.host.firstName} {office.host.lastName}
                                </div>
                                <button className="text-xl mt-4 btn text-white bg-indigo hover:bg-teal">
                                    <a href={`/search/${office.id}`} target="_blank" className="hover:no-underline hover:text-white link:no-underline">¡Rentar ahora!</a>
                                </button>
                            </figcaption>
                        </div>
                    </figure>
                )

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
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
        </div>
    )
}

export default SearchMap
