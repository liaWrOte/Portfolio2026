import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../../reducers/artquiz';
import Header from '../microComponents/Header';
import Question from '../microComponents/Question';
import Answers from '../microComponents/Answers';
import Timer from '../microComponents/Timer';
import NextQuestion from '../microComponents/NextQuestion';
import Timeline from '../microComponents/Timeline';
// Data
import quizData from '../../../data/quiz.json';
// Styles
import './index.scss';
const Quiz = (theme, questions) => {
  let [quizState, dispatch] = useContext(QuizContext);
  // console.error('THEME', theme);
  const themeLabel = theme.theme;
  const navigate = useNavigate();
  useEffect(() => {
    const lastIndex = quizState.questions.length - 1;
    if (
      quizState.questions[lastIndex] &&
      quizState.questions[lastIndex].rightAnswered !== undefined
    ) {
      dispatch({ type: 'END_QUIZ', payload: true });
      navigate('/');
    }
  }, [quizState.questions, navigate]);
  // console.error('THEMELABEL', quizData[themeLabel]);
  useEffect(() => {
    if (quizState.questions.length > 0) {
      return;
    } else {
      dispatch({ type: 'LOADED_QUESTIONS', payload: quizData[themeLabel] });
    }
  });
  return (
    <div className="game-container">
      <Header />
      <Timeline />
      <Timer />
      <Question />
      <Answers />
      <NextQuestion />
    </div>
  );
};
export default Quiz;
