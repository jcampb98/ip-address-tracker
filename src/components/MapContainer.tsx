import { useEffect, useRef, useState } from "react";
import { useMap } from "../hook/useMap";
import "../styles/Map.css";
import { generateNewMarker } from "../utils/generateNewMarker";

interface Coordinates {
    longitude: number;
    latitude: number;
}

interface MapContainerProps {
    longitude: number;
    latitude: number;
}

const MapContainer: React.FC<MapContainerProps> = ({longitude, latitude}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [coord, setCoord] = useState<Coordinates>({ longitude, latitude });

    useEffect(() => {
        setCoord({ longitude, latitude });
    }, [longitude, latitude]);

    const map = useMap(mapRef, coord);

    useEffect(() => {
        if(map && map.loaded()) {
            console.log('Adding marker to map:', map);
            generateNewMarker({ latitude, longitude, map });
        }
        else {
            console.warn("Map has not loaded yet or invalid map instance");
        }
    }, [map, longitude, latitude]);
    
    return <div ref={mapRef} className="map-view" />
};

export default MapContainer;