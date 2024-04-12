const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/login_routes');
const userRoutes = require('./routes/user_creation_routes');
const projectRoutes = require('./routes/add_project_routes');
const resourceAllocationRoutes = require('./routes/resource_allocation_routes');
const feedbackRoutes = require('./routes/feedback_routes');
const timeSheet=require("./routes/newtimesheet_routes")
const app = express();
app.use(cors());
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/final_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Mount user creation routes
app.use('/api/users', userRoutes);

//Mount add project routes
app.use('/api/projects', projectRoutes);

//Mount resource allocation routes
app.use('/api/resources', resourceAllocationRoutes);

//Mount feedback routes 
app.use('/api/feedback', feedbackRoutes);


//Mount timesheet
app.use('/api/timesheet',timeSheet)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
