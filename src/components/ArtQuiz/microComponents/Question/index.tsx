import React, { useContext } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';

const Question = () => {
  const [quizState] = useContext(QuizContext);

  if (quizState.questions.length === 0) return null;

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <>
      <img className="question-image" src={currentQuestion.image_link} alt="" />
      <p>{currentQuestion.question}</p>
    </>
  );
};

export default Question;
