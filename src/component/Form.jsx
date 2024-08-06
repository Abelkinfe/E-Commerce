import React,{ useState } from 'react';
import useAuthContext from '../context/AuthContext'
import './Form.css';

const LoginForm = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const { login } = useAuthContext();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        login({ email, password });
    }
   


    return (
        <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
           
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
    );
};

export default LoginForm;
