import React, { useEffect } from 'react';
import useAuthContext from '../context/AuthContext';
import './NAVV.css';
import { Link } from 'react-router-dom';
import search from './searchh.png';
import kiki from './kiki.svg';  // Import the SVG file

const NAVV = () => {
  const { user, getUser, logout } = useAuthContext();
  
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={kiki} alt="Logo" className="logo-image" />  {/* Use a class for styling */}
      </div>
      <div className="badge"></div>
      <div className="search-bar">
        <select></select>
        <input type="text" className='inputa' placeholder="Search..." />
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
              <button className='mirror-button' onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NAVV;
