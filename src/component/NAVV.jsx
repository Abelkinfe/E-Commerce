import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import './NAVV.css';
import axios from "../api/axios";
import search from './searchh.png';
import kiki from './kiki.svg';
import LogoutConfirmationModal from './LogoutConfirmationModal';

const NAVV = () => {
  const { user, getUser, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getUser();
    }
    axios.get('http://127.0.0.1:8100/api/main-categories')
    .then(response => {
      
        setCategories(response.data);
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
  }, [user, getUser]);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
    navigate('/home');
  };

  const handleCancelLogout = () => {
    setShowModal(false);
    };

  return (
    <div className="navbar">
      <Link to="/home">
        <div className="logo">
          <img src={kiki} alt="Logo" className="logo-image" />
        </div>
      </Link>
      
      <div className="search-bar">
        <select> {categories.map(category => (
                <option key={category.id} value={category.id}>
            {category.name}
            
                </option>
            ))}</select>
        <input type="text" className='input' placeholder="Search..." />
        <button className="search-button">
          <img src={search} alt="Icon" className='icon' />
          
        </button>
      </div>
      <div>
        <div className="auth-links">
          {user ? (
            <>
              <div>Welcome, {user?.name}</div>
              <Link to="/Account">Profile</Link>
              <button className='mirror-button' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <LogoutConfirmationModal
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default NAVV;
