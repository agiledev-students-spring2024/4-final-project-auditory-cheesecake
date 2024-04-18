const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');


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

//profile picture upload route
router.post('/user/:id/profilePicture', asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { profilePicture } = req.body; //Base64 string
  
    if (!userId) {
        return res.status(400).json({ message: 'User ID must be provided' });
      }

    if (!profilePicture) {
      return res.status(400).send('No image provided');
    }
  
    try {
      //update the users profile picture in the db
      const user = await User.findByIdAndUpdate(userId, { profilePicture: profilePicture }, { new: true });
  
      res.json({ profilePicture: user.profilePicture });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save profile picture', error });
    }
  }));

module.exports = router;