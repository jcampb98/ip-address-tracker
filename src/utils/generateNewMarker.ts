import { Map, Marker } from "mapbox-gl";

interface MarkerProps {
    latitude: number;
    longitude: number;
    map: Map;
}

export const generateNewMarker =({ latitude, longitude, map }: MarkerProps) => {
    if(!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        console.warn("Invalid latitude or longitude: ", {latitude, longitude});
        return;
    }

    if(!map || !map.loaded()) {
        console.warn("Map instance is not fully loaded");
        return;
    }

    // Inline  SVG content
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/>
        </svg>
    `;

    // Creates a HTML Element for the marker
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.innerHTML = svgContent;
    markerElement.style.width = '32px';
    markerElement.style.height = '32px';
    markerElement.style.backgroundPosition = 'center';

    // Ensures that the marker element is visible
    markerElement.style.display = 'block';

    // Logs the marker element for debugging
    console.log("Marker element: ", markerElement);

    // Create the marker instance
    const marker = new Marker(markerElement).setLngLat([longitude, latitude]).addTo(map);

    console.log('Marker added to map:', marker);
};