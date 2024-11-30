import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set logged-in status based on token presence
  }, []); // Run this effect only once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token on logout
    setIsLoggedIn(false); // Update the state to reflect logged-out status
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>
        <Box display="flex">
          {/* Render buttons based on login status */}
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/employees">
                Employees
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
