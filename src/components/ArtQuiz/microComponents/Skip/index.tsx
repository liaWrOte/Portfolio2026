import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../../../reducers/artquiz';
import { useTranslation } from '../../../../contexts/LanguageContext';
import './index.scss';

const Skip = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSkip = () => {
    const isLastQuestion =
      quizState.questions.length > 0 &&
      quizState.currentQuestionIndex === quizState.questions.length - 1;

    if (isLastQuestion) {
      dispatch({ type: 'END_QUIZ', payload: true });
      navigate('/');
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  return (
    <span className="skip" onClick={handleSkip}>
      {t('quiz_skip')}
    </span>
  );
};

export default Skip;
