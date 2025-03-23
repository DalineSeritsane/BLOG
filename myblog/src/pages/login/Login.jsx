import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message before each login attempt

    try {
      const response = await axios.post(`http://${process.env.REACT_APP_API_URL}/api/users/login`, {
        username,
        password,
      });

      if (response.data.auth) {
        setMessage('Login successful!');
        localStorage.setItem('authToken', response.data.token); // Store token securely
        navigate('/all-blogs');
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
      
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="loginInput"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="loginInput"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
      <br />
      <div className="register">
        <p>Don't have an account? Register here!</p>
        <Link to="/register">
          <button className="loginRegisterButton">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
