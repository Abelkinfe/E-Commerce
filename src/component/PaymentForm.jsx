import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthContext from '../context/AuthContext';
import './paymentform.css';

const PaymentForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');

    const { user, getUser } = useAuthContext();
   
    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const formData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            value: value,
        };

        const baseURL = import.meta.env.VITE_BASE_URL;

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
            const response = await axios.post(`${baseURL}api/paymentform`, formData,config);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        console.log(formData);
    };

    const baseURL = import.meta.env.VITE_BASE_URL;

    return (
        <div className="pay-App">
            <div className="pay-sidebar">
                {user && (
                    <div className="user-container">
                        <div className="circle-image">
                            <img src={`${baseURL}storage/${user.user_image}`} alt="" className="user-image" />
                        </div>
                        <span className="username">{user.name}</span>
                    </div>
                )}
            </div>
            <div className="pay-main-content">
                <form onSubmit={handleSubmit} className="pay-transparent-form">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        id="first_name"
                        className="pay-nam"
                        placeholder="Enter your first name"
                        name="first_name"
                    />

                    <label htmlFor="last_name">Last Name</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        id="last_name"
                        className="pay-nam"
                        placeholder="Enter your last name"
                        name="last_name"
                    />

                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="text"
                        id="phone_number"
                        className="pay-nam"
                        placeholder="Enter your phone number"
                        name="phone_number"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        className="pay-nam"
                        placeholder="Enter your email"
                        name="email"
                    />

                    <label htmlFor="value">Value</label>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        id="value"
                        className="pay-nam"
                        placeholder="Enter the value"
                        name="value"
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
