const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Session = require('../models/Session');

console.log('Using mock data:', process.env.USE_MOCK_DATA);
console.log('Using secret key:', process.env.JWT_SECRET_KEY);

const filePath = path.join(__dirname, '../data/mock-users.json'); //filepath for mock data

const router = express.Router();
const { findUser } = require('../controllers/auth');
const { login } = require('../controllers/login');

router.post('/findUser', findUser);

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

        // Proceed with registration if user doesn't exist
        if (process.env.USE_MOCK_DATA === 'true') {
            const mockUsers = loadMockData();
            const newUser = { id: mockUsers.length + 1, username, email, password: password, firstName, lastName, phoneNumber };
            mockUsers.push(newUser);
            fs.writeFileSync(filePath, JSON.stringify(mockUsers, null, 2)); // Write to the mock data file
            res.status(201).send({ message: 'User registered successfully in mock data' });
        } else {
            const user = new User({ username, email, password: password, firstName, lastName, phoneNumber });
            console.log(user)
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(400).json({ message: 'Registration failed: ' + error.message });
    }
});


//login user
router.post('/login', login);

module.exports = router;

