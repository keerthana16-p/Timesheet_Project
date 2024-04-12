const express = require('express');
const loginController = require('../controller/login_controller');

const router = express.Router();

// Route for validating user
router.post('/login', loginController.validateUser);

module.exports = router;
