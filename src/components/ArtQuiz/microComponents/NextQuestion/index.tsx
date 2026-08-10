import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../../../reducers/artquiz';
import { useTranslation } from '../../../../contexts/LanguageContext';
import './index.scss';

const NextQuestion = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const { t } = useTranslation();

  if (quizState.questions.length === 0) return null;

  const lastIndex = quizState.questions.length - 1;
  const isCorrectAnswer =
    quizState.questions[quizState.currentQuestionIndex].correctAnswer === quizState.currentAnswer;
  const canAdvance = isCorrectAnswer || quizState.timer === 0;

  if (canAdvance && quizState.currentQuestionIndex !== lastIndex) {
    return (
      <span className="next-question" onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
        {t('quiz_next')} <span className="next-question-arrow">&#62;</span>
      </span>
    );
  }

  if (canAdvance && quizState.currentQuestionIndex === lastIndex) {
    return (
      <Link to="/">
        <span
          className="next-question"
          onClick={() => dispatch({ type: 'END_QUIZ', payload: true })}
        >
          {t('quiz_end')} <span className="next-question-arrow">&#62;</span>
        </span>
      </Link>
    );
  }

  return null;
};

export default NextQuestion;
