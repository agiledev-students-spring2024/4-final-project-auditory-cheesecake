const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
const SessionCache = require('../classes/SessionCache');
const fs = require('fs');

const secretKey = process.env.JWT_SECRET_KEY;
const useMockData = process.env.USE_MOCK_DATA === 'true';

//func to load mock data
const loadMockData = () => {
    return JSON.parse(fs.readFileSync('./data/mock-users.json', 'utf8')); 
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: 'Missing parameters' });
        }
        if (useMockData) {
            const mockUsers = loadMockData();
            const user = mockUsers.find(u => u.username === username);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Invalid login credentials in mock data' });
            }
            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '7d' });
            res.send({ user, token });
        } else {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Invalid login credentials' });
            }
            const sessionId = await Session.createSession(username);
            SessionCache.addSession(sessionId, username);
            const lastLogin = new Date();
            await User.updateOne({ username }, {
                $set: {
                    sessionId: sessionId,
                    lastLogin: lastLogin,
                }
            });
            // change this to only required fields for JWT
            const tokenPayload = { 
                username: user.username,
                sessionId: sessionId,
                lastLogin: lastLogin.getTime(),
                id: user._id,
            };
            const frontendAccessiblePayload = {
                username: user.username,
                id: user._id,
            }
            const options = { expiresIn: '7d' };
            const token = jwt.sign(tokenPayload, secretKey, options);
            res.status(201).send({ message: 'User logged in, redirecting...', token, frontendAccessiblePayload });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    login,
};