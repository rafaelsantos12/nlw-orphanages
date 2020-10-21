import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import '../style/pages/landing.css';
import LogoImg from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div id="page-landing">
        <div className="content-wrapper">
          <img  src={LogoImg} alt="Happy"/>
  
          <main>
            <h1>Leve felicicdade para o mundo</h1>
            <p>Visiste orfanato e mude o dia de muitas crianças</p>
          </main>
  
          <div className="location">
             <strong>Governador Valadares</strong>
             <span>Minas Gerais</span>
          </div>
  
          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
          </Link>
        </div>
      </div>
    );
}

export default Landing;