const ResourceAllocation = require('../models/resource_allocation_model');
const Project = require('../models/project_model');
const Resources = require('../models/resource_allocation_model');

const projectController = {};

// Add a new project
projectController.addProject = async (req, res) => {
  try {
    const { id, name, domain, startDate, endDate, priority } = req.body;
    const project = new Project({ id, name, domain, startDate, endDate, priority });
    await project.save();
    res.status(201).json({ success: true, message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ success: false, message: 'Error adding project' });
  }
};

//Get the details of the project
projectController.getProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Error fetching projects' });
  }
};

// Allocate resources to a project
projectController.allocateResources = async (req, res) => {
  try {
    const { projectName, userName,email, startDate, endDate } = req.body;
    const project = await Project.findOne({name:projectName} );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    // Create a new ResourceAllocation instance
    const resourceAllocation = new ResourceAllocation({
      projectName,
      userName,
      email,
      startDate,
      endDate
    });

    // Save the resourceAllocation instance to the database
    await resourceAllocation.save();
    res.status(200).json({ success: true, message: 'Resources allocated successfully' });
  } catch (error) {
    console.error('Error allocating resources:', error);
    res.status(500).json({ success: false, message: 'Error allocating resources' });
  }
};

projectController.getResources = async (req, res) => {
  const userEmail = req.params.responseEmail;
 // console.log('UserEmail',userEmail)
  try {
      // Query your database to get projects where the userIds array contains the provided email
      const userProjects = await Resources.find({ email:userEmail });
      res.json(userProjects);
  } catch (error) {
      console.error('Error fetching user projects:', error);
      res.status(500).json({ error: 'Failed to fetch user projects' });
  }
};


projectController.getdetails = async (req, res) => {
  const projectName = req.params.projectName;
  console.log('projectName',projectName)
  try {
      // Query your database to get projects where the userIds array contains the provided email
      const userProjects = await Project.find({ name:projectName });
      console.log("projects in backend",userProjects);
      res.json(userProjects);
  } catch (error) {
      console.error('Error fetching user projects:', error);
      res.status(500).json({ error: 'Failed to fetch user projects' });
  }
};

module.exports = projectController;
