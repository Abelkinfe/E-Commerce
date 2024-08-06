import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import './NAVV.css';
import axios from "../api/axios";
import search from './searchh.png';
import kiki from './kiki.svg';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import {  animate, delay, motion } from "framer-motion"
const NAVV = () => {
  const { user, getUser, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const linkani = {
    while: {
      scale:[1.2,1,1.2,1]
    }
  }

  const logoutbtn = {
    while: {
      scale: [1, 1.1, 1.1, 1]
      }  }
  const svg = {
    int: {
     
      x:-200
    },
    ani: {
 
      x:0,
      transition:{
        delay:1.5
      }
    }
  }

  const seachbr = {
    int: {
      y:-100
    },
    ani: {
      y: 0,
      transition: {
        delay: 1.5,
        type: 'spring',
        stiffness:500
      }
    }
  }
   
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getUser();
    }
    axios.get('/api/main-categories')
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

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    const selectedName = categories.find(category => category.id.toString() === selectedId)?.name || '';
    setSelectedCategory(selectedId);
    setsearchvalue(selectedName);
  };

  const handleSearch = () => {
    navigate(`/search?name=${searchvalue}`);
  };

  return (
    <div className="navbar">
      <Link to="/home">
        <motion.div variants={svg} initial='int' animate='ani' className="logo">
          <img src={kiki} alt="Logo" className="logo-image" />
        </motion.div>
      </Link>
      
      <motion.div variants={seachbr} initial='int' animate='ani' className="search-bars">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" disabled>ALL</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select> 
        <input 
          type="text" 
          className='inputo' 
          placeholder={searchvalue ? searchvalue : 'Search...'}
          value={searchvalue}
          onChange={(e) => setsearchvalue(e.target.value)}
        />
        <motion.button variants={logoutbtn} whileHover='while' className="search-button" onClick={handleSearch}>
          <img src={search} alt="Icon" className='icon' />
        </motion.button>

      </motion.div>
      <div>
        <div className="auth-links">
          {user ? (
            <>
              <div>Welcome, {user?.name}</div>
              
                <Link to="/Account">Profile</Link>
            
              <motion.button variants={logoutbtn} whileHover='while' className='mirror-button' onClick={handleLogout}>Logout</motion.button>
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
