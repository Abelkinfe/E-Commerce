import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext';
import './register.css';
import axios from "../api/axios";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', userimage: null
  });
  const navigate = useNavigate();
  const { getUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
    try {
      const response = await axios.post('api/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      localStorage.setItem('token', response.data.token);
      await getUser();
      navigate('/home');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-reg">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-reg">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-reg">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-reg">
          <label>User Image:</label>
          <input type="file" name="userimage" onChange={handleChange} />
        </div>
        <button className='rg-btn' type="submit">Submit</button>
      </form>
      <p>if you have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
};

export default Register;
