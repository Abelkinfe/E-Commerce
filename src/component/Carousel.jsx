import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from '../api/axios';
import './carousel.css';
import dd from './dddd.jpg'; // Assuming you have this image as a fallback or placeholder

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,           
    autoplaySpeed: 3000,      
    pauseOnHover: true        
  };

  const [allcate, setAllCate] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
          setLoading(false);
          console.warn('No token found');
          return;
      }

      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      };

 
  };

  useEffect(() => {
      fetchProductDetails();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get('/api/productcardlist', config);
        console.log("API Response:", response.data);

        // Ensure response.data.latest_products is an array
        if (response.data && Array.isArray(response.data.latest_products)) {
          setAllCate(response.data.latest_products);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const BASE_URL = 'http://127.0.0.1:8100/';

  return (
    <div className='caro'>
      <Slider {...settings}>
      
        {allcate.map((product, index) => (
          <Link to={`/detail/${product.category_id}`} key={index} className="product-cardD">
          <div key={index}>
            <h3>
              {product.product_img ? (
                <img className="caroimg" src={`${BASE_URL}storage/${product.product_img}`} alt={product.name} />
              ) : (
                <img src={dd} alt="Placeholder" className="card-image" /> 
              )}
              <p>{product.name}</p>
            </h3>
            </div>
            </Link>  
        ))}
         
      </Slider>
    </div>
  );
}

export default Carousel;
