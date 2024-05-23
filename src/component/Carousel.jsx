
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'
import dd from './dddd.jpg'
const Carousel = () => {
    
  var settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    return (
        <>
            <div className='caro' >
            <Slider {...settings}>
      <div>
        <h3>  <img src={dd} className="card-image" /></h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
            </div>
        </>
    
  )
}

export default Carousel