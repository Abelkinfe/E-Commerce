import { useState } from 'react';
import useAuthContext from '../context/AuthContext'
import './register.css';
import axios from "../api/axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userimage: null,
  });
  const navigate = useNavigate();
  const { getUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'userimage') {
      setFormData({
        ...formData,
        userimage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('userimage', formData.userimage);
    console.log(formData.email);
    try {
      const response = await axios.post('api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const token = response.data.token; 
      localStorage.setItem('token', token);
      await getUser();
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="login-form-container2">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group2">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control2"
            required
          />
        </div>
        <div className="form-group2">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control2"
            required
          />
        </div>
        <div className="form-group2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control2"
            required
          />
        </div>
        <div className="form-group2">
          <label>User Image:</label>
          <input
            type="file"
            name="userimage"
            onChange={handleChange}
            className="form-control2"
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <p>
        if you have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
