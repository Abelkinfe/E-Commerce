import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import './Advert.css';
import vid from './videos/makevid.mp4';
import dd from './dddd.jpg';  // Placeholder image

const Advert = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

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

        const response = await axios.get('/api/productlink', config);
        const data = response.data;
        setProducts(data[categoryName.toUpperCase()] || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryName]);

  const BASE_URL = 'http://127.0.0.1:7000/';

  return (
    <div className="Advert">
      <div className="top-content">
        <div className="video-container">
        <video className='my-video' autoPlay muted loop>
            <source src={vid} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="cards">
        {products.map((product, index) => (
           <Link to={`/detail/${product.category_id}`} key={index} className="product-cardD">
          <div className="cardo" key={index}>
            <img className="card__photo" src={product.product_img ? `${BASE_URL}storage/${product.product_img}` : dd} alt={product.name} />
            <div className="name">
              <p>{product.name}</p>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Advert;
