import axios from "../api/axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import placeholderImg from './dddd.jpg';

const Card = () => {
  const [cardcate, setCardCate] = useState([]);

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

        if (response.data.products_by_category) {
          setCardCate(response.data.products_by_category);
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

  const renderProduct = (product, index) => {
    const categoryID = product.category_id; 

    return (
      <Link to={`/detail/${categoryID}`} key={index} className="product-cardD">
        <img
          src={product.product_img ? `${BASE_URL}storage/${product.product_img}` : placeholderImg}
          alt={product.name}
          className="product-image"
        />
        <p className="product-nameo">{product.name}</p>
      </Link>
    );
  };

  return (
    <>
      <div className="cardS">
        <h2 className="redoo">FACE</h2>
        <div className="grid-container">
          {cardcate[1]?.map((product, index) => renderProduct(product, index))}
        </div>
        <div className="see-more">
          <Link to="/category/face">See More</Link>
        </div>
      </div>

      <div className="cardS">
        <h2 className="redoo">EYE</h2>
        <div className="grid-container">
          {cardcate[2]?.map((product, index) => renderProduct(product, index))}
        </div>
        <div className="see-more">
          <Link to="/category/eye">See More</Link>
        </div>
      </div>

      <div className="cardS">
        <h2 className="redoo">LIPS</h2>
        <div className="grid-container">
          {cardcate[3]?.map((product, index) => renderProduct(product, index))}
        </div>
        <div className="see-more">
          <Link to="/category/lip">See More</Link>
        </div>
      </div>

      <div className="cardS">
        <h3 className="redo">MAKEUP TOOL</h3>
        <div className="grid-container">
          {cardcate[4]?.map((product, index) => renderProduct(product, index))}
        </div>
        <div className="see-more">
          <Link to="/category/makeup-tool">See More</Link>
        </div>
      </div>

      <div className="cardS">
        <h3 className="redo">MAKEUP REMOVER</h3>
        <div className="grid-container">
          {cardcate[5]?.map((product, index) => renderProduct(product, index))}
        </div>
        <div className="see-more">
          <Link to="/category/makeup-remover">See More</Link>
        </div>
      </div>
    </>
  );
};

export default Card;
