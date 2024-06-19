import React, { useState, useEffect } from 'react';
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';
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

  const [categories, setCategories] = useState([]);
  const [procard, setprocard] = useState(null); // Initialize as null for better checks
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  const {  user, getUser } = useAuthContext();

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
          setLoading(false); // Stop loading if token is not found
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
          setLoading(false); // Stop loading if token is not found
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
  }, [ user, getUser]);

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

  const BASE_URL = 'http://127.0.0.1:8900/';

  return (
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
          {loading ? (
            <p>please wait</p>
          ) : procard && procard.length > 0 ? (
            procard.map((product, index) => (
              <div key={index} className="small-cardSell">
                 <img src={`${BASE_URL}storage/${product.image}`} alt="" className="user-image" />
                <p className="product-name"><span>name-</span>{product.name}</p>
                <p className="product-name"><span>quantity-</span>{product.qty_instock}</p>
                <p className="product-name"><span>price-</span>{product.price}</p>
              </div>
            ))
          ) : (
            <p>No product card found</p>
          )}

        </div>
      </div>
      <div className="main-contentSell">
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
          <input name="price" value={formData.price} onChange={handleChange} type="text" id="price" className="price-sell" placeholder="Enter price" required />
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
          <button className="buttonsell" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;
