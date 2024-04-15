const questions = [
  {
    questionText: 'I confirm that I am 18 years or older',
    options: ['Yes', 'No'],
  },
  {
    questionText: "How are you feeling today?",
    options: ['Not Good', 'Average', 'Better than average', 'Amazing!'],
  },
  {
    questionText: 'Who is your favorite artist?',
    options: ['Drake', 'Taylor Swift', 'Rihanna', 'Billie Eilish', 'The Weeknd'],
  },
  {
    questionText: 'Rate this song out of 5 (1 is worst, 5 is best)',
    options: ['1', '2', '3', '4', '5'],
    audio: '/mondayMonday.mp4', 
  },
  {
    questionText: 'Rate this song out of 5 (1 is worst, 5 is best)',
    options: ['1', '2', '3', '4', '5'],
    audio: '/symphonyNo3.mp4', 
  },
];

const getQuestions = (req, res) => {
  res.json(questions);
};

const SurveyResponse = require('../models/SurveyResponses');

const submitResponses = async (req, res) => {
  try {
    if (!req.body.userId) {
      console.log('User is not authenticated or user ID is missing');
      return res.status(400).send({ message: 'User is not authenticated or user ID is missing' });
    }

    const userId = req.body.userId;
    const responses = req.body.responses;

    const surveyResponse = new SurveyResponse({
      userId,
      responses,
    });


    const savedResponse = await surveyResponse.save();
    res.status(200).send({ message: 'Responses received successfully!', savedResponse });
  } catch (error) {
    console.error('Error in submitResponses:', error);
    res.status(500).send({ message: 'Error saving responses', error });
  }
};

const getSurveyResponses = async (req, res) => {
  try {
    const { userId } = req.query;  // Changed from req.body to req.query
    if (!userId) {
      return res.status(400).json({ message: 'User is not authenticated or user ID is missing' });
    }

    const responses = await SurveyResponse.find({ userId }).populate('userId', 'username email');
    res.status(200).json(responses);
  } catch (error) {
    console.error('Failed to fetch responses:', error);
    res.status(500).json({ message: 'Failed to fetch responses' });
  }
};



module.exports = { getQuestions, submitResponses, getSurveyResponses };
