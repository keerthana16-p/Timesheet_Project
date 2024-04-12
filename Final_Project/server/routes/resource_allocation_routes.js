const express = require('express');
const router = express.Router();
const projectController = require('../controller/add_project_controller');

router.post('/allocate-resources', projectController.allocateResources);
router.get('/getResources/:responseEmail', projectController.getResources);
module.exports = router;
