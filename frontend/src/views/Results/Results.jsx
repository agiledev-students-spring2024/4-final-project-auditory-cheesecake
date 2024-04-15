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

const ProgressBar = ({ trait, score }) => (
  <div className="progress-container">
    <label>{trait}</label>
    <div className="progress-bar">
      <div className="progress" style={{ width: `${score}%` }}>{score}%</div>
    </div>
  </div>
);

// const ProgressCircle = ({ score }) => (
//   <div className="progress-circle-container"> {/* Additional class for specificity */}
//     <div className="progress-circle-bar">
//       <div className="progress" style={{ width: `${score}%` }}>{score}%</div>
//     </div>
//   </div>
// );

const Results = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const user = JSON.parse (sessionStorage.getItem('user')); 
        console.log ('User:', user)
        const userId = user.id;
        const res = await fetch(`http://localhost:1337/api/survey/responses?userId=${userId}`);
        const data = await res.json();
        setResponses(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch responses:', error);
        setLoading(false);
      }
    };
  
    fetchResponses();
  }, []);

  const bigFiveScores = {
    Openness: 85, 
    Conscientiousness: 75, 
    Extraversion: 65, 
    Agreeableness: 55, 
    Neuroticism: 45
  };

  return (
    <div className="results">
      <div className="results-wrapper">
        <h1>Your Personality Traits Results</h1>
        {Object.entries(bigFiveScores).map(([trait, score]) => (
          <ProgressBar key={trait} trait={trait} score={score} />
        ))}
        <div className="results-description">
          <p>Each progress bar represents your score in one of the Big Five personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. A higher score indicates a stronger presence of that trait in your personality.  Keep reading below to learn more about your personality.</p>
        </div>
        {loading ? <p>Loading responses...</p> : (
          <div>
            <h2>Your Survey Responses</h2>
            {responses.map((resp, index) => (
              <div key={index}>
                <h3>Response #{index + 1}</h3>
                {resp.responses.map((r, idx) => (
                  <p key={idx}>{r.question}: {r.answer}</p>
                ))}
              </div>
            ))}
          </div>
        )}
        {/* <div className="all-traits">
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

        </div> */}
      </div>
    </div>
  );
};

export default Results;
