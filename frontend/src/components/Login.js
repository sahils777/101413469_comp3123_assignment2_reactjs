// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', loginData);
      localStorage.setItem('token', response.data.jwt_token);
      setSnackbarMsg('Login successful');
      setOpenSnackbar(true);

      // Navigate to the Employee List page after a short delay
      setTimeout(() => {
        navigate('/employees'); // Redirect to Employee List page
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      console.error('Login error:', error.response || error); // Log the error for debugging
      setSnackbarMsg(error.response?.data?.message || 'Login failed');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 400, margin: '20px auto' }}>
      <Typography variant="h6">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          fullWidth
          type="email"
          value={loginData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={loginData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" color="primary" variant="contained" style={{ marginTop: 20 }}>
          Login
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMsg}
      />
    </Paper>
  );
};

export default Login;
