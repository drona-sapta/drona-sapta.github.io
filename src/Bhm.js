import React, { useState } from "react";
import "./App.css"; // Add styles
import categories from "./categories"; // Import the categories data

const QuizeApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = (category) => {
    const shuffledQuestions = [...categories[category]]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setSelectedCategory(category);
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswerClick = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      if (option === questions[currentIndex].answer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="quiz-container">
      <header className="app-header">
        <h1>Sapta-Drona BHM Night</h1>
      </header>
      {!selectedCategory ? (
        <>
          <h2 className="category-heading">Select a Category</h2>
          <div className="category-list">
            {Object.keys(categories).map((category, index) => (
              <button
                key={index}
                onClick={() => startQuiz(category)}
                className="category-btn"
              >
                {category}
              </button>
            ))}
          </div>
        </>
      ) : quizCompleted ? (
        <div className="quiz-completed">
          <h2 className="quiz-completed-title">🎉 Quiz Completed! 🎉</h2>
          <p className="quiz-completed-score">
            Your Score: <span>{score}</span> / <span>{questions.length}</span>
          </p>
          <button
            className="fancy-button retry-button"
            onClick={() => setSelectedCategory(null)}
          >
            🔄 Try Again
          </button>
        </div>
      ) : (
        <>
          <h2>{questions[currentIndex].question}</h2>
          <img
            src={questions[currentIndex].image}
            alt="Question"
            className="question-image"
          />
          <div className="options-grid">
            {questions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer
                    ? option === questions[currentIndex].answer
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <p className="answer-details">
              <strong>Correct Answer:</strong> {questions[currentIndex].answer}
              <br />
              {questions[currentIndex].details}
            </p>
          )}
          {selectedAnswer && (
            <button className="fancy-button" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default QuizeApp;