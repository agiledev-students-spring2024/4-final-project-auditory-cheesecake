const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

console.log('Using mock data:', process.env.USE_MOCK_DATA);
console.log('Using secret key:', process.env.JWT_SECRET_KEY);

let User;
if (process.env.USE_MOCK_DATA !== 'true') {
    User = require('../models/User');
}

const filePath = path.join(__dirname, '../data/mock-users.json'); //filepath for mock data

const router = express.Router();
const { findUser } = require('../controllers/auth');


router.post('/findUser', findUser);

//func to load mock data
const loadMockData = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')); 
};

// generate a random session id
const generateSessionId = () => {
    return crypto.randomBytes(32).toString('hex');
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
            // console.log(user) For testing purposes only
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(400).json({ message: 'Registration failed: ' + error.message });
    }
});


//login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: 'Missing parameters' });
        }
        if (process.env.USE_MOCK_DATA === 'true') {
            const mockUsers = loadMockData();
            const user = mockUsers.find(u => u.username === username);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Invalid login credentials in mock data' });
            }
            const token = jwt.sign({ id: user.id }, 'secretKey');
            res.send({ user, token });
        } else {
            const user = await User.findOne({ username });
            const sessionId = user.sessionId;
            let newSessionId = generateSessionId();
            if (sessionId) {
                while (newSessionId === sessionId) {
                    newSessionId = generateSessionId();
                }
            }
            const lastLogin = user.lastLogin;
            const newLastLogin = Date.now();
            const test = await bcrypt.compare(password, user.password);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Invalid login credentials' });
            }
            await User.updateOne({ username }, {
                $set: {
                    sessionId: newSessionId,
                    lastLogin: newLastLogin
                }
            });
            // change this to only required fields for JWT
            const tokenPayload = { 
                username: user.username,
                sessionId: newSessionId,
                lastLogin: newLastLogin,
                id: user._id,
            };
            const frontendAccessiblePayload = {
                username: user.username,
                id: user._id,
            }
            const options = { expiresIn: '7d' };
            const secretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(tokenPayload, secretKey, options);
            res.status(201).send({ message: 'User logged in, redirecting...', token, frontendAccessiblePayload });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});



module.exports = router;

