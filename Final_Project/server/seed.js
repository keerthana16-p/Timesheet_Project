const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/user_model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/final_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Once connected, seed one user data
  seedUserData();
})
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Function to seed user data
async function seedUserData() {
  try {
    // Sample user data
    const userData = {
      firstName: 'keerthana',
      lastName: 'palanisamy',
      email: 'keerthana@gmail.com',
      password: 'password1',
      role: 'admin'
    };

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user document with hashed password
    const newUser = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword, // Store the hashed password
      role: userData.role
    });

    // Save the user to the database
    await newUser.save();

    console.log('User data seeded successfully');
  } catch (error) {
    console.error('Error seeding user data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
  }
}
