import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Getting the employee ID from the URL
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    if (isEdit && id) {
      axios
        .get(`http://localhost:3000/api/v1/emp/employees/${id}`)
        .then((response) => setEmployeeData(response.data))
        .catch((error) => console.error('Error fetching employee data:', error));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Employee data being sent to backend:', employeeData);

    try {
      const token = localStorage.getItem('token');
      if (isEdit) {
        await axios.put(`http://localhost:3000/api/v1/emp/employees/${id}`, employeeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Employee updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/v1/emp/employees', employeeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Employee added successfully');
      }
      navigate('/employees');
    } catch (error) {
      console.error(isEdit ? 'Error updating employee' : 'Error adding employee', error);
      alert(isEdit ? 'Error updating employee' : 'Error adding employee');
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}>
      <Typography variant="h6">{isEdit ? 'Edit Employee' : 'Add Employee'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          value={employeeData.firstName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          value={employeeData.lastName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={employeeData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="position"
          label="Position"
          fullWidth
          value={employeeData.position}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="department"
          label="Department"
          fullWidth
          value={employeeData.department}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          name="salary"
          label="Salary"
          type="number"
          fullWidth
          value={employeeData.salary}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </Button>
      </form>
    </Paper>
  );
};

export default EmployeeForm;
