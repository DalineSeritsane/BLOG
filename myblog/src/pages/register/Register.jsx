import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Declare state for email
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any existing messages

    try {
      const response = await axios.post(`http://${process.env.REACT_APP_API_URL}/api/users/register`, {
        username,
        email,
        password,
      }); // Replace with environment variable

      if (response.data.success) {
        setMessage('Registration successful! Please log in.');
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        setMessage(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error registering. Please try again.');
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="registerInput"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="registerInput"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="registerInput"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        className="registerLoginButton"
      >
        Already have an account? Login
      </button>
    </div>
  );
};

export default Register;
