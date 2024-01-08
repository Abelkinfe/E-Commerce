import React from 'react';
import './Footer.css'; // Remember to create and import your CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Your Website</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
