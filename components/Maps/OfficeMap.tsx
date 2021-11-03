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

const OfficeMap: FC<{ office: Offices }> = (props) => {
    useEffect(() => {
        let map: google.maps.Map | google.maps.StreetViewPanorama | google.maps.InfoWindowOpenOptions | null | undefined
        const initMap = (): void => {
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: props.office.address.geometry.location.lat, lng: props.office.address.geometry.location.lng },
                zoom: 15,
                gestureHandling: 'greedy',
                styles
            })

            const mark = new google.maps.Marker({
                position: { lat: props.office.address.geometry.location.lat, lng: props.office.address.geometry.location.lng },
                map,
                title: props.office.name,
                icon: 'https://api.geoapify.com/v1/icon/?type=material&color=%23e64980&size=small&icon=free-breakfast&textSize=small&noShadow&apiKey=ad5268befa02405e96f3f275effe65f1'
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
