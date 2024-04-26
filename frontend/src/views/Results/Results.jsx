// import React, { useEffect, useState } from 'react';
// import './Results.css';

// const ProgressBar = ({ trait, score }) => (
//   <div className="progress-container">
//     <label>{trait}</label>
//     <div className="progress-bar">
//       <div className="progress" style={{ width: `${score}%` }}>{score}%</div>
//     </div>
//   </div>
// );

// const Results = () => {
//   const bigFiveScores = {
//     Openness: 85, 
//     Conscientiousness: 75, 
//     Extraversion: 65, 
//     Agreeableness: 55, 
//     Neuroticism: 45
//   };

//   return (
//     <div className="results">
//       <div className="results-wrapper">
//         <h1>Your Personality Traits Results</h1>
//         {Object.entries(bigFiveScores).map(([trait, score]) => (
//           <ProgressBar key={trait} trait={trait} score={score} />
//         ))}
//         <div className="results-description">
//           <p>Each progress bar represents your score in one of the Big Five personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. A higher score indicates a stronger presence of that trait in your personality.</p>
//           {/* Add more <p> tags or other HTML elements here for additional descriptions */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;

import React, { useEffect, useState } from 'react';
import './Results.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProgressCircle = ({ score }) => (
  <div className="progress-circle-container">
    <div className="progress-circle-bar">
      <div className="progress" style={{ width: `${score}%` }}>{score}%</div>
    </div>
  </div>
);

