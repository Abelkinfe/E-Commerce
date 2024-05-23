import React, { useState,useEffect } from 'react'
import useAuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom';
import './payment.css'
const Payment = () => {
   
    const { user, getUser } = useAuthContext();



    useEffect(() => {

        if (!user) {
            getUser();
        }
    }, [])

   
    return (
        <>
            <div className="App">
                <div className="sidebar">
                    {user && (
                        <div className="user-container">
                            <div className="circle-image">
                                <img src={user.photo} alt='' className="product-image" />
                            </div>
                            <span className="username">{user.name}</span>
                        </div>)
                    }
                    <div>
                    <Link to="/paymentform">
                        <button className="add-payment-button">
                            Add Payment
                            </button>
                            </Link>
                    </div>


                </div>
                <div className="main-content">
                    <div className='divback'>
                        <table>
                            <thead>
                                <tr>
                                    <th>payment type</th>
                                    <th>amount</th>
                                    <th>payment provider</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment