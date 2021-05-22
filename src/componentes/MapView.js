import React from 'react';

import {Map, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [35,45],
});

const polyline = [
    [51.52437, 13.7888],
[51.51, 13.41053],
[51.51, -0.15],
];


const MapView = () => {
    return <Map center={{lat: '51.52437', lng: '13.41053'}} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

        <Marker position= {[51.52437, 13.41053]} icon={markerIcon}> 
        <Popup>
            <b>MARCADOR</b>
        </Popup>
        
        </Marker>
        <Polyline positions={polyline}></Polyline>

    </Map>
}


/*
const MapView = () => {
    return <div>  
    <script>      
    const mymap = L.map('mymap').setView([51.52437, 13.41053], 15);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    const marker = L.marker([51.52437, 13.41053]).addTo(mymap);
    </script> 
    </div>  
}
*/



export default MapView