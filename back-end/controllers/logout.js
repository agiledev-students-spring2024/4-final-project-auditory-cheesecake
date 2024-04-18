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

const logout = async (req, res) => {
    try {
        if (useMockData) {
            return res.status(200).send({ message: 'User logged out in mock data' });
        }
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Missing parameters' });
        }
        const decoded = jwt.verify(token, secretKey);
        const { username, sessionId } = decoded;
        const session = await Session.getSession(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found or expired' });
        }
        if (session.username !== username) {
            return res.status(404).json({ message: 'User session mismatch' });
        }
        await Session.deleteSession(sessionId);
        SessionCache.removeSession(sessionId);
        return res.status(200).json({ message: 'User logged out' });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Logout failed: ' + error.message });
    }
};

module.exports = {
    logout
};