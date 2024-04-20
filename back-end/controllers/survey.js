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
    questionText: 'In the following questions, you will hear a song. Please rate that song out of 5 (1 is worst, 5 is best). If you need to listen to it again, hit the replay button!',
    options: ['Proceed'],
  },
  {
    questionText: 'Monday Monday',
    options: ['1', '2', '3', '4', '5'],
    audio: '/mondayMonday.mp4', 
  },
  {
    questionText: 'Symphony No. 3',
    options: ['1', '2', '3', '4', '5'],
    audio: '/symphonyNo3.mp4', 
  },
  {
    questionText: 'Hell N Back',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Bakar_-_Hell_N_Back_Official_Audio_ft._Summer_Walker.mp3', 
  },
  {
    questionText: 'Beautiful People',
    options: ['1', '2', '3', '4', '5'],
    audio: '/beautifulPeople.mp4', 
  },
  {
    questionText: 'Deeper Well',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Country_song_1.m4a', 
  },
  {
    questionText: 'Tucson Too Late',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Country_Song_2.m4a', 
  },
  {
    questionText: 'Love Story',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Country_Song_3.m4a', 
  },
  {
    questionText: 'Cellophane',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Emeryld_-_Cellophane_OFFICIAL_VERSION.mp3', 
  },
  {
    questionText: 'Gunsnroses',
    options: ['1', '2', '3', '4', '5'],
    audio: '/gunsnroses.mp3', 
  },
  {
    questionText: 'Live Your Life',
    options: ['1', '2', '3', '4', '5'],
    audio: '/liveYourLife.mp4', 
  },
  {
    questionText: 'Miguel',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Miguel_-_Caramelo_Duro_Audio_ft._Kali_Uchis.mp3', 
  },
  {
    questionText: 'Nirvana',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Nirvana.mp3', 
  },
  {
    questionText: 'Texas Tornado',
    options: ['1', '2', '3', '4', '5'],
    audio: '/texasTornado.mp4', 
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
