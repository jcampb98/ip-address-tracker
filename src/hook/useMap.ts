import { useEffect, useRef } from "react";
import { initMap } from "../utils/initMap";
import { Map } from "mapbox-gl";
import { generateNewMarker } from "../utils/generateNewMarker";

interface Coordinates {
    longitude: number;
    latitude: number;
}

export const useMap = (container: React.RefObject<HTMLDivElement>, coord: Coordinates) => {
    const mapInstanceRef = useRef<Map | null>(null);

    useEffect(() => {
        if(container.current) {
            mapInstanceRef.current = initMap(container.current, [coord.longitude, coord.latitude]);
            
            // Ensure the map resizes after load
            setTimeout(() => {
                if(mapInstanceRef.current) {
                    mapInstanceRef.current.resize();
                }
            }, 500);
        }

        const mapInstance = mapInstanceRef.current;

        // Listener for map load events
        if(mapInstance) {
            mapInstance.on('load', () => {
                console.log("Map loaded successfully, adding marker...");
                generateNewMarker({
                    map: mapInstance,
                    latitude: coord.latitude,
                    longitude: coord.longitude
                });
            });
        }
        
        // Cleans up function to remove the map instance from when the component unmounts
        return () => {
            if(mapInstance) { 
                mapInstance.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [container, coord]);

    return mapInstanceRef.current;
};