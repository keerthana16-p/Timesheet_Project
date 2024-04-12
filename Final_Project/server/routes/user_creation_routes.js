const express = require('express');
const userController = require('../controller/user_creation_controller');

const router = express.Router();

// Route for creating a new user
router.post('/create', userController.createUser);
router.get('/userdetails',userController.getUsers);
router.get('/userdetails/:email',userController.getSpecificUser);
module.exports = router;
