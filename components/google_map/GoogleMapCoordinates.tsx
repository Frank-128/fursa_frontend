
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "400px",
    width: "100%",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const MapComponent = () => {
    const [coordinates, setCoordinates] = React.useState(center);

    const handleMapClick = (event) => {
        const { latLng } = event;
        const newCoords = {
            lat: latLng.lat(),
            lng: latLng.lng(),
        };
        setCoordinates(newCoords);
        console.log("Coordinates:", newCoords); // Or handle as needed
    };

    return (
        <LoadScript
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your API Key
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
            >
                <Marker position={coordinates} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
