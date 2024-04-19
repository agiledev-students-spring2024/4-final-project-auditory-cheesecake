const express = require('express');

console.log('Using mock data:', process.env.USE_MOCK_DATA);
console.log('Using secret key:', process.env.JWT_SECRET_KEY);

const router = express.Router();
const { findUser, login, logout, register } = require('../controllers/auth');

// register user
router.post('/register', register);

//login user
router.post('/login', login);

// logout user
router.post('/logout', logout);

// find user
router.post('/findUser', findUser);

module.exports = router;

