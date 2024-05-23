
import useAuthContext from '../context/AuthContext'
import React, { useEffect } from 'react';
import './NAVV.css';
import { Link } from 'react-router-dom';
import search from './searchh.png';


const NAVV = () => {
  const { user, getUser,logout } = useAuthContext();
  

  useEffect(() => {

    if (!user) {
      getUser();
    }


  }, []);

  
  return (
    <div className="navbar">
      <div className="logo">kiki</div>
      <div className="badge">badge</div>
      <div className="search-bar">
      <select></select>
        <input type="text" className='inputa' placeholder="Search..." />
       
        <button className="search-button">
          <img src={search} alt='Icon' className='icon' />
        </button>
      </div>
      <div>
        <div className="auth-links">
          {user ? (
            <>
              <div>Welcome, {user?.name}</div>
              <Link to="/Account">profile</Link>
              <button  className='mirror-button' onClick={logout}>Logout</button>
             
              </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
                <Link to="/register">Register</Link>
                
            </>
          )}
          



        </div>

      </div>

    </div>
  );
};

export default NAVV;

















