


import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmstbmRhZ3VsYSIsImEiOiJjbHp0dWg3OWwwZnl1Mm1zNXB1ZTl6aWhwIn0.joE5kHvA2AgDXYTlp03ABw'; // Replace with your Mapbox Access Token


const center = {
    lat: -3.745,
    lng: -38.523,
};

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [coordinates, setCoordinates] = useState(center);

    useEffect(() => {
        const mapInstance = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [center.lng, center.lat],
            zoom: 10
        });

        mapInstance.on('click', (event) => {
            const newCoords = {
                lat: event.lngLat.lat,
                lng: event.lngLat.lng,
            };
            setCoordinates(newCoords);
            console.log("Coordinates:", newCoords);
        });

        setMap(mapInstance);

        return () => mapInstance.remove(); // Clean up on unmount
    }, []);

    useEffect(() => {
        if (map) {
            const marker = new mapboxgl.Marker()
                .setLngLat([coordinates.lng, coordinates.lat])
                .addTo(map);

            // Remove the old marker when the coordinates change
            return () => marker.remove();
        }
    }, [coordinates, map]);

    return (
        <div ref={mapContainerRef} className={'h-96 w-full'} />
    );
};

export default MapComponent;
