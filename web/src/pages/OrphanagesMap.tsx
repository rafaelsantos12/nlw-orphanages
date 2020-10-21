import React from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import{ Link } from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import '../style/pages/orphanage-map.css';
import { tileLayer } from 'leaflet';

function OrphanagesMap() {
    return (
     <div id="page-map">
       <aside>
          
          <header>
            <img src={mapMarkerImg} alt="Happy" />
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita :)</p>
          </header>

          <footer>
            <strong>Rio do Sul</strong>
            <span>Santa Catarina</span>
          </footer>
       </aside>

       <div></div>
        
        <Map 
          center={[-18.8388719,-41.9742073]}
          zoom={15}
          style={{width:'100%', height:'100%'}}
        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        </Map>

       <Link to="" className="create-orphanage">
            <FiArrowRight size={32} color="#FFF"/>
        </Link>

     </div>
    );
  }
  
  export default OrphanagesMap;