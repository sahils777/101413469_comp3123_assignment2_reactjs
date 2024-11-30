import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes for the employee list and forms */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<EmployeeForm isEdit={false} />} /> {/* For Add Employee */}
        <Route path="/employees/edit/:id" element={<EmployeeForm isEdit={true} />} /> {/* For Edit Employee */}
      </Routes>
    </Router>
  );
}

export default App;