const calculateScores = (averageRating) => {
  let baseScore = 50; // Base score for ratings less than 1
  if (averageRating < 1) {
    baseScore = 30;
  } else if (averageRating < 2) {
    baseScore = 40;
  } else if (averageRating < 3) {
    baseScore = 50;
  } else if (averageRating < 4) {
    baseScore = 60;
  } else if (averageRating < 5) {
    baseScore = 70;
  } else {
    baseScore = 80; // Maximum score for ratings 5 and above
  }
  return {
    Openness: baseScore + 15,
    Conscientiousness: baseScore + 5, // Incrementally higher or lower based on your trait criteria
    Extraversion: baseScore + 5,
    Agreeableness: baseScore + 10,
    Neuroticism: baseScore - 20
  };
};

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [topPicks, setTopPicks] = useState([]);
  const [worstPicks, setWorstPicks] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [bigFiveScores, setBigFiveScores] = useState({
    Openness: 0, 
    Conscientiousness: 0, 
    Extraversion: 0, 
    Agreeableness: 0, 
    Neuroticism: 0
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user.id;
        const [questionsRes, responsesRes] = await Promise.all([
          axios.get('http://localhost:1337/api/questions'),
          axios.get(`http://localhost:1337/api/survey/responses?userId=${userId}`)
        ]);

        const questions = questionsRes.data;
        if (responsesRes.data.length === 0) {
          setLoading(false);
          toast.error('You have not taken the survey yet. Please take the survey to view your results.');
          navigate('/survey');
        }
        const responses = responsesRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].responses;

        const songResponses = responses.slice(4, 17);
        const songData = songResponses.map((response, index) => ({
          ...response,
          spotifyUrl: questions[index + 4].spotifyURL,
          appleMusicUrl: questions[index + 4].appleMusicURL,
          youtubeUrl: questions[index + 4].youtubeURL,
          recommendationUrl: questions[index + 4].recommendationURL
        }));

        const calculateAverage = (data) => data.reduce((sum, item) => sum + parseInt(item.answer, 10), 0) / data.length;
        const overallAverage = calculateAverage(songData);
        setAverageRating(overallAverage.toFixed(1));
        setBigFiveScores(calculateScores(overallAverage));

        songData.sort((a, b) => parseInt(b.answer, 10) - parseInt(a.answer, 10));
        setTopPicks(songData.slice(0, 3));
        setWorstPicks(songData.slice(-3));

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const createMailtoLink = () => {
    const scoresText = Object.entries(bigFiveScores)
      .map(([trait, score]) => `* ${trait}: ${score}%`)
      .join('\n');

    const favoriteSongsText = topPicks
      .map(pick => `* ${pick.question}`)
      .join('\n');

    const worstSongsText = worstPicks
      .map(pick => `* ${pick.question}`)
      .join('\n');

    const subject = encodeURIComponent("Check out my Auditory Cheesecake Test results!");
    const body = encodeURIComponent(
      `I completed the auditory cheesecake test!\n\n` +
      `I scored:\n${scoresText}\n\n` +
      `My favorite songs are:\n${favoriteSongsText}\n\n` +
      `Songs I did not enjoy are:\n${worstSongsText}\n\n` +
      `You should take the quiz as well!`
    );

    return `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="results">
      <div className="results-wrapper">
        <h1>Your Personality Traits Results</h1>
        
        <div className="results-description">
          <p>Each progress bar represents your score in one of the Big Five personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. A higher score indicates a stronger presence of that trait in your personality. Keep reading below to learn more about your personality.</p>
        </div>
        
        <div className="all-traits">
          <div className="individual-trait">
            <h3 className="trait-title">Openness</h3>
            <div className="ocean-img">
              <img src="/Openness.png" alt="openness"/>
            </div>
            <ProgressCircle score={bigFiveScores.Openness} />
            <div className="trait-desc">
            Openness (also referred to as openness to experience) emphasizes imagination and insight the most out of all five personality traits. People who are high in openness tend to have a broad range of interests. They are curious about the world and other people and are eager to learn new things and enjoy new experiences. People who are high in this personality trait also tend to be more adventurous and creative. Conversely, people low in this personality trait are often much more traditional and may struggle with abstract thinking.
            </div>
          </div>
          <div className="individual-trait">
            <h3 className="trait-title">Conscientiousness</h3>
            <div className="ocean-img">
              <img src="/Conscientiousness.png" alt="conscientiousness"/>
            </div>
            <ProgressCircle score={bigFiveScores.Conscientiousness} />
            <div className="trait-desc">
            Conscientiousness is one defined by high levels of thoughtfulness, good impulse control, and goal-directed behaviors. Highly conscientious people tend to be organized and mindful of details. They plan ahead, think about how their behavior affects others, and are mindful of deadlines. Someone scoring lower in this primary personality trait is less structured and less organized. They may procrastinate to get things done, sometimes missing deadlines completely.
            </div>
          </div>
          <div className="individual-trait">
            <h3 className="trait-title">Extraversion</h3>
            <div className="ocean-img">
              <img src="/Extraversion.png" alt="extraversion"/>
            </div>
            <ProgressCircle score={bigFiveScores.Extraversion} />
            <div className="trait-desc">
            Extraversion (or extroversion) is a personality trait characterized by excitability, sociability, talkativeness, assertiveness, and high amounts of emotional expressiveness. People high in extraversion are outgoing and tend to gain energy in social situations. Being around others helps them feel energized and excited. People who are low in this personality trait or introverted tend to be more reserved. They have less energy to expend in social settings and social events can feel draining. Introverts often require a period of solitude and quiet in order to "recharge."
            </div>
          </div>
          <div className="individual-trait">
            <h3 className="trait-title">Agreeableness</h3>
            <div className="ocean-img">
              <img src="/Agreeableness.png" alt="agreeableness"/>
            </div>
            <ProgressCircle score={bigFiveScores.Agreeableness} />
            <div className="trait-desc">
            This personality trait includes attributes such as trust, altruism, kindness, affection, and other prosocial behaviors. People who are high in agreeableness tend to be more cooperative while those low in this personality trait tend to be more competitive and sometimes even manipulative.
            </div>
          </div>
          <div className="individual-trait">
            <h3 className="trait-title">Neuroticism</h3>
            <div className="ocean-img">
              <img src="/Neuroticism.png" alt="neuroticism"/>
            </div>
            <ProgressCircle score={bigFiveScores.Neuroticism} />
            <div className="trait-desc">
            Neuroticism is a personality trait characterized by sadness, moodiness, and emotional instability. Individuals who are high in neuroticism tend to experience mood swings, anxiety, irritability, and sadness. Those low in this personality trait tend to be more stable and emotionally resilient.
            </div>
          </div>
        </div>

        {!loading && (
          <div className="survey-results">
            <h1>Your Results:</h1>
            <p><strong>Your Average Rating: {averageRating}</strong></p>
            <div>
            <div>
    <strong>Your Top Picks:</strong>
    {topPicks.map(pick => (
        <div key={pick.question}>
            <p>{pick.question}:</p>
            <div>
            <a href={pick.spotifyUrl}><img src="/spotify_icon.png" alt="Spotify icon" className="iconSmall"/></a>
            <a href={pick.appleMusicUrl}><img src="/Apple_Music_icon.png" alt="Apple Music icon" className="iconSmall"/></a>
            <a href={pick.youtubeUrl}><img src="/Youtube_logo.png" alt="YouTube icon" className="iconSmall"/></a>
            </div>
        </div>
    ))}
    <br></br>
    <strong>Check these playlists out as well:</strong>
    {topPicks.map(pick => (
        <div key={`rec-${pick.question}`}>
            <a href={pick.recommendationUrl}>
                Try Me!
            </a>
        </div>
    ))}

</div>



            </div>
            <div>
              <strong>Songs You Want to Avoid:</strong>
              {worstPicks.map(pick => (
                <p key={pick.question}>{pick.question}</p>
              ))}

            </div>
            <a href={createMailtoLink()}><img src="/mail_icon.png" alt="Mail Icon" className="iconSmall"/></a>

          </div>
        )}
        <div className="survey-results">
          <strong>Want to learn more about how music shapes personality?</strong>
          <p>
            Checkout this paper published by the New York University Integrative Psychology Review 
            <a href="https://acrobat.adobe.com/id/urn:aaid:sc:va6c2:016c82c3-36a9-40a2-a261-95559c2714c1?viewer%21megaVerb=group-discover"> here</a>
      
          </p>
          <p>
            In short, there has been a lot of research on how music can shape personality. This research dates back to ancient Greece. 
            Plato and Aristotle believed music has the power to destroy a society. 
            <br></br>
            They believed that it should be carefully controlled and monitored by the government.
            On the other hand, contemporary psychologist, Steven Pinker, calls music "auditory cheesecake"
            <br></br>
            He believed that music is a byproduct of evolution and does not serve a biological purpose.
            What do you think? 

          </p>

        </div>
      </div>
    </div>
  );
};

export default Results;