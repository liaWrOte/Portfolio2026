import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../../reducers/artquiz';
import Header from '../microComponents/Header';
import Question from '../microComponents/Question';
import Answers from '../microComponents/Answers';
import Timer from '../microComponents/Timer';
import NextQuestion from '../microComponents/NextQuestion';
import Timeline from '../microComponents/Timeline';
import GraffitiFeedback from '../microComponents/GraffitiFeedback';
import quizData from '../../../data/quiz.json';
import './index.scss';

const Quiz = ({ theme, questions }: { theme: string; questions: any[] }) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  // Detect end of quiz: last question answered → navigate to results
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

  // Load questions for this theme on mount, resetting any previous game state
  useEffect(() => {
    dispatch({ type: 'RESET_QUESTIONS' });
    dispatch({ type: 'LOADED_QUESTIONS', payload: quizData[theme] });
  }, []);

  return (
    <div className="game-container">
      <Header />
      <Timeline />
      <Timer />
      <Question />
      <Answers />
      <NextQuestion />
      <GraffitiFeedback />
    </div>
  );
};

export default Quiz;
