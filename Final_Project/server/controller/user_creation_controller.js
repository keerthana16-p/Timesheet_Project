const User = require('../models/user_model');
const nodemailer = require('nodemailer');

// Function to send email to user
function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'keerthanap@jmangroup.com',
      pass: 'Jman@600113'
    }
  });

  const emailContent = `
    Welcome!
    Your account has been created with the default password: user
    Please login to our website using this password
  `;

  const mailOptions = {
    from: 'keerthanap@jmangroup.com',
    to: email,
    subject: 'Welcome to Our Website!',
    text: emailContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Controller function to create a new user
exports.createUser = async (req, res) => {
  console.log(req.body)
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create a new user and save it to the database
    const newUser = new User({ firstName, lastName, email, password, role });

    // Save the new user to the database
    await newUser.save();

    // Send email to the new user
    sendEmail(email);

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//Controller to get the details of user
exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

exports.getSpecificUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
