const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); 

const app = express();

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:3002', // Allow requests from your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

connectDB();

const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Webpage! </h1><p>This is the home page for my vercel deployment</p>');
});
