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

const submitResponses = (req, res) => {
  console.log(req.body); // Log the responses received
  res.status(200).send({ message: 'Responses received successfully!' });
};

module.exports = { getQuestions, submitResponses };
