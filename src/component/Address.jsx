import React, { useState, useEffect } from 'react';
import useAuthContext from '../context/AuthContext';
import './Address.css'
import axios from '../api/axios';
import {  animate, delay, motion } from "framer-motion"
const Address = () => {
    const anifo= {
        int: {
            x:-1000
          },
          ani: {
            x: 0,
            transition: {
              delay: 1.5,
              type: 'spring',
              stiffness:500
            }
          }
    }

    const sideani = {
        ini: {
            x:-700
        },
        ani: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness:500
            }
        }
    }
    const [formData, setFormData] = useState({
        city: '',
        region: '',
        country_name: ''
    });
  
    const { user, getUser } = useAuthContext();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/address', formData);
            console.log(response.data);
           
        } catch (error) {
            console.error(error);
            
        }
    };
    const BASE_URL = import.meta.VITE_BASE_URL;
  return (
      <>
          <div className='AppADR'>
              <motion.div variants={sideani} animate='ani' initial='ini' className='address-side'>
              {user && (
                  <div className='user-containerADR'>
                      <div className='circle-inageADR'>
                         <img src={`${BASE_URL}storage/${user.user_image}`} alt="" className="user-image" />
                      </div>
                      <span className="username">{user.name}</span>
                      </div>
                       )}
              </motion.div>

              <div className='main-contentADR'>
              <motion.div variants={anifo} initial='ini' animate='ani'>
                   
              <form  onSubmit={handleSubmit} className="form-containerADR">
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
                      </motion.div>
              </div>
          </div>
      </>
  )
}

export default Address