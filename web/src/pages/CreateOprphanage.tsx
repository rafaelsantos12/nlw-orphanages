import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
/* import PrimaryButton from "../../components/PrimaryButton"; */
import Sidebar from "../components/Sidebar";

import '../style/pages/create-orphanage.css';
import { FiPlus } from "react-icons/fi";
/* import Map from "../../components/Map"; */

import mapIcon from "../utils/mainicon";
import api from "../services/api";

import { setTokenSourceMapRange } from "typescript";
import { useHistory } from "react-router-dom";

export default function OrphanagesMap() {
    const history = useHistory();

  const [position, setPosition] = useState({latitude : 0, longitude: 0});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instruction, setInstruction] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>();

  function handMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>){
      if(!event.target.files){
        return;
      }

      const selectdImages =Array.from(event.target.files);
      setImages(selectdImages);

      const selectdImagesPreview = selectdImages.map(image =>{
        return URL.createObjectURL(image);
      })

      setPreviewImages(selectdImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instruction', instruction);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image =>{
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso');

    history.push('/app');
  }


  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              style={{ width: '100%', height: 280 }}
              center={[-18.8388719,-41.9742073]}
              zoom={13}
              onclick = {handMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              
              { position.latitude != 0 && (
                 <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude, position.longitude]} 
                 />  
                )}
            
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages?.map(image =>{
                  return(
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                
              </div>

              <input multiple onChange={handleSelectImage} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instruction} onChange={event => setInstruction(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                  >
                Sim</button>
                
                <button type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                  >
                Não</button>

              </div>
            </div>
          </fieldset>
          
          <button className="confirm-button" type="submit">
                Confirmar
          </button>
          {/* <PrimaryButton type="submit">Confirmar</PrimaryButton> */}
        </form>
      </main>
    </div>
  );
}
