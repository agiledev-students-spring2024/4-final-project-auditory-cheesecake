import React, { useState, useEffect } from 'react'; // Make sure to import useEffect
import { useNavigate } from 'react-router-dom';
import './SurveyPage.css';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  const [questions, setQuestions] = useState([
    {
      questionText: 'I confirm that I am 18 years or older',
      options: ['Yes', 'No'],
    },
    {
      questionText: "How are you feeling?",
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
    if (questions[currentQuestion]?.audio) {
      const audio = new Audio(questions[currentQuestion].audio);
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
        }).catch(error => {
          console.error("Error playing the audio. User interaction might be required.", error);
        });
      }

      return () => audio.pause(); 
    }
  }, [currentQuestion, questions]);

  const handleOptionSelect = (option) => {
    const updatedResponses = [...responses, { question: questions[currentQuestion].questionText, answer: option }];
    setResponses(updatedResponses);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      console.log('Survey responses:', updatedResponses);
      navigate('/results', { state: { responses: updatedResponses } });
    }
  };

  return (
    <div className="survey-container">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">{questions[currentQuestion].questionText}</div>
      </div>
      <div className="options-section">
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleOptionSelect(option)} className="option">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SurveyPage;
