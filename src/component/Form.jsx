import React from 'react';
import { useForm } from 'react-hook-form';
import './Form.css'; // Import your CSS file for styling

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Submitted:', data);
        // You can handle form submission logic here
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: true })}
                        className="form-control"
                    />
                    {errors.name && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: true })}
                        className="form-control"
                    />
                    {errors.password && <span className="error-message">This field is required</span>}
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>.
            </p>
        </div>
    );
};

export default LoginForm;
