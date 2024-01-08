import React,{ useState } from 'react';
import './NAVV2.css';
import { Link } from 'react-router-dom';
import cart from './cart.png'
import customer from './customer-service.png'
import order from './Order.png'
import menu from './menu.png'
const NAVV2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  

  return (
    <nav className="navbar2">
      <div className="menu-button"onClick={toggleDropdown}><img src={menu} className="card-image" />
        Menu
        {isDropdownOpen && (
          <div className="dropdown-content">
            <h3>hello</h3>
            <Link to="/link1">Link 1</Link>
            <Link to="/link2">Link 2</Link>
            {/* Add more links as needed */}
          </div>
        )}
      
      </div>
      <div className="route-links">
        <a href="/customer-service"><img src={customer} className="card-image" />Customer Service</a>
        <a href="/cart">  <img src={cart} className="card-image" />
          Cart</a>
        <a href="/return-orders"><img src={order} className="card-image" />Return/Orders</a>
      </div>
    </nav>
  );
};

export default NAVV2;
