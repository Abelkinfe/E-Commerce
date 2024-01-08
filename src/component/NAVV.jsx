import React from 'react';
import './NAVV.css';
import { Link } from 'react-router-dom';
import search from './searchh.png'
import { UserContext } from './UserContext';

const NAVV = () => {
  const { user } = UserContext(UserContext)
  return (  <div className="navbar">
  <div className="logo">
    {/* Your logo content */}
  </div>
  <div className="badge">
    {/* Badge content */}
  </div>
  <div className="search-bar">
    {/* Search bar content */}
  </div>
  <div className="auth-links">
    {user ? (
      <div className="user-profile">
        <span>Welcome, {user.name}</span>
        {user.photo && <img src={user.photo} alt="Profile" />}
      </div>
    ) : (
      <>
        <Link to="/login">Sign in</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </div>
</div>
);
    // <div className="navbar">
    //   <div className="logo">
       
    //   </div>
    //   <div className="badge">
       
    //   </div>
    //   <div className="search-bar ">
    //     <select>
        
    //     </select>
    //     <input type="text" className='input' placeholder="Search..." />
    //     <button className="search-button">
    //     <img src={search} alt='Icon' className='icon' />
    //     </button>
    //   </div>
    //   <div className="auth-links">
        
    //     <Link to="/login">Sign in</Link>
    //     <Link to="/register">Register</Link>

        
    //   </div>
    // </div>
  
};

export default NAVV;
