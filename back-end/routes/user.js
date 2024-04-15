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
router.post('/editUserProfile', async (req, res) => {
    console.log("Received edit user request");
    console.log("Edit user Request body", req.body);
    try {
        const {id, username, email, firstName, lastName, phoneNumber} = req.body;

        if (username=='' || email=='' || firstName=='' || lastName=='' || phoneNumber=='') {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        if (process.env.USE_MOCK_DATA === 'true') {
            const mockUsers = loadMockData();

            // Get current user
            const userIndex = mockUsers.findIndex(u => String(u.id) === String(id));
            console.log("User Index:", userIndex);

            if (userIndex === -1){
                return res.status(404).send({ message: 'User not found in mock data' });
            }

            // need to check to make sure username isn't already taken in data
            mockUsers[userIndex].username = username;
            // need to check to make sure email doesn't already exist in data
            mockUsers[userIndex].email = email;
            
            mockUsers[userIndex].firstName = firstName;
            mockUsers[userIndex].lastName = lastName;

            // need to check to make sure phone number doesn't already exist in data
            mockUsers[userIndex].phoneNumber = phoneNumber;
            fs.writeFileSync(filePath, JSON.stringify(mockUsers, null, 2));
            res.status(200).send({ message: 'User profile updated successfully in mock data' });
        } else {
            // if the username already exists
            // if the email is already in the system
            // if the phone number is already in the system
            res.status(501).send({ message: 'Not implemented for real data yet' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to edit user profile', error: error.message });
    }
});

//Change user password
router.post('/changePassword', async (req, res) => {
    try{
        const { id, oldPassword, newPassword } = req.body;

        if (process.env.USE_MOCK_DATA === 'true') {
            let mockUsers = loadMockData();
            const userIndex = mockUsers.findIndex(u => String(u.id) === String(id));

            if (userIndex === -1){
                return res.status(404).send({ message: 'User not found in mock data' });
            }

            const user = mockUsers[userIndex];
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch){
                return res.status(401).send({ message: 'Old password is incorrect' });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 8);
            mockUsers[userIndex].password = hashedNewPassword;
            fs.writeFileSync(filePath, JSON.stringify(mockUsers, null, 2));
            res.status(200).send({ message: 'Password updated successfully in mock data' });
        }else{
            res.status(501).send({ message: 'Not implemented for real data yet' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to change password', error: error.message });
    }
});

module.exports = router;