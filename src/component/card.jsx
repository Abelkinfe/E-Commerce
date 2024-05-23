
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './card.css';
import dd from './dddd.jpg'

import primer from './images/face_primer.jpg'
import foundation from './images/foundation.jpg'
import bronzer from './images/bronzer.jpg'
import concealers from './images/concealers.jpg'

import eye_primer from './images/eye_primer.jpg'
import eye_shadow from './images/eye_shadow.jpg'
import eye_liner from './images/eye_liner.jpg'
import mascara from './images/mascara.jpg'

import lip_balm from './images/lip_balm.jpg'
import lip_glass from './images/lip_glass.jpg'
import lip_liner from './images/lip_liner.jpg'
import lipsticks from './images/lipsticks.jpg'

import micellow_water from './images/micellow_water.jpg'
import cleaning_milk from './images/cleaning_milk.jpg'
import cleaning_oil from './images/cleaning_oil.jpg'
import cleaning_balm from './images/cleaning_balm.jpg'

import makeup_sponges from './images/makeup_sponges.jpg'
import makeup_organizer from './images/makeup_organizer.jpg'
import makeup_brushes from './images/makeup_brushes.jpg'
import makeup_vanity from './images/makeup_vanity.jpg'


const Card = () => {
  const [face, setface] = useState();
  useEffect(()=>{
   
    const fetchData = async () => {
      try {
       
        const response = await axios.get('/api/cardlist');
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setface(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
  



  return (
    <>
       {/* face section */}
      <div className="card">
      <h2>FACE</h2>
        <div className="grid-container">
        
          <div className="top-left">
            {face&&(<>
           <img src={face.product_image} alt="" />
              <p>{face.name}</p>
              </>)
             }
              </div>
       
      </div>
      <div className="see-more">
        <a href="#">See More</a>
      </div>
      </div>
      {/* eyes section */}
      <div className="card">
      <h2>EYE</h2>
      <div className="grid-container">
        <div className="top-left">
          <img src={eye_primer} alt=""/>
          <p>eye_primer</p>
        </div>
        <div className="top-right">
          <img src={eye_shadow} alt=""/>
          <p>eye shadow</p>
        </div>
        <div className="bottom-left">
          <img src={eye_liner} alt=""/>
          <p>eye liner</p>
        </div>
        <div className="bottom-right">
          <img src={mascara} alt=""/>
          <p>mascara</p>
          </div>
        
      </div>
      <div className="see-more">
        <a href="#">See More</a>
      </div>
      </div>
      {/* lips section */}
      <div className="card">
      <h2>LIPS</h2>
      <div className="grid-container">
        <div className="top-left">
          <img src={lip_balm} alt=""/>
          <p>lip balm</p>
        </div>
        <div className="top-right">
          <img src={lip_liner} alt=""/>
          <p>lip liner</p>
        </div>
        <div className="bottom-left">
          <img src={lip_glass} alt=""/>
          <p>lip glass</p>
        </div>
        <div className="bottom-right">
          <img src={lipsticks} alt=""/>
          <p>lipsticks</p>
          </div>
        
      </div>
      <div className="see-more">
        <a href="#">See More</a>
      </div>
      </div>
      {/* makeuptool section */}
      <div className="card">
      <h2>MAKEUP TOOL</h2>
      <div className="grid-container">
        <div className="top-left">
          <img src={makeup_sponges} alt=""/>
          <p>makeup sponges</p>
        </div>
        <div className="top-right">
          <img src={makeup_organizer} alt=""/>
          <p>makeup organizer</p>
        </div>
        <div className="bottom-left">
          <img src={makeup_brushes} alt=""/>
          <p>makeup brushes</p>
        </div>
        <div className="bottom-right">
          <img src={makeup_vanity} alt=""/>
          <p>makeup_vanity</p>
          </div>
        
      </div>
      <div className="see-more">
        <a href="#">See More</a>
      </div>
      </div>
      {/* makeup remover section */}
      <div className="card">
      <h2>MAKEUP REMOVER</h2>
      <div className="grid-container">
        <div className="top-left">
          <img src={cleaning_oil} alt=""/>
          <p>cleaning oil</p>
        </div>
        <div className="top-right">
          <img src={cleaning_milk} alt=""/>
          <p>cleaning milk</p>
        </div>
        <div className="bottom-left">
          <img src={cleaning_balm} alt=""/>
          <p>balm water</p>
        </div>
        <div className="bottom-right">
          <img src={micellow_water} alt=""/>
          <p>"gg"</p>
          </div>
        
      </div>
      <div className="see-more">
        <a href="#">See More</a>
      </div>
      </div>
    
    </>
  );
};

export default Card;
