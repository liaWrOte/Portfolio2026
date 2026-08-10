import React from 'react';
import { useTranslation } from '../../../../contexts/LanguageContext';
import './index.scss';

const QuizVignette = ({ answers, themeText }: { answers: any[]; themeText: string }) => {
  const { t } = useTranslation();
  return (
    <div className="block">
      <img src={answers[0].image_link} alt="" />
      <span className="quiz-vignette-label">{t('theme_' + themeText)}</span>
    </div>
  );
};

export default QuizVignette;
