let User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

const findUser = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  try {
    // Decode the token to get the username, sessionId, and lastLogin
    const decoded = jwt.verify(token, secretKey);
    const { username, sessionId, lastLogin } = decoded;
    const user = await User.findOne({ username, sessionId, lastLogin });
    // If no user is found with the username
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({ message: 'User found and validated' });
  }
  catch (error) {
    console.error('Token invalid:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  findUser
}