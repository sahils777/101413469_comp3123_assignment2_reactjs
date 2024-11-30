// src/components/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', formData);
      setSnackbarMsg(response.data.message);
      setOpenSnackbar(true);
      
      // Navigate to the login page after a short delay for user feedback
      setTimeout(() => {
        navigate('/login');
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      setSnackbarMsg(error.response?.data?.message || 'Error during signup');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 400, margin: '20px auto' }}>
      <Typography variant="h6">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="password"
          label="Password"
          fullWidth
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" color="primary" variant="contained" style={{ marginTop: 20 }}>
          Register
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

export default Signup;
