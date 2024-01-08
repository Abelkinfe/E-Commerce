
import React, { useState, useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './card.css';
import dd from './dddd.jpg'




const Card = () => {
  const [ProductData, setProductData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/product_img');
        console.log(response.data);
        setProductData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);





  return (
    <div className="card">
      <h3>catagory</h3>
      {
        ProductData.map((product)=>(
          <img src={dd} className="card-image" />
        )
        )

      }
     

      <a href="/" target="_blank" rel="noopener noreferrer">
        See More
      </a>
    </div>
  );
};

export default Card;
