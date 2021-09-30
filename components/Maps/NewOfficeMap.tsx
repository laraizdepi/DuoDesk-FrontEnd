import React, { FC, useState, useEffect } from 'react'
import { Input } from '@mantine/core'
import { GrMapLocation } from 'react-icons/gr'

import Script from 'next/script'
import Styles from './newOfficeMap.module.scss'
import { Field } from 'formik'

const NewOfficeMap: FC = () => {
    const [direction, setDirection] = useState<any>()

    useEffect(() => {
        const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                center: { lat: 40.749933, lng: -73.98633 },
                zoom: 13,
                mapTypeControl: true,
            }
        )

        const card = document.getElementById(Styles.pacCard)
        const input = document.getElementById(Styles.pacInput) as HTMLInputElement
        const options = {
            fields: ["ALL"],
            strictBounds: false,
            types: ["geocode", "establishment"],
        }

        map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById(Styles.pacCard))
        const autocomplete = new google.maps.places.Autocomplete(input, options)

        autocomplete.bindTo("bounds", map)

        const infowindow: any = new google.maps.InfoWindow()
        const infowindowContent: any = document.getElementById(Styles.infowindowContent) as HTMLElement
        infowindow.setContent(infowindowContent)

        const marker = new google.maps.Marker({ map, anchorPoint: new google.maps.Point(0, -29), })

        autocomplete.addListener("place_changed", () => {
            infowindow.close()
            marker.setVisible(false)
            const place: any = autocomplete.getPlace()
            if (!place.geometry || !place.geometry.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available htmlFor input: '" + place.name + "'")
                return
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport)
            }
            else {
                map.setCenter(place.geometry.location)
                map.setZoom(17)
            }

            console.log(place)
            setDirection(place)
            marker.setPosition(place.geometry.location)
            marker.setVisible(true)

            infowindowContent.children["place-name"].textContent = place.name
            infowindowContent.children["place-address"].textContent = place.htmlFormatted_address
            infowindow.open(map, marker)
        })
    }, [])

    return (
        <div>
            <Script async strategy="beforeInteractive" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANYOIziGbeDJiUhK10ZsgOv60IT2Et3tQ&libraries=places" />
            <Script async strategy="beforeInteractive" src="https://polyfill.io/v3/polyfill.min.js?features=default" />
            <div className={Styles.pacCard} id="pac-card">
                <div>
                    <div id={Styles.title}>Dirección de la oficina</div>
                    <br />
                </div>
                <div id={Styles.pacContainer}>
                    <Field id='firstName' name='direction' placeholder='Your Name'>
                        {({ field, form, meta }: any) => (
                            <Input 
                                value={field.value}
                                onChange={(event: any) => form.setFieldValue(field.name, event.target.value)}
                                onBlur={(event: any) => form.setFieldValue(field.name, event.target.value)}
                                id={Styles.pacInput} 
                                icon={<GrMapLocation />} 
                                placeholder="Introduce la dirección de tu oficina" 
                                radius="xl" 
                                size="xs" 
                                styles={{ icon: { marginLeft: '12px' } }} 
                            />
                        )}
                    </Field>
                </div>
            </div>
            <div id="map" style={{ height: '75vh' }}></div>
            <div id={Styles.infowindowContent}>
                <span id="place-name" className="title"></span>
                <span id="place-address"></span>
            </div>
        </div>
    )
}

export default NewOfficeMap
