// Homepage.js
import React from 'react';
import reactLogo from '../assets/react-logo.png';
import angularLogo from '../assets/angular-logo.png';
import vueLogo from '../assets/vue-logo.png';
import QuizCard from './QuizCard';

const Homepage = ({ onSelectQuiz }) => {
  return (
    <>
      <p className="frontier-text">Choose the platform to assess your skills</p>
      <div className="homepage">
        <QuizCard logo={reactLogo} title="React" onSelectQuiz={onSelectQuiz} />
        <QuizCard
          logo={angularLogo}
          title="Angular"
          onSelectQuiz={onSelectQuiz}
        />
        <QuizCard logo={vueLogo} title="Vue" onSelectQuiz={onSelectQuiz} />
      </div>
    </>
  );
};

export default Homepage;

Homepage.js;
