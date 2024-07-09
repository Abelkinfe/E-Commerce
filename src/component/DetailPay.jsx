import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import axios from 'axios';
import './DetailPay.css';

const DetailPay = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [paystatus, setpaystatus] = useState();
    const navigate = useNavigate();

 
    const CHAPA_TOKEN = "CHASECK_TEST-FBcYDRuNHfLgu8qD7rQedPxDieEyXlyH";

    const fetchProductDetails = async () => {
        if (!id) {
            console.error('Product ID is missing or undefined');
            return;
        }

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
        const fullURL = `${baseURL}/api/paydetailproduct/${id}`;

        try {
            const response = await axios.get(fullURL, config);
            console.log('API Response payment:', response.data);
            setProduct(response.data);
        } catch (err) {
            console.error('Error fetching product details:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!product) return;

     
        const commission = product.price * 0.10;
        const totalAmount = parseFloat(product.price) + parseFloat(commission);

        console.log(`Product Price: ${product.price}`);
        console.log(`Commission (10%): ${commission}`);
        console.log(`Total Amount: ${totalAmount}`);
        console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Phone Number: ${phoneNumber}, Product ID: ${product.id}`);
        try {
            // Initialize transaction to get tx_ref
          
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

            const response = await axios.post('http://127.0.0.1:8100/api/transactions', {
                amount: totalAmount,
                currency: "ETB",
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                product_id: product.id,
                
            },config);

            const txRef = response.data.tx_ref;

            const paymentDetails = {
                amount: totalAmount,
                currency: "ETB",
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                tx_ref: txRef,
                callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
                return_url: "https://google.com",
                customization: {
                    title: "kiki",
                    description: "payment"
                }
            }; const paymentResponse = await axios.post("http://127.0.0.1:8100/api/chapa", paymentDetails, {
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (paymentResponse.data.status === 'success') {
                console.log(paymentResponse.data);
                const checkoutUrl = paymentResponse.data.data.checkout_url;
                console.log('Redirecting to:', checkoutUrl);
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error('Error:', error);
        }

            // const paymentResponse = await fetch("https://api.chapa.co/v1/transaction/initialize", {
            //     method: 'POST',
            //     headers: {
            //         "Authorization": `Bearer ${CHAPA_TOKEN}`,
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(paymentDetails)
            // });
        //     const result = await paymentResponse.json();
        //     console.log(result);
        //     if (result.status === 'success') {
        //         navigate(result.data.redirect_url);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };

    useEffect(() => {
        console.log("Product ID from URL:", id);
        fetchProductDetails();
        
    }, [id]);

    return (
        <div className="payment-container">
            {loading ? (
                <div>Loading...</div>
            ) : product ? (
                <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Stock: {product.qty_instock}</p>
                    <p>Price: ${product.price}</p>
                    <form onSubmit={handlePayment}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <button type="submit" className="pay-button">Pay <span className='red'>{product.price * 1.10}$</span></button> {/* Include 10% commission */}
                    </form>
                </div>
            ) : (
                <div>No product details available.</div>
            )}
        </div>
    );
};

export default DetailPay;
