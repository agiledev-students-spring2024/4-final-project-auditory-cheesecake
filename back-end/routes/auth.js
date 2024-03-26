const express = require('express');
const router = express.Router();
const { findUser } = require('../controllers/auth');

router.get('/findUser', findUser);

module.exports = router;