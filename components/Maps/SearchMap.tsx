import React, { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { Card, Container, Image, Text } from '@mantine/core'
import ReactDOMServer from 'react-dom/server'
import Script from 'next/script'

const styles = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
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

const SearchMap: FC<{ offices: Offices[], city: string }> = (props) => {
    useEffect(() => {
        console.log('Props Offices Search Maps', props.offices)
        // let map: google.maps.Map | google.maps.StreetViewPanorama | google.maps.InfoWindowOpenOptions | null | undefined
        let map: any
        const infowindow = new google.maps.InfoWindow
        const initMap = (): void => {
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 11.3,
                styles
            })
            const places = new google.maps.places.PlacesService(map)

            if (props.city) {
                places.findPlaceFromQuery({
                    query: props.city,
                    fields: ['geometry']
                }, (results, status) => {
                    if (results && map) {
                        map.setCenter(results[0].geometry?.location)
                    }
                })
            }
            else {
                map.setCenter({ lat: props.offices[0].address.geometry.location.lat, lng: props.offices[0].address.geometry.location.lng })
            }


            for (let office of props.offices) {
                let images: string[] = []
                for (let space of office.spaces) {
                    for (let image of space.imagesUrls) {
                        images.push(image)
                    }
                }
                // const url = office.spaces[0].imagesUrls[0].split('-', 2)
                // const file = office.spaces[0].imagesUrls[0].substring(office.spaces[0].imagesUrls[0].indexOf(url[1]) + url[1].length + 1)
                const src = office.spaces[0].imagesUrls[0]
                const content = ReactDOMServer.renderToString(
                    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <img className="object-cover object-center w-full h-56" src={src} alt="avatar" />
                        <div className="flex items-center px-6 py-3 bg-gray-900">
                            <svg className="bi bi-arrow-down-circle w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                            </svg>
                            <h1 className="mx-3 text-lg font-semibold text-white">Sigue conociendo más..</h1>
                        </div>
                        <div className="px-6 py-4">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{office.name}</h1>
                            <div className="py-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{
                                __html: office.description
                            }}>
                            </div>
                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 11H10V13H14V11Z" /><path fillRule="evenodd" clipRule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" />
                                </svg>
                                <h1 className="px-2 text-sm">{office.spaces.length === 1
                                    ? `${office.spaces.length} espacio de trabajo`
                                    : `${office.spaces.length} espacios de trabajo`}</h1>
                            </div>
                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <svg className="bi bi-geo-alt w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                <h1 className="px-2 text-sm">{office.address.formatted_address}</h1>
                            </div>
                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <svg className="bi bi-person-workspace w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="#000" />
                                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" fill="#000" />
                                </svg>
                                <h1 className="px-2 text-sm">Oficina de {office.host.firstName} {office.host.lastName}</h1>
                            </div>
                        </div>
                        <div className="p-2 flex justify-end">
                            <button className="btn btn-primary bg-indigo border-indigo hover:bg-teal hover:border-teal text-white">
                                <a className="flex flex-row justify-between p-1 text-white hover:text-white hover:no-underline visited:text-white visited:no-underline"
                                    href={`/search/${office.id}`} target="_blank">
                                    ¡Quiero revisarla! &nbsp; &nbsp;
                                    <svg className="bi bi-arrow-right-square w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                    </svg>
                                </a>
                            </button>
                        </div>
                    </div>
                )

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
                    },
                })

                let open = false

                mark.addListener('click', (event: any) => {
                    open = !open
                    if (open) {
                        infowindow.setContent(content)
                        infowindow.open(map, mark)
                    }
                    else {
                        infowindow.close()
                    }
                })

                const card = document.getElementById(office.id)
                card?.addEventListener('mouseover', (event: any) => {
                    mark.setIcon({
                        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                        fillColor: "red",
                        fillOpacity: 0.6,
                        strokeWeight: 0,
                        rotation: 0,
                        scale: 2,
                        anchor: new google.maps.Point(15, 30),
                    })
                })
                card?.addEventListener('mouseleave', (event: any) => {
                    mark.setIcon({
                        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                        fillColor: "blue",
                        fillOpacity: 0.6,
                        strokeWeight: 0,
                        rotation: 0,
                        scale: 2,
                        anchor: new google.maps.Point(15, 30),
                    })
                })
            }
        }
        initMap()
        return () => {
            map = null
        }
    }, [props.offices])

    return (
        <div id="map" style={{ height: '90vh' }}>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
        </div>
    )
}

export default SearchMap
