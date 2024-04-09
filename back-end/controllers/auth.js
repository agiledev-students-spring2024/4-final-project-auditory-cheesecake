let User = require('../models/user');

const verifyUser = (user, username, sessionIdHash, lastLogin) => {
  // if any of the parameters are missing, return false
  if (!user || !username || !sessionIdHash || !lastLogin) {
    return false;
  }
  // if the user's username does not match the username provided, return false
  if (user.username !== username) {
    return false;
  }
  // if the user's sessionIdHash does not match the sessionIdHash provided, return false
  if (user.sessionIdHash !== sessionIdHash) {
    return false;
  }
  // if the user's lastLogin does not match the lastLogin provided, return false
  if (user.lastLogin !== lastLogin) { // assuming lastLogin is stored in a format that can be directly compared
    return false;
  }
  // if all checks pass, return true
  return true;
};

const findUser = async (req, res) => {
  const { username, sessionIdHash, lastLogin } = req.query;
  if (!username || !sessionIdHash || !lastLogin) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  try {
    const user = await User.findOne({ username });
    // If no user is found with the username
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Verify the user with the provided sessionIdHash and lastLogin
    const verified = verifyUser(user, username, sessionIdHash, lastLogin);
    if (verified) {
      return res.status(200).json({ message: 'User found and validated' });
    } else {
      return res.status(401).json({ message: 'User validation failed' });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  findUser
}