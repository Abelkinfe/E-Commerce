import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [userImage, setUserImage] = useState(null);
 const navigate = useNavigate();

  useEffect(() => {
    if (submittedData) {
      const formData = new FormData();
      formData.append('name', submittedData.name);
      formData.append('email', submittedData.email);
      formData.append('password', submittedData.password);
      formData.append('image', userImage);

      axios.post('http://127.0.0.1:8000/api/register', formData)
        .then((response) => {
          console.log('Data sent successfully:', response.data);
          navigate('/home');
        })
        
        .catch((error) => {
          console.error('Error submitting data:', error);
        });
    }
  }, [submittedData, userImage]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    setSubmittedData(data);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setUserImage(selectedImage);
  };

  return (
    <div className="login-form-container2">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="form-control2"
          />
          {errors.name && <span className="error-message">This field is required</span>}
        </div>
        <div className="form-group2">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="form-control2"
          />
          {errors.email && <span className="error-message">This field is required</span>}
        </div>
        <div className="form-group2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="form-control"
          />
          {errors.password && <span className="error-message">This field is required</span>}
        </div>
        <div className="form-group2">
          <label htmlFor="user_img">User Image:</label>
          <input
            type="file"
            id="user_img"
            onChange={handleImageChange}
            className="form-control2"
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <p>
         if you have an account? .<Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
