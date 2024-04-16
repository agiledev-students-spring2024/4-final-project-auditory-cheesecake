const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const userController = require('../controllers/user');

const filePath = path.join(__dirname, '../data/mock-users.json');

const loadMockData = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')); 
};

//View User Profile Info
router.get('/user/:id', userController.getUserById);

// Edit user profile user
router.post('/editUserProfile', userController.editUserProfile);

//Change user password
router.post('/changePassword', userController.changeUserPassword);

module.exports = router;