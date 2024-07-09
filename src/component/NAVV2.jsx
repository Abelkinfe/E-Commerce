import React, { useState } from 'react';
import './NAVV2.css';
import { Link } from 'react-router-dom';
import cart from './cart.png';
import customer from './customer-service.png';
import order from './Order.png';

const NAVV2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar2">
     
      <div className="menu-button" onClick={toggleDropdown}></div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <h6>Menu</h6>
          <Link to="/link1">Link 1</Link>
          <Link to="/link2">Link 2</Link>
          {/* Add more links as needed */}
        </div>
      )}
      <div className="route-links">
        <a href="/customer-service">
          {/* <img src={customer} className="card-imageo" alt="Customer Service" /> */}
          Customer Service
        </a>
        <a href="/cart">
          {/* <img src={cart} className="card-imageo" alt="Cart" /> */}
          Cart
        </a>
        <a href="/return-orders">
          {/* <img src={order} className="card-imageo" alt="Return/Orders" /> */}
          Return/Orders
        </a>
      </div>
    </nav>
  );
};

export default NAVV2;
