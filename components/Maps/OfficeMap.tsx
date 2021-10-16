import React, { FC, useEffect, useLayoutEffect, useRef } from 'react'

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

const OfficeMap: FC<{ office: Offices }> = (props) => {
    useEffect(() => {
        let map: google.maps.Map | google.maps.StreetViewPanorama | google.maps.InfoWindowOpenOptions | null | undefined
        const initMap = (): void => {
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 11.3,
            })

            const mark = new google.maps.Marker({
                position: { lat: props.office.address.geometry.location.lat, lng: props.office.address.geometry.location.lng },
                map,
                title: prooffice.name,
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

        }
        initMap()
        return () => {
            map = null
        }
    }, [])
    return (
        <div id="map" style={{ height: '90vh' }}>
        </div>
    )
}

export default OfficeMap
