import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import './NAVV.css';
import search from './searchh.png';
import kiki from './kiki.svg';
import LogoutConfirmationModal from './LogoutConfirmationModal';

const NAVV = () => {
  const { user, getUser, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getUser();
    }
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
