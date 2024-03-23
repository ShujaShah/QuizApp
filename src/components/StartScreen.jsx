import React from 'react';

export default function StartScreen({ numQuestions, dispatch, title }) {
  return (
    <div className="start">
      <h2>Welcome to The {title} Quiz!</h2>
      <h3>
        {numQuestions} questions to test your {title} mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's Start
      </button>
    </div>
  );
}
