import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './card'
import './layout.css'
import Carousel from './carousel';

const Layouts = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      
      <div >
       <Carousel></Carousel>
      </div>
      <div className='box-container'>
        <Card></Card>
      </div>
     

     
    </>
  )
}

export default Layouts