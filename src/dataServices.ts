import {API} from "./constants";

export const getStations = () => fetch(API.STATIONS).then(response => response.json()).then(json => json.data)