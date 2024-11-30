const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.', user_id: newUser._id });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ status: false, message: 'Invalid Username and password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful.', jwt_token: token });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
