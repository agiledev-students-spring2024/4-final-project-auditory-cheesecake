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
        audio: process.env.PUBLIC_URL + '/mondayMonday.mp4', 
      },
      {
        questionText: 'Rate this song out of 5 (1 is worst, 5 is best)',
        options: ['1', '2', '3', '4', '5'],
        audio: process.env.PUBLIC_URL + '/symphonyNo3.mp4', 
      },
]

exports.getQuestions = (req, res) => {
    res.json(questions);
  };

  exports.submitResponses = (req, res) => {
    console.log(req.body); // For demonstration, log the received responses.
    res.status(200).send({ message: 'Responses received successfully!' });
  };

  
