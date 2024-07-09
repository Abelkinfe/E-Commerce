import React, { useState, useEffect } from 'react';
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
        // Handle the form submission logic here
        console.log({
            firstName,
            lastName,
            phoneNumber,
            email,
            value,
        });
    };
    const BASE_URL = 'http://127.0.0.1:8900/';
    return (
        <>
            <div className="App">
                <div className="sidebar">
                    {user && (
                        <div className="user-container">
                            <div className="circle-image">
                            <img src={`${BASE_URL}storage/${user.user_image}`} alt="" className="user-image" />
                            </div>
                            <span className="username">{user.name}</span>
                        </div>
                    )}
                </div>
                <div className="main-content">
                    <form onSubmit={handleSubmit} className="transparent-form">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            id="first_name"
                            className="nam"
                            placeholder="Enter your first name"
                            name="first_name"
                        />

                        <label htmlFor="last_name">Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            id="last_name"
                            className="nam"
                            placeholder="Enter your last name"
                            name="last_name"
                        />

                        <label htmlFor="phone_number">Phone Number</label>
                        <input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text"
                            id="phone_number"
                            className="nam"
                            placeholder="Enter your phone number"
                            name="phone_number"
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="nam"
                            placeholder="Enter your email"
                            name="email"
                        />

                        <label htmlFor="value">provider/bank name</label>
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            id="value"
                            className="nam"
                            placeholder="Enter the value"
                            name="value"
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PaymentForm;
