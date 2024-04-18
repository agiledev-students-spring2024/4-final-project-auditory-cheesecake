const mongoose = require('mongoose');

const surveyResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responses: [{
    question: String,
    answer: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = SurveyResponse;



