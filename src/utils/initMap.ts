import mapboxgl from "mapbox-gl";
import { getEnviroments } from "./getEnviroments";

const { MAPBOX_API_KEY } = getEnviroments();

/**
 * 
 * @param container - the HTML element where the map will be rendered 
 * @param coords  - coordinates of the place they have to be of type array of two numbers, 
 * first is longitude and second is latitude and the second position is the latitude and the longitude
 * @returns the instance to make more events and actions, in the case that you only need to show the map and it won't be necessary to return anything.
 */
export const initMap = (container: HTMLDivElement, coords: [number, number]): mapboxgl.Map => {
    return new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        center: coords,
        zoom: 9,
        accessToken: MAPBOX_API_KEY,
        doubleClickZoom: false,
        attributionControl: false,
    });
}