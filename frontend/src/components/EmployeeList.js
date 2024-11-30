import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, TextField, Snackbar, Modal, Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchParams, setSearchParams] = useState({ department: '', position: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchEmployees = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setSnackbarMessage("No authentication token provided.");
        setSnackbarOpen(true);
        return;
    }
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await axios.get(`http://localhost:3000/api/v1/emp/employees/search?${queryString}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error.response ? error.response.data : error.message);
      setSnackbarMessage("Failed to fetch employees: " + (error.response ? error.response.data.message : "Internal Server Error"));
      setSnackbarOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearchChange = (e) => {
    setSearchParams(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    fetchEmployees();
  };

  const handleCreateEmployee = () => {
    navigate('/employees/add');
  };

  const handleUpdateEmployee = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/v1/emp/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employees.filter(employee => employee._id !== employeeId));
        setSnackbarMessage("Employee deleted successfully.");
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error deleting employee:', error);
        setSnackbarMessage("Error deleting employee.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleOpenModal = (employee) => {
    setCurrentEmployee(employee);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Paper style={{ margin: '20px', padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Employee List</Typography>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          name="department"
          label="Department"
          value={searchParams.department}
          onChange={handleSearchChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          name="position"
          label="Position"
          value={searchParams.position}
          onChange={handleSearchChange}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Button variant="contained" color="primary" onClick={handleCreateEmployee} style={{ marginBottom: '20px' }}>
        Add Employee
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department || 'N/A'}</TableCell>
              <TableCell>${employee.salary}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateEmployee(employee._id)}
                  style={{ marginRight: '10px' }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteEmployee(employee._id)}
                  style={{ marginRight: '10px' }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal(employee)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
          width: '500px',
          position: 'relative' // Allows absolute positioning inside
        }}>
          <IconButton
            onClick={handleCloseModal}
            style={{ position: 'absolute', right: '10px', top: '10px' }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" style={{ marginBottom: '10px' }}>
            View Employee Details
          </Typography>
          <TextField
            label="First Name"
            defaultValue={currentEmployee.firstName}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            defaultValue={currentEmployee.lastName}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            defaultValue={currentEmployee.email}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Position"
            defaultValue={currentEmployee.position}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department"
            defaultValue={currentEmployee.department || 'N/A'}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            defaultValue={currentEmployee.salary}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            fullWidth
            margin="normal"
          />
        </Box>
      </Modal>
    </Paper>
  );
};

export default EmployeeList;
