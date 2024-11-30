const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://assign2:0fk4xnNXuQDJurGh@assign2.xn8ms.mongodb.net/?retryWrites=true&w=majority&appName=Assign2';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};
module.exports = connectDB;
