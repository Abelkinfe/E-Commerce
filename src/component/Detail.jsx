import React, { useState, useEffect } from 'react';
import { useParams, Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

const Detail = () => {
    const { su } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userid, setuserid] = useState();
    const navigate = useNavigate();
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

        const baseURL =  import.meta.env.VITE_BASE_URL;
        const fullURL = `${baseURL}api/detailfor/${su}`;

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

    const handleAddToCart = async (productId) => {
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
    
        const baseURL =  import.meta.env.VITE_BASE_URL;
    
        try {
            const userResponse = await axios.get(`${baseURL}api/cartuser`, config); 
            const userId = userResponse.data.id;
            console.log(userId);
    
            const url = `${baseURL}api/cart/add`; 
    
            await axios.post(url, { product_id: productId, user_id: userId }, config);
            console.log('Product added to cart successfully'); 
            navigate(`/cart?userId=${userId}`);
        } catch (err) {
            console.error('Error adding product to cart:', err); 
            if (err.response) {
                console.error('Server responded with:', err.response.data); 
            }
        }
    };

    const BASE_URL = import.meta.env.VITE_BASE_URL; 
    return (
        <div className="detail-containerd">
            {loading ? (
                <div>Loading...</div>
            ) : products.length > 0 ? (
                products.map((product, index) => (
                    <div key={index} className="detail-card">
                        <div className="product-img">
                            <img  src={`${BASE_URL}storage/${product.product_img}`} alt={product.name} />
                        </div>
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Stock: {product.qty_instock}</p>
                            <p>Price: ${product.price}</p>
                            <p>Variety: {product.variety}</p>
                            <p>Variety Option: {product.variety_option}</p>
                            <button type="submit" className="addcart-button" onClick={() => handleAddToCart(product.id)}>Add to cart</button>
                            <Link to={`/detailpay/${product.id}`} className="pay-buttondet">Buy Now</Link>
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
