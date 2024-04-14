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

const Results = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/survey/responses');
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
          <p>Each progress bar represents your score in one of the Big Five personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. A higher score indicates a stronger presence of that trait in your personality.</p>
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
      </div>
    </div>
  );
};

export default Results;
