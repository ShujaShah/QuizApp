// Inside App.js
import React, { useEffect, useReducer, useState } from 'react';
import DateCounter from './components/DateCounter';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';
import questionsDataReact from '../data/questionsReact.json';
import questionsDataAngular from '../data/questionsAngular.json'; // Import Angular questions
import questionsDataVue from '../data/questionsVue.json';
import Home from './components/Home'; // Import Homepage component

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: 'ready',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    case 'selectQuiz':
      return { ...state, selectedQuiz: action.payload }; // Store selected quiz in state
    default:
      throw new Error('Action is unknown');
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // State to store selected quiz

  useEffect(() => {
    // Fetch questions based on selectedQuiz
    if (selectedQuiz === 'React') {
      dispatch({ type: 'dataReceived', payload: questionsDataReact.questions });
    } else if (selectedQuiz === 'Angular') {
      dispatch({
        type: 'dataReceived',
        payload: questionsDataAngular.questions,
      });
    } else if (selectedQuiz === 'Vue') {
      dispatch({
        type: 'dataReceived',
        payload: questionsDataVue.questions,
      });
    }
  }, [selectedQuiz]);

  //creating a fake server
  // useEffect(() => {
  //   fetch('http://localhost:8000/questions')
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: 'dataReceived', payload: data }))
  //     .catch((err) => dispatch({ type: 'dataFailed' }));
  // }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {!selectedQuiz && (
          <Home onSelectQuiz={(quiz) => setSelectedQuiz(quiz)} />
        )}
        {/* Render quiz components if selectedQuiz is set */}
        {selectedQuiz && (
          <>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && (
              <StartScreen
                title={selectedQuiz}
                numQuestions={questions.length}
                dispatch={dispatch}
                selectedQuiz={selectedQuiz} // Pass selectedQuiz to StartScreen
              />
            )}
            {status === 'active' && (
              <>
                <Progress
                  index={index}
                  numQuestions={questions.length}
                  points={points}
                  maxPossiblePoints={questions.reduce(
                    (prev, cur) => prev + cur.points,
                    0
                  )}
                  answer={answer}
                />
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                  points={points}
                />
                <Footer>
                  <Timer
                    dispatch={dispatch}
                    secondsRemaining={secondsRemaining}
                  />
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    numQuestions={questions.length}
                    index={index}
                  />
                </Footer>
              </>
            )}
            {status === 'finished' && (
              <FinishScreen
                points={points}
                maxPossiblePoints={questions.reduce(
                  (prev, cur) => prev + cur.points,
                  0
                )}
                highscore={highscore}
                dispatch={dispatch}
              />
            )}
          </>
        )}
      </Main>
    </div>
  );
}
