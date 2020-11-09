import Leafleat from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leafleat.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [28, 68],
    popupAnchor: [0,-60]

})

export default mapIcon;