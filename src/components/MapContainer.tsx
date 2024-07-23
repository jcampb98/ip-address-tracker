import { useEffect, useRef, useState } from "react";
import { useMap } from "../hook/useMap";
import "../styles/Map.css";

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

    useMap(mapRef, coord);
    
    return <div ref={mapRef} className="map-view" />
};

export default MapContainer;