import React, { FC, useEffect, useRef } from 'react'
import Script from 'next/script'

const NewOfficeMap: FC = (props) => {
    useEffect(() => {
        console.log(window)
        const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement,
            {
                center: { lat: 40.749933, lng: -73.98633 },
                zoom: 13,
                mapTypeControl: false,
            }
        )
        const card = document.getElementById("pac-card") as HTMLElement;
        const input = document.getElementById("pac-input") as HTMLInputElement;
        const biasInputElement = document.getElementById(
            "use-location-bias"
        ) as HTMLInputElement;
        const strictBoundsInputElement = document.getElementById(
            "use-strict-bounds"
        ) as HTMLInputElement;
        const options = {
            fields: ["htmlFormatted_address", "geometry", "name"],
            strictBounds: false,
            types: ["establishment"],
        };

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

        const autocomplete = new google.maps.places.Autocomplete(input, options);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds htmlFor the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);

        const infowindow: any = new google.maps.InfoWindow();
        const infowindowContent: any = document.getElementById(
            "infowindow-content"
        ) as HTMLElement;

        infowindow.setContent(infowindowContent);

        const marker = new google.maps.Marker({
            map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocomplete.addListener("place_changed", () => {
            infowindow.close();
            marker.setVisible(false);

            const place: any = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available htmlFor input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            infowindowContent.children["place-name"].textContent = place.name;
            infowindowContent.children["place-address"].textContent =
                place.htmlFormatted_address;
            infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id: any, types: any) {
            const radioButton = document.getElementById(id) as HTMLInputElement;

            radioButton.addEventListener("click", () => {
                autocomplete.setTypes(types);
                input.value = "";
            });
        }

        setupClickListener("changetype-all", []);
        setupClickListener("changetype-address", ["address"]);
        setupClickListener("changetype-establishment", ["establishment"]);
        setupClickListener("changetype-geocode", ["geocode"]);
        setupClickListener("changetype-cities", ["(cities)"]);
        setupClickListener("changetype-regions", ["(regions)"]);

        biasInputElement.addEventListener("change", () => {
            if (biasInputElement.checked) {
                autocomplete.bindTo("bounds", map);
            } else {
                // User wants to turn off location bias, so three things need to happen:
                // 1. Unbind from map
                // 2. Reset the bounds to whole world
                // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
                autocomplete.unbind("bounds");
                autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
                strictBoundsInputElement.checked = biasInputElement.checked;
            }

            input.value = "";
        });

        strictBoundsInputElement.addEventListener("change", () => {
            autocomplete.setOptions({
                strictBounds: strictBoundsInputElement.checked,
            });

            if (strictBoundsInputElement.checked) {
                biasInputElement.checked = strictBoundsInputElement.checked;
                autocomplete.bindTo("bounds", map);
            }

            input.value = "";
        });
    }, [])
    const containerRef: any = useRef()

    return (
        <div>
            <Script strategy="beforeInteractive" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANYOIziGbeDJiUhK10ZsgOv60IT2Et3tQ&libraries=places" />
            <Script strategy="beforeInteractive" src="https://polyfill.io/v3/polyfill.min.js?features=default" />

            <div className="pac-card" id="pac-card">
                <div>
                    <div id="title">Autocomplete search</div>
                    <div id="type-selector" className="pac-controls">
                        <input
                            type="radio"
                            name="type"
                            id="changetype-all"
                            checked
                            onChange={() => console.log("Ok")} />
                        <label htmlFor="changetype-all">All</label>

                        <input type="radio" name="type" id="changetype-establishment" />
                        <label htmlFor="changetype-establishment">establishment</label>

                        <input type="radio" name="type" id="changetype-address" />
                        <label htmlFor="changetype-address">address</label>

                        <input type="radio" name="type" id="changetype-geocode" />
                        <label htmlFor="changetype-geocode">geocode</label>

                        <input type="radio" name="type" id="changetype-cities" />
                        <label htmlFor="changetype-cities">(cities)</label>

                        <input type="radio" name="type" id="changetype-regions" />
                        <label htmlFor="changetype-regions">(regions)</label>
                    </div>
                    <br />
                    <div id="strict-bounds-selector" className="pac-controls">
                        <input type="checkbox" id="use-location-bias" value="" checked />
                        <label htmlFor="use-location-bias">Bias to map viewport</label>

                        <input type="checkbox" id="use-strict-bounds" value="" />
                        <label htmlFor="use-strict-bounds">Strict bounds</label>
                    </div>
                </div>
                <div id="pac-container">
                    <input id="pac-input" type="text" placeholder="Enter a location" />
                </div>
            </div>
            <div id="map" style={{ height: '100%' }}></div>
            <div id="infowindow-content">
                <span id="place-name" className="title"></span><br />
                <span id="place-address"></span>
            </div>
        </div>

    )
}

export default NewOfficeMap
