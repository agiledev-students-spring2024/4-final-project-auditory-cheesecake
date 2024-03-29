const express = require('express');
const router = express.Router();
const { getQuestions, submitResponses } = require('../controllers/survey');

router.get('/questions', getQuestions);
router.post('/responses', submitResponses);

module.exports = router;