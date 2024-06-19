import React, { useState } from 'react';
import './Address.css'
import axios from '../api/axios';
const Address = () => {
    const [formData, setFormData] = useState({
        city: '',
        region: '',
        country_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/address', formData);
            console.log(response.data);
           
        } catch (error) {
            console.error(error);
            
        }
    };
  return (
      <>
          <div className='AppADR'>
              {/* <div className='SidebarADR'>
                  <div className='user-containerADR'>
                      <div className='circle-inageADR'>
                          <img  className="user-image" src="" alt="" />
                      </div>
                      <span className="username">{user.name}</span>
                  </div>
              </div> */}
              <div className='main-contentADR'>
              <form onSubmit={handleSubmit} className="form-containerADR">
            <div className="form-group">
                <label className="form-label">City:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Region:</label>
                <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Country Name:</label>
                <input
                    type="text"
                    name="country_name"
                    value={formData.country_name}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <button type="submit" className="form-button">Submit</button>
        </form>   
              </div>
          </div>
      </>
  )
}

export default Address