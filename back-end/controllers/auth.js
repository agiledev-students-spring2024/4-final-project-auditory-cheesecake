const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const SessionCache = require('../classes/SessionCache');
const User = require('../models/User');
const Session = require('../models/Session');

const secretKey = process.env.JWT_SECRET_KEY;
const useMockData = process.env.USE_MOCK_DATA === 'true';

//func to load mock data
const loadMockData = () => {
  return JSON.parse(fs.readFileSync('./data/mock-users.json', 'utf8')); 
};

// login function 
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

// logout function
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

// register user
const register = async (req, res) => {
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
}

const findUser = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const { username, sessionId } = decoded;

    const cachedSession = SessionCache.getSession(sessionId);
    if (cachedSession) {
      // console.log('Cache hit:', cachedSession);
      if (cachedSession.username !== username) {
        return res.status(404).json({ message: 'User session mismatch' });
      }
      return res.status(200).json({ message: 'User found and validated', user: { username } });
    }

    // console.log('Cache miss, fetching from db');
    const session = await Session.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found or expired' });
    }
    if (session.username !== username) {
      return res.status(404).json({ message: 'User session mismatch' });
    }

    return res.status(200).json({ message: 'User found and validated', user: { username } });
  }
  catch (error) {
    console.error('Token invalid:', error);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = {
  findUser,
  login,
  logout,
  register,
};
