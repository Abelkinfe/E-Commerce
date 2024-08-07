import React, { useState, useEffect } from 'react';
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
import './Sell.css';
import { useNavigate } from 'react-router-dom';
import {  animate, delay, motion } from "framer-motion"
const SellProduct = () => {
  const anifo= {
    int: {
        y:-1000
      },
      ani: {
        y: 0,
        transition: {
          delay: 1.5,
          type: 'spring',
          stiffness:500
        }
      }
  }
  const sideani = {
    ini: {
        x:-700
    },
    ani: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness:500
        }
    }
  }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    product_img: null,
    price: '',
    qty_instock: '',
    cata_name: '',
    parent_category_id: '',
    variety_option:'',
    variety_name: '' 
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [procard, setprocard] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const { user, getUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'product_img') {
      setFormData(prevState => ({
        ...prevState,
        product_img: files[0],
      }));
    } else if (name === 'cata_name') {
      const selectedSubcategory = subcategories.find(sub => sub.id === parseInt(value));
      if (selectedSubcategory) {
        setFormData(prevState => ({
          ...prevState,
          cata_name: selectedSubcategory.category_name,
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          cata_name: value,
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('product_img', formData.product_img);
    data.append('qty_instock', formData.qty_instock);
    data.append('price', formData.price);
    data.append('cata_name', formData.cata_name);
    data.append('parent_category_id', formData.parent_category_id);
    data.append('variety_option', formData.variety_option); 
    data.append('variety_name', formData.variety_name);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await axios.post('api/sellproduct', data, config);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('There was an error!', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token not found in localStorage.");
          setLoading(false);
          return;
        }
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get('/api/getproduct', config);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const productcard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token not found in localStorage.");
          setLoading(false);
          return;
        }
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get('/api/productcard', config);
        console.log("Product Card Response:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setprocard(response.data);
          console.log("Updated procard state:", response.data);
          
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      getUser();
    };

    fetchData();
    productcard();
    navigate('/sell');/*this is  the  one to reload the page again*/
  }, [user, getUser]);
  
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    setFormData(prevState => ({
      ...prevState,
      parent_category_id: categoryId
    }));
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
      const response = await axios.get(`/api/subcategory/${categoryId}`, config);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <div className="AppSell">
      <motion.div variants={sideani} animate='ani' initial='ini'  className="sideedit">
        {user && (
          <div className="user-containerSell">
            <div className="circle-imagesell">
              <img src={`${BASE_URL}storage/${user.user_image}`} alt="" className="user-image" />
            </div>
            <span className="username">{user.name}</span>
          </div>
        )}
        <div className="sell-container">
          <h3>your latest products</h3>
          {loading ? (
            <p>please wait</p>
          ) : procard && procard.length > 0 ? (
            procard.map((product, index) => (
              <div key={index} className="product-card-sell">
                <div className="product-img-sell" >
                <img src={`${BASE_URL}storage/${product.image}`} alt=""/>
                </div>
                <div className='product-details-sell'>
                <p ><span>name-</span>{product.name}</p>
                <p ><span>quantity-</span>{product.qty_instock}</p>
                <p ><span>price-</span>{product.price}</p>
                 </div>
               
              </div>
            ))
          ) : (
            <p>No product card found</p>
          )}
        </div>
        </motion.div>
      <div className="main-contentSell">
      <motion.div variants={anifo} initial='ini' animate='ani'>
        <form onSubmit={handleSubmit} className="transparent-formSell">
          <label htmlFor="product_name">Product Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} type="text" id="product_name" className="nameSell" placeholder="Enter product name" required />
          {errors.name && <p className="error">{errors.name[0]}</p>}

          <label htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} id="description" className="discSell" placeholder="Write product description..." required />
          {errors.description && <p className="error">{errors.description[0]}</p>}

          <label htmlFor="user_img">Product Image:</label>
          <input name="product_img" onChange={handleChange} type="file" className="blue-inputSell" id="user_img" placeholder="Upload product photo" />
          {errors.product_img && <p className="error">{errors.product_img[0]}</p>}

          <label htmlFor="price">Price:</label>
          <input name="price" value={formData.price} onChange={handleChange} type="text" id="price" className="priceo" placeholder="Enter price" required />
          {errors.price && <p className="error">{errors.price[0]}</p>}

          <label htmlFor="qan">Quantity:</label>
          <input name="qty_instock" value={formData.qty_instock} onChange={handleChange} type="text" className="quantity_sell" id="qan" placeholder="Enter qty" required />
          {errors.qty_instock && <p className="error">{errors.qty_instock[0]}</p>}

          <label htmlFor="product_category">Product Category:</label>
          <select id="product_category" className="select-sell" name="product_category" onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>
          {errors.product_category && <p className="error">{errors.product_category[0]}</p>}

          <label htmlFor="product_type">Product Type:</label>
          <input list="categories" name="cata_name" value={formData.cata_name} onChange={handleChange} id="product_type" className="select-selltype" placeholder="Choose a subcategory" required />
          <datalist id="categories">
            {subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.category_name}</option>
            ))}
          </datalist>
          {errors.cata_name && <p className="error">{errors.cata_name[0]}</p>}
          <label htmlFor="variety_name">Variety option:</label> 
          <input name="variety_option" value={formData.variety_option} onChange={handleChange} type="text" id="variety_option" className="variety-sell" placeholder="Enter variety name" required />
          {errors.variety_option && <p className="error">{errors.variety_option[0]}</p>}

          <label htmlFor="variety_name">Variety Name:</label> 
          <input name="variety_name" value={formData.variety_name} onChange={handleChange} type="text" id="variety_name" className="variety-sell" placeholder="Enter variety name" required />
          {errors.variety_name && <p className="error">{errors.variety_name[0]}</p>}

          <button className="btn" type="submit">Submit</button>
          </form>
          </motion.div>
      </div>
    </div>
  );
};

export default SellProduct;
