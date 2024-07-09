import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

const Detail = () => {
    const { su } = useParams();
    const [products, setProducts] = useState([]);
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

        const baseURL = 'http://127.0.0.1:8100';
        const fullURL = `${baseURL}/api/detailfor/${su}`;

        console.log('Fetching product details from URL:', fullURL);

        try {
            const response = await axios.get(fullURL, config);
            console.log('API Response detail:', response.data);

            if (response.data && response.data.length > 0) {
                setProducts(response.data);
            } else {
                console.warn('No product data returned from API');
            }
        } catch (err) {
            console.error('Error fetching product details:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [su]);

    const BASE_URL = 'http://127.0.0.1:8100/';
    return (
        <div className="detail-container">
            {loading ? (
                <div>Loading...</div>
            ) : products.length > 0 ? (
                products.map((product, index) => (
                    <div key={index} className="product-card">
                        <div className="product-img">
                            <img className="caroimg" src={`${BASE_URL}storage/${product.product_img}`} alt={product.name} />
                        </div>
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Stock: {product.qty_instock}</p>
                            <p>Price: ${product.price}</p>
                            <p>Variety: {product.variety}</p>
                            <p>Variety Option: {product.variety_option}</p>
                            <Link to={`/detailpay/${product.id}`} className="pay-button">Buy Now</Link>
                        </div>
                    </div>
                ))
            ) : (
                <div>No product details available.</div>
            )}
        </div>
    );
};

export default Detail;
