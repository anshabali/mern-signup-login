import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons

function Signup() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  // State to handle form input data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // Function to handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Function to validate form fields
  function validateForm() {
    let formErrors = {};

    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) formErrors.email = 'Invalid email format';
    if (!formData.password) formErrors.password = 'Password is required';
    if (!validatePassword(formData.password)) {
      formErrors.password = 'Password must have at least 1 special character, 1 capital letter, and be 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  // Helper function to validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to validate password (1 special char, 1 capital, min 8 characters)
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  }

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3001/register', formData)
        .then(result => {
          console.log(result);
          navigate('/login');
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          let formErrors = {};
          formErrors.email = err.response.data.msg; // Display server error for email
          setErrors(formErrors);
        });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" 
         style={{ background: 'linear-gradient(135deg, rgb(10, 25, 50), rgb(30, 60, 90))' }}> {/* Dark gradient */}
      <div className="card p-4"
           style={{
             width: '400px',
             backgroundColor: 'white', // Change card background to white
             border: '1px solid #ced4da',
             borderRadius: '10px',
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
           }}>
        <h3 className="text-center text-dark mb-4">Sign Up</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="form-group mb-3">
            <label htmlFor="username" className="text-dark">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-dark"><FaUser /></span>
              <input 
                type="text" 
                className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
                id="username" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
                style={{ backgroundColor: 'rgba(245, 245, 245, 1)', color: 'black' }} // Light input field
              />
            </div>
            {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}
          </div>

          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="text-dark">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-dark"><FaEnvelope /></span>
              <input 
                type="email" 
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                style={{ backgroundColor: 'rgba(245, 245, 245, 1)', color: 'black' }} // Light input field
              />
            </div>
            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="form-group mb-3">
            <label htmlFor="password" className="text-dark">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-dark"><FaLock /></span>
              <input 
                type="password" 
                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={{ backgroundColor: 'rgba(245, 245, 245, 1)', color: 'black' }} // Light input field
              />
            </div>
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword" className="text-dark">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-dark"><FaLock /></span>
              <input 
                type="password" 
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
                style={{ backgroundColor: 'rgba(245, 245, 245, 1)', color: 'black' }} // Light input field
              />
            </div>
            {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn w-100"
            style={{
              background: 'linear-gradient(to right, rgb(0, 0, 128), rgb(0, 0, 200))', // Dark blue gradient for button
              color: 'white',
            }}>
            Sign Up
          </button>
        </form>

        {/* Already signed up section */}
        <div className="mt-2 text-center">
          <p className="small text-dark">Already signed up? <Link to="/login" className="text-decoration-none text-primary">Log In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
 