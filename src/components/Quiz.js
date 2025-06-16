import React, { useState } from 'react';
import quizData from '../data/quizData';
import './Quiz.css';

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (e) => {
    setSelected(e.target.id);
  };

  const handleSubmit = () => {
    if (!selected) return alert('Please select an answer!');
    if (selected === quizData[currentQuiz].correct) {
      setScore(score + 1);
    }

    if (currentQuiz + 1 < quizData.length) {
      setCurrentQuiz(currentQuiz + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleReload = () => {
    setCurrentQuiz(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  const progress = ((currentQuiz) / quizData.length) * 100;

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      {!isFinished ? (
        <>
          <div className="progress-bar">
            <div id="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <h2>{quizData[currentQuiz].question}</h2>
          <ul>
            {['a', 'b', 'c', 'd'].map((key) => (
              <li key={key}>
                <input
                  type="radio"
                  id={key}
                  name="answer"
                  checked={selected === key}
                  onChange={handleSelect}
                />
                <label htmlFor={key}>{quizData[currentQuiz][key]}</label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Next</button>
        </>
      ) : (
        <div className="score">
          <h2>You answered correctly {score} out of {quizData.length} questions.</h2>
          <button onClick={handleReload}>Reload</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
