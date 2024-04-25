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
    spotifyURL: "https://open.spotify.com/track/3dXUhi35uNdJ1eYewv1XBK",
    youtubeURL: "https://www.youtube.com/watch?v=VsIjOKCxRSE",
    appleMusicURL: "https://music.apple.com/us/album/monday-monday-single/1440795791?i=1440795944"
  },
  {
    questionText: 'Symphony No. 3',
    options: ['1', '2', '3', '4', '5'],
    audio: '/symphonyNo3.mp4', 
    spotifyURL:"https://open.spotify.com/artist/0lluGWFB8hZ6HFktcH6kkr",
    youtubeURL:"https://www.youtube.com/watch?v=208UlU2DA9Y",
    appleMusicURL:"https://music.apple.com/us/music-video/r-schumann-symphony-no-3-in-e-flat-major-op-97-rheinische/1664991156"
  },
  {
    questionText: 'Hell N Back',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Bakar_-_Hell_N_Back_Official_Audio_ft._Summer_Walker.mp3', 
    spotifyURL:"https://open.spotify.com/track/0rVJ6v23RQozOIvr1YotJP",
    youtubeURL:"https://www.youtube.com/watch?v=BdrNvQ4YCng",
    appleMusicURL: "https://music.apple.com/us/album/hell-n-back-feat-summer-walker-bonus-track/1693877094?i=1693877595"
  },
  {
    questionText: 'Beautiful People',
    options: ['1', '2', '3', '4', '5'],
    audio: '/beautifulPeople.mp4', 
    spotifyURL:"https://open.spotify.com/track/2aIB1CdRRG7YLBu9hNw9nR",
    youtubeURL: "https://www.youtube.com/watch?v=Ypkv0HeUvTc",
    appleMusicURL: "https://music.apple.com/us/album/the-beautiful-people/1440746922?i=1440747194"
  },
  {
    questionText: 'Deeper Well',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Country_song_1.m4a', 
    spotifyURL: "https://open.spotify.com/artist/70kkdajctXSbqSMJbQO424",
    youtubeURL:"https://www.youtube.com/watch?v=TGkMYMxi-hw",
    appleMusicURL: "https://music.apple.com/us/album/deeper-well/1729242096"
  },
  {
    questionText: 'Tucson Too Late',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Country_Song_2.m4a', 
    spotifyURL: "https://open.spotify.com/track/2hNQDbZcN3vqRAuwiz7poI",
    youtubeURL: "https://www.youtube.com/watch?v=SLzw6nsj2ck",
    appleMusicURL: "https://music.apple.com/us/album/tucson-too-late/1663956805?i=1663956813"
  },
  {
    questionText: 'Love Story',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Country_Song_3.m4a', 
    spotifyURL: "https://open.spotify.com/track/3CeCwYWvdfXbZLXFhBrbnf",
    youtubeURL: "https://www.youtube.com/watch?v=KrsqPE9SMxo",
    appleMusicURL: "https://music.apple.com/us/album/love-story-taylors-version/1552791073?i=1552791427"
  },
  {
    questionText: 'Cellophane',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Emeryld_-_Cellophane_OFFICIAL_VERSION.mp3', 
    spotifyURL: "https://open.spotify.com/search/cellophane%20emer",
    youtubeURL: "https://www.youtube.com/watch?v=Q7EQWFgqo-8",
    appleMusicURL: "https://music.apple.com/us/album/cellophane/1738285059?i=1738285064"
  },
  {
    questionText: 'Sweet Child O Mine',
    options: ['1', '2', '3', '4', '5'],
    audio: '/gunsnroses.mp3', 
    spotifyURL: "https://open.spotify.com/track/7snQQk1zcKl8gZ92AnueZW",
    youtubeURL: "https://www.youtube.com/watch?v=N9GqZlyCMdU",
    appleMusicURL: "https://music.apple.com/us/album/sweet-child-o-mine/1377813284?i=1377813701"
  },
  {
    questionText: 'Live Your Life',
    options: ['1', '2', '3', '4', '5'],
    audio: '/liveYourLife.mp4', 
    spotifyURL: "https://open.spotify.com/track/3jlbL2OTD5YmIunYzgQTAN",
    youtubeURL: "https://www.youtube.com/watch?v=koVHN6eO4Xg",
    appleMusicURL: "https://music.apple.com/us/album/live-your-life-feat-rihanna/1258961720?i=1258961894"
  },
  {
    questionText: 'Miguel',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Miguel_-_Caramelo_Duro_Audio_ft._Kali_Uchis.mp3', 
    spotifyURL: "https://open.spotify.com/track/3LcjZGk0GBlPRe5XhYVGgM",
    youtubeURL:"https://www.youtube.com/watch?v=o5jtRH2DK-8",
    appleMusicURL: "https://music.apple.com/us/album/caramelo-duro-feat-kali-uchis/1305418479?i=1305422749"
  },
  {
    questionText: 'Smells Like Teen Spirit',
    options: ['1', '2', '3', '4', '5'],
    audio: '/Nirvana.mp3', 
    spotifyURL: "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T",
    youtubeURL: "https://www.youtube.com/watch?v=hTWKbfoikeg",
    appleMusicURL: "https://music.apple.com/us/album/smells-like-teen-spirit/1440783617?i=1440783625"
  },
  {
    questionText: 'Texas Tornado',
    options: ['1', '2', '3', '4', '5'],
    audio: '/texasTornado.mp4', 
    spotifyURL: "https://open.spotify.com/track/392COIitLMUIOwLDEq7Yh7",
    youtubeURL: "https://www.youtube.com/watch?v=-jV4zjY66pc",
    appleMusicURL: "https://music.apple.com/us/album/texas-tornado/258933197?i=258933622"
  },
];

const getQuestions = (req, res) => {
  res.json(questions);
};

const SurveyResponse = require('../models/SurveyResponses');

const isTesting = process.env.NODE_ENV === 'test';

const submitResponses = async (req, res) => {
  try {
    if (!isTesting && !req.body.userId) {
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
      console.log (userId)
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
