import { useEffect, useState } from "react";
import { initMap } from "../utils/initMap";
import { Map } from "mapbox-gl";

interface Coordinates {
    longitude: number;
    latitude: number;
}

export const useMap = (container: React.RefObject<HTMLDivElement>, coord: Coordinates) => {
    const [mapInstance, setMapInstance] = useState<Map | null>(null);

    useEffect(() => {
        if(container.current) {
            const map = initMap(container.current, [coord.longitude, coord.latitude]);
            setMapInstance(map);

            // Ensure the map resizes after load
            setTimeout(() => {
                if(map) {
                    map.resize();
                }
            }, 500);
        }
        
        // Cleans up function to remove the map instance from when the component unmounts
        return () => {
            if(mapInstance) { 
                mapInstance.remove();
                setMapInstance(null);
            }
        };
    }, [container, coord.longitude, coord.latitude, mapInstance]);

    return mapInstance;
};