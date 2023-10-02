const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user API routes here
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
