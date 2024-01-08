import React from 'react';
import './Products.css'; 

const Products = () => {
  return (
    <div className="product-page">
      <div className="left-box">
        
        {/* Content for the left box */}
        <h2>Left Box (30%)</h2>
        {/* Add your content here */}
      </div>
      <div className="right-box">
        {/* Content for the right box */}
        <div className="product-image">
          <img src="path_to_your_image.jpg" alt="Product" />
        </div>
        <div className="product-description">
          <h2>Description</h2>
          {/* Add product description here */}
          <p>This is the description of the product.</p>
        </div>
        <div className="add-to-cart">
          {/* Add to Cart button */}
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
