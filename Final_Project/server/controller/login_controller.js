const bcrypt = require('bcryptjs');
const User = require('../models/user_model');

const jwt = require('jsonwebtoken');
// Controller function to validate user login
exports.validateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user is not found, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ role:user.email,email:user.email }, "timesheet");

    // If user is found and password matches, return success
    res.status(200).json({ message: 'Login successful', user: { email: user.email, role: user.role },token });
  } catch (error) {
    console.error('Error validating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
