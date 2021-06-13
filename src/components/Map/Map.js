import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const iconList = {
    icon1:
        "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png",
    icon2: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    icon3:
        "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png",
    icon4:
        "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/25/Map-Marker-Marker-Outside-Pink.png"
};

// const google = window.google;

const google = window.google = window.google ? window.google : {}

function Map() {

    const markers = [
        {
            id: 1,
            name: "Chicago, Illinois",
            details: "abd",
            position: { lat: 41.881832, lng: -87.623177 }
        },
        {
            id: 2,
            name: "Denver, Colorado",
            details: "abd",
            position: { lat: 39.739235, lng: -104.99025 }
        },
        {
            id: 3,
            name: "Los Angeles, California",
            details: "abd",
            position: { lat: 34.052235, lng: -118.243683 }
        },
        {
            id: 4,
            name: "New York, New York",
            details: "abd",
            position: { lat: 40.712776, lng: -74.005974 },
            icon: iconList.icon2
        }
    ];

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };


    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };



    return (
        <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "50vw", height: "50vh" }}
        >
            {markers.map(({ id, name, details, position, icon }) => (
                <Marker
                    key={id}
                    position={position}
                    icon={icon}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                {name} <br />
                                {details}
                            </div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default Map;