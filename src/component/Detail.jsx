import React from 'react'
import "./Detail.css"
const detail = () => {
  return (
      <>
            <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar content goes here */}
        Sidebar
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Content with card */}
        <div className="card">
          {/* Car details */}
          <h2>Car Name</h2>
          <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Price: $50,000</p>
          <p>Rating: 4.5/5</p>
        </div>
      </div>
    </div>
      </>
  )
}

export default detail