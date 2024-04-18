const Session = require('../models/Session');
const SessionCache = require('../classes/SessionCache');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

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
      if (cachedSession.username !== username) {
        return res.status(404).json({ message: 'User session mismatch' });
      }
      return res.status(200).json({ message: 'User found and validated', user: { username } });
    }

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
  findUser
};
