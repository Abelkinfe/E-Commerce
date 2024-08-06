import axios from "../api/axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import placeholderImg from './dddd.jpg';
import { animate, motion } from "framer-motion"
const Card = () => {
  const [cardcate, setCardCate] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL; 

  const cardmotionleft = {
    inti: {
     x:-1000
    },
    animate: {
      x:0,
      trans: {
        delay:7000
      }
      
    }
 }
 const cardmotionright = {
  inti: {
   x:1000
  },
  animate: {
    x:0,
    trans: {
      delay:7000
    }
    
  }
}
 const crddef= {
  while: {
    scale: [1.1, 1, 1.1, 1],
    
  }
}





  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }
        console.log(BASE_URL);
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
      <motion.div variants={cardmotionleft} initial='inti' animate='animate'  className="cardS">
        <h2 className="redoo">FACE</h2>
        <motion.div variants={crddef} whileHover='while' className="grid-containers">
          {cardcate[1]?.map((product, index) => renderProduct(product, index))}
        </motion.div>
        <div className="see-more">
          <Link to="/category/face">See More</Link>
        </div>
      </motion.div>

      <div className="cardS">
        <h2 className="redoo">EYE</h2>
        <motion.div variants={crddef} whileHover='while' className="grid-containers">
          {cardcate[2]?.map((product, index) => renderProduct(product, index))}
        </motion.div>
        <div className="see-more">
          <Link to="/category/eye">See More</Link>
        </div>
      </div>

      <motion.div variants={cardmotionright}  initial='inti' animate='animate'  className="cardS">
        <h2 className="redoo">LIPS</h2>
        <motion.div variants={crddef} whileHover='while' className="grid-containers">
          {cardcate[3]?.map((product, index) => renderProduct(product, index))}
        </motion.div>
        <div className="see-more">
          <Link to="/category/lip">See More</Link>
        </div>
      </motion.div>

      <div className="cardS">
        <h3 className="redo">MAKEUP TOOL</h3>
        <motion.div variants={crddef} whileHover='while' className="grid-containers">
          {cardcate[4]?.map((product, index) => renderProduct(product, index))}
        </motion.div>
        <div className="see-more">
          <Link to="/category/makeup-tool">See More</Link>
        </div>
      </div>

      <div className="cardS">
        <h3 className="redo">MAKEUP REMOVER</h3>
        <motion.div variants={crddef} whileHover='while' className="grid-containers">
          {cardcate[5]?.map((product, index) => renderProduct(product, index))}
        </motion.div>
        <div className="see-more">
          <Link to="/category/makeup-remover">See More</Link>
        </div>
      </div>
    </>
  );
};

export default Card;
