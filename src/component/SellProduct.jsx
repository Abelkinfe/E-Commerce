import React, { useState, useEffect } from 'react';
import useAuthContext from '../context/AuthContext';
import axios from "../api/axios";
import './Sell.css';

const SellProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    product_img: null,
    price: '',
    qty_instock: '',
    cata_name: '',
    parent_category_id: ''
  });
  
  const [getproduct, setgetproduct] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  
  const { sellpro, sellproduct, user, getUser } = useAuthContext();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'product_img') {
      setFormData({
        ...formData,
        product_img: files[0],
      });
    } else if (name === 'cata_name') {
      const selectedSubcategory = subcategory.find(sub => sub.id === parseInt(value));
      if (selectedSubcategory) {
        setFormData({
          ...formData,
          cata_name: selectedSubcategory.category_name,
          parent_category_id: selectedCategoryId
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('product_img', formData.product_img);
    data.append('price', formData.price);
    data.append('qty_instock', formData.qty_instock);
    data.append('cata_name', formData.cata_name);
    data.append('parent_category_id', formData.parent_category_id);
    console.log(data);

   
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
      const response = await axios.post('api/register', data, 
      config);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  
  useEffect(() => {
    if (!sellproduct) {
      sellpro();
    }
    if (!user) {
      getUser();
    }
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
        const response = await axios.get('/api/getproduct', config);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setgetproduct(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [ sellproduct, user, getUser]);
  
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
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
      setSubcategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  
  const BASE_URL = 'http://127.0.0.1:8000/';
  return (
    <>
      <div className="AppSell">
        <div className="sidebarSell">
          {user && (
            <div className="user-containerSell">
              <div className="circle-imagesell">
                <img src={`${BASE_URL}storage/${user.user_image}`} alt="" className="user-image" />
              </div>
              <span className="username">{user.name}</span>
            </div>
          )}
          <div className="small-cardSell">
            {sellproduct && (
              <>
                <img src={sellproduct.product.product_img} alt="" className="product-image" />
                <p className="product-name">{sellproduct.product.name}</p>
              </>
            )}
          </div>
        </div>
        <div className="main-contentSell">
          <form onSubmit={handleSubmit} className="transparent-formSell">
            <label htmlFor="product_name">Product Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" id="product_name" className='nameSell' placeholder="Enter product name" />

            <label htmlFor="description">Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} id="description" className='discSell' placeholder="write product description..." ></textarea>

            <label htmlFor="user_img">Product Image:</label>
            <input name='product_img' onChange={handleChange} type="file" className='blue-inputSell' id="user_img" placeholder="upload product photo" />

            <label htmlFor="price">Price:</label>
            <input name="price" value={formData.price} onChange={handleChange} type="text" id="price" className='price-sell' placeholder="Enter price" />

            <label htmlFor="qan">Quantity:</label>
            <input name="qty_instock" value={formData.qty_instock} onChange={handleChange} type="text" className='quantity_sell' id="qan" placeholder="Enter qty" />

            <label htmlFor="product_category">Product Category:</label>
            <select id="product_category" className='select-sell' name="product_category" onChange={handleCategoryChange}>
              {getproduct.map(category => (
                <option key={category.id} value={category.id}>{category.category_name}</option>
              ))}
            </select>

            <label htmlFor="product_name">Product Type:</label>
            <input list="categories" name="cata_name" value={formData.cata_name} onChange={handleChange} id="product_name" className="select-selltype" placeholder="Choose a category" />
            <datalist id="categories">
              {subcategory.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.category_name}</option>
              ))}
            </datalist>

            <button className='buttonsell' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellProduct;
