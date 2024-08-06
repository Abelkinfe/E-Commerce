import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId'); 
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Base_URL = import.meta.env.VITE_BASE_URL; 
  const fetchCartItems = async () => {
    if (!userId) {
      console.warn('No user ID found');  
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        console.warn('No token found'); 
        return;
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };
  
      const response = await axios.get(`${Base_URL}api/cart/${userId}`);
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers); 
      console.log('Fetched cart data:', response.data); 
      setCartItems(Array.isArray(response.data) ? response.data : []); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(error);
      setLoading(false);
    }
  };
  

  const deleteCartItem = async (product_id) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.warn('No token found');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          product_id,
          user_id: userId
        }
      };

      await axios.delete('/api/cart/delete', config);

     
      setCartItems(cartItems.filter(item => item.id !== product_id));
    } catch (error) {
      console.error('Error deleting cart item:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart items: {error.message}</div>;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <div className="cart-page">
      <div className="cart-items">
        {Array.isArray(cartItems) && cartItems.length > 0 ? ( 
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
               <img src={`${BASE_URL}storage/${item.product_img}`} alt="" className="user-image" />
              
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <span className="price">${item.price}</span>
              </div>
              <button 
                className="delete-button" 
                onClick={() => deleteCartItem(item.id)}
              >
                Delete
              </button>
              <div className="subtotal">Subtotal: ${item.price}</div>
            </div>
          ))
        ) : (
          <div>No items in cart.</div>
        )}
      </div>
      <div className="cart-summary">
        <h2>Cart Total</h2>
        <p>Total: ${Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.price, 0) : 0}</p>
      </div>
    </div>
  );
};

export default CartPage;
