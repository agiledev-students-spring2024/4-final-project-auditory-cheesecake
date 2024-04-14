const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

console.log('Using mock data:', process.env.USE_MOCK_DATA);

let User;
if (process.env.USE_MOCK_DATA !== 'true') {
    User = require('../models/User');
}

const filePath = path.join(__dirname, '../data/mock-users.json'); //filepath for mock data

const router = express.Router();
const { findUser } = require('../controllers/auth');


router.get('/findUser', findUser);


//func to load mock data
const loadMockData = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')); 
};


//register user
router.post('/register', async (req, res) => {
    console.log("Received registration request");
    try {
        const { firstName, lastName, email, phoneNumber, username, password } = req.body;

        // Check if the user already exists
        let existingUser = null;
        if (process.env.USE_MOCK_DATA === 'true') {
            const mockUsers = loadMockData();
            existingUser = mockUsers.find(user => user.email === email);
        } else {
            existingUser = await User.findOne({ email: email });
        }

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password outside of the condition to ensure it's available in both branches
        const hashedPassword = await bcrypt.hash(password, 8);

        // Proceed with registration if user doesn't exist
        if (process.env.USE_MOCK_DATA === 'true') {
            const mockUsers = loadMockData();
            const newUser = { id: mockUsers.length + 1, username, email, password: hashedPassword, firstName, lastName, phoneNumber };
            mockUsers.push(newUser);
            fs.writeFileSync(filePath, JSON.stringify(mockUsers, null, 2)); // Write to the mock data file
            res.status(201).send({ message: 'User registered successfully in mock data' });
        } else {
            const user = new User({ username, email, password: hashedPassword, firstName, lastName, phoneNumber });
            console.log(user)
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(400).json({ message: 'Registration failed: ' + error.message });
    }
});



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


//login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (process.env.USE_MOCK_DATA === 'true') {
            const mockUsers = loadMockData();
            const user = mockUsers.find(u => u.email === email);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Invalid login credentials in mock data' });
            }
            const token = jwt.sign({ id: user.id }, 'secretKey');
            res.send({ user, token });
        } else {
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Invalid login credentials' });
            }
            const token = jwt.sign({ id: user._id }, 'secretKey');
            // change this to only required fields for JWT
            const jwtToken = { ...user };
            res.send({ user, token });
        }
    } catch (error) {
        res.status(500).send(error);
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

