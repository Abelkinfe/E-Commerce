import React, { useState } from 'react';
import './NAVV2.css';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
const NAVV2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const llinkani = {
    while: {
      scale:[1.2,1,1.2,1]
    }
  }

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
        <motion.div variants={llinkani} whileHover='while' >
          <Link to="/">  Customer Service</Link>
        </motion.div>
        <motion.div variants={llinkani} whileHover='while' ><Link to="/cart">cart</Link>
        </motion.div>
        <motion.div variants={llinkani} whileHover='while' >
          <Link to="/"> Return/Orders</Link>
          </motion.div>
      </div>
    </nav>
  );
};

export default NAVV2;
