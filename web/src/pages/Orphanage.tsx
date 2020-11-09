import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";


import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mainicon";

/* import Map from "../../components/Map"; */
/* import PrimaryButton from "../../components/PrimaryButton"; */
import api from '../services/api';


import '../style/pages/orphanage.css';
import { stringify } from "querystring";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instrution: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url:string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setAtiveImageIndex] = useState(0);

    useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response => {
        setOrphanage(response.data);
      });
    }, [params.id]);
    
if (!orphanage) {
  return <p>Carregando...</p>
}
  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) =>{
              return (
                  <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={()=>{
                    setAtiveImageIndex(index)
                  }}
                  >
                    <img src={image.url} alt={orphanage.name} />
                  </button>
              );
            })}
            
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              <Map 
                interactive={false}
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_black" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instrution}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                </div>
              ) :(
                <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos no <br />
                    final de semana
              </div>
              )}
            </div>

            {/* <PrimaryButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton> */}
          </div>
        </div>
      </main>
    </div>
  );
}