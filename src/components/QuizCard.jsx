import React from 'react';

const QuizCard = ({ title, logo, onSelectQuiz }) => {
  const handleClick = () => {
    onSelectQuiz(title);
  };

  return (
    <div className="quiz-card" onClick={handleClick}>
      <img src={logo} alt={`${title} Logo`} className="logo" />
    </div>
  );
};

export default QuizCard;
