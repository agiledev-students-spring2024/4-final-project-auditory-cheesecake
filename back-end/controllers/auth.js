

const verifyUser = (user, username, sessionIdHash, lastLogin) => {
  // if any of the parameters are missing, return false

  // if the user's username does not match the username provided, return false
  // if the user's sessionIdHash does not match the sessionIdHash provided, return false
  // if the user's lastLogin does not match the lastLogin provided, return false
  // if all checks pass, return true
  return true;
}

const findUser = (req, res) => {
  const { username, sessionIdHash, lastLogin } = req.query;
  // if any of the parameters are missing, return false
  if (!username || !sessionIdHash || !lastLogin) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  // search mongoDB for user with username
  // if found, verify user
    // if verified, return true
    // else return false
  // else return false

  // placeholder for now
  console.log(username, sessionIdHash, lastLogin);
  return res.status(200).json({ message: 'User found and validated' });
}

module.exports = {
  findUser
}