import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ProductSearch.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductSearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('name');
  const [products, setProducts] = useState([]);
  const base_url = import.meta.env.VITE_BASE_URL;
  const full_url = `${base_url}api/search`;
  useEffect(() => {
    console.log(full_url);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(full_url, {
          params: { name: searchTerm }
        });

        console.log('API response:', response);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);
  const BASE_URL =import.meta.env.VITE_BASE_URL;
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Stock: {product.qty_instock}</p>
              <p>Variety: {product.variety_name}</p>
              <p>Value: {product.value}</p>
            </div>
            <img  src={`${BASE_URL}storage/${product.product_img}`} alt={product.name} className="product-image" />
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductSearchResults;
