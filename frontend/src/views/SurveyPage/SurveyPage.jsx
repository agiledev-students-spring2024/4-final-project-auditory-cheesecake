import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './SurveyPage.css';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setErrorMessage('Failed to load questions. Please refresh the page.');
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions[currentQuestion]?.audio) {
      const audioUrl = `http://localhost:1337${questions[currentQuestion].audio}`;
      console.log("Attempting to play audio from:", audioUrl);
      audioRef.current.src = audioUrl;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Playback successful!");
        }).catch(error => {
          console.error("Playback failed:", error);
        });
      }
    }
    
    return () => audioRef.current.pause(); // Cleanup function to stop audio when component unmounts or before re-running effect
  }, [currentQuestion, questions]);

  const replayAudio = () => {
    if (audioRef.current.src) {
      audioRef.current.play();
    }
  };

  const handleOptionSelect = async (option) => {
    if (currentQuestion === 0 && option === 'No') {
      toast.error('Error: You cannot proceed in the study.');
      navigate('/survey');
      return;
    }

    const updatedResponses = [...responses, { question: questions[currentQuestion].questionText, answer: option }];
    setResponses(updatedResponses);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      console.log('Survey responses:', updatedResponses);
      await submitResponses(updatedResponses); // Submit the responses here
      navigate('/Results', { state: { responses: updatedResponses } });
    }
  };

  const submitResponses = async (surveyResponses) => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log('User:', user);
      const userId = user.id;
      console.log('User ID:', userId);
      const response = await axios.post('http://localhost:1337/api/responses', {
        userId, // Include the userId
        responses: surveyResponses
      });
      console.log(response.data.message); // Optional: handle the response from the server
      navigate('/Results', { state: { responses: surveyResponses, message: response.data.message } });
    } catch (error) {
      console.error('Error submitting responses:', error);
      setErrorMessage('Failed to submit responses. Please try again.');
    }
  };

  return (
    <div className="page-background">
      <div className="survey-container">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">{questions[currentQuestion]?.questionText}</div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="options-section">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleOptionSelect(option)} 
              className='option'
            >
              {option}
            </button>
          ))}
          {questions[currentQuestion]?.audio && (
            <button onClick={replayAudio} className="play-again" title="Play Again">
  &#x21BA;
</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;













// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SurveyPage.css';
// import axios from 'axios'; // Ensure axios is installed via npm

// const SurveyPage = () => {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [responses, setResponses] = useState([]);
//   const [isOptionClickable, setIsOptionClickable] = useState(true); 
//   const [errorMessage, setErrorMessage] = useState(''); 
//   const [questions, setQuestions] = useState([]);


//   // const [questions, setQuestions] = useState([
//   //   {
//   //     questionText: 'I confirm that I am 18 years or older',
//   //     options: ['Yes', 'No'],
//   //   },
//   //   {
//   //     questionText: "How are you feeling today?",
//   //     options: ['Not Good', 'Average', 'Better than average', 'Amazing!'],
//   //   },
//   //   {
//   //     questionText: 'Who is your favorite artist?',
//   //     options: ['Drake', 'Taylor Swift', 'Rihanna', 'Billie Eilish', 'The Weeknd'],
//   //   },
//   //   {
//   //     questionText: 'Rate this song out of 5 (1 is worst, 5 is best)',
//   //     options: ['1', '2', '3', '4', '5'],
//   //     audio: process.env.PUBLIC_URL + '/mondayMonday.mp4', 
//   //   },
//   //   {
//   //     questionText: 'Rate this song out of 5 (1 is worst, 5 is best)',
//   //     options: ['1', '2', '3', '4', '5'],
//   //     audio: process.env.PUBLIC_URL + '/symphonyNo3.mp4', 
//   //   },
//   // ]);

//   useEffect(() => {
//     setIsOptionClickable(true); // Enable options by default
//     setErrorMessage(''); // Clear error message
//     if (questions[currentQuestion]?.audio) {
//       setIsOptionClickable(false); // Disable options for audio questions
//       const audio = new Audio(questions[currentQuestion].audio);
//       const playPromise = audio.play();

//       if (playPromise !== undefined) {
//         playPromise.then(_ => {
//           audio.onended = () => {
//             setIsOptionClickable(true);
//           };
//         }).catch(error => {
//           console.error("Error playing the audio. User interaction might be required.", error);
//           setIsOptionClickable(true); // Enable options in case of error
//         });
//       }

//       return () => {
//         audio.pause();
//         audio.onended = null; // Clean up the event listener
//       };
//     }
//   }, [currentQuestion, questions]);

//   const handleOptionSelect = (option) => {
//     if (!isOptionClickable) {
//       setErrorMessage('Please wait for the song to finish.');
//       return;
//     }

//     if (currentQuestion === 0 && option === 'No') {
//       alert('You cannot proceed in the study.');
//       navigate('/survey'); 
//       return;
//     }

//     const updatedResponses = [...responses, { question: questions[currentQuestion].questionText, answer: option }];
//     setResponses(updatedResponses);

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       console.log('Survey responses:', updatedResponses);
//       navigate('/Results', { state: { responses: updatedResponses } });
//     }
//   };

//   return (
//     <div className="page-background">
//     <div className="survey-container">
//       <div className="question-section">
//         <div className="question-count">
//           <span>Question {currentQuestion + 1}</span>/{questions.length}
//         </div>
//         <div className="question-text">{questions[currentQuestion].questionText}</div>
//       </div>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <div className="options-section">
//         {questions[currentQuestion].options.map((option, index) => (
//           <button 
//             key={index} 
//             onClick={() => handleOptionSelect(option)} 
//             // dynamically disable the button if the audio is playing, enable if it is not
//             className={`${!isOptionClickable ? 'disabled ' : ''}option`}
//             disabled={!isOptionClickable}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SurveyPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SurveyPage.css';

// const SurveyPage = () => {
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [responses, setResponses] = useState([]);
//   const [isOptionClickable, setIsOptionClickable] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('http://localhost:1337/api/questions');
//         setQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//         setErrorMessage('Failed to load questions. Please refresh the page.');
//       }
//     };
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     setIsOptionClickable(true);
//     setErrorMessage('');
//     if (questions[currentQuestion]?.audio) {
//       setIsOptionClickable(false);
//       const audio = new Audio(questions[currentQuestion].audio);
//       const playPromise = audio.play();

//       if (playPromise !== undefined) {
//         playPromise.then(() => {
//           audio.onended = () => {
//             setIsOptionClickable(true);
//           };
//         }).catch(error => {
//           console.error("Error playing the audio. User interaction might be required.", error);
//           setIsOptionClickable(true);
//         });
//       }

//       return () => {
//         audio.pause();
//         audio.onended = null;
//       };
//     }
//   }, [currentQuestion, questions]);

//   const handleOptionSelect = async (option) => {
//     if (!isOptionClickable) {
//       setErrorMessage('Please wait for the song to finish.');
//       return;
//     }

//     if (currentQuestion === 0 && option === 'No') {
//       alert('You cannot proceed in the study.');
//       navigate('/survey');
//       return;
//     }

//     const updatedResponses = [...responses, { question: questions[currentQuestion].questionText, answer: option }];
//     setResponses(updatedResponses);

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       console.log('Survey responses:', updatedResponses);
//       await submitResponses(updatedResponses); // Submit the responses here
//       navigate('/Results', { state: { responses: updatedResponses } });
//     }
//   };

//   const submitResponses = async (surveyResponses) => {
//     try {
//       const response = await axios.post('http://localhost:1337/api/responses', { responses: surveyResponses });
//       console.log(response.data.message); // Optional: handle the response from the server
//     } catch (error) {
//       console.error('Error submitting responses:', error);
//     }
//   };

//   return (
//     <div className="page-background">
//       <div className="survey-container">
//         <div className="question-section">
//           <div className="question-count">
//             <span>Question {currentQuestion + 1}</span>/{questions.length}
//           </div>
//           <div className="question-text">{questions[currentQuestion]?.questionText}</div>
//         </div>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <div className="options-section">
//           {questions[currentQuestion]?.options.map((option, index) => (
//             <button 
//               key={index} 
//               onClick={() => handleOptionSelect(option)} 
//               className={`${!isOptionClickable ? 'disabled ' : ''}option`}
//               disabled={!isOptionClickable}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;