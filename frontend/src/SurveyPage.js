import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyPage.css';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isOptionClickable, setIsOptionClickable] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const [questions, setQuestions] = useState([
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
  ]);

  useEffect(() => {
    setIsOptionClickable(true); // Enable options by default
    setErrorMessage(''); // Clear error message
    if (questions[currentQuestion]?.audio) {
      setIsOptionClickable(false); // Disable options for audio questions
      const audio = new Audio(questions[currentQuestion].audio);
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          audio.onended = () => {
            setIsOptionClickable(true);
          };
        }).catch(error => {
          console.error("Error playing the audio. User interaction might be required.", error);
          setIsOptionClickable(true); // Enable options in case of error
        });
      }

      return () => {
        audio.pause();
        audio.onended = null; // Clean up the event listener
      };
    }
  }, [currentQuestion, questions]);

  const handleOptionSelect = (option) => {
    if (!isOptionClickable) {
      setErrorMessage('Please wait for the song to finish.');
      return;
    }

    if (currentQuestion === 0 && option === 'No') {
      alert('You cannot proceed in the study.');
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
      navigate('/Results', { state: { responses: updatedResponses } });
    }
  };

  return (
    <div className="page-background">
    <div className="survey-container">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">{questions[currentQuestion].questionText}</div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="options-section">
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleOptionSelect(option)} className="option" disabled={!isOptionClickable}>
            {option}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SurveyPage;
