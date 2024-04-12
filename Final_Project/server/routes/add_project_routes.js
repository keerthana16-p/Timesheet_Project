// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controller/add_project_controller');

router.post('/add', projectController.addProject);
router.get('/projectdetails',projectController.getProjects)
router.get('/getdetails/:projectName',projectController.getdetails)

module.exports = router;
