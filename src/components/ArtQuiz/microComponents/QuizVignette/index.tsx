import React from 'react';
import './index.scss';

const QuizVignette = ({ answers, themeText }: { answers: any[]; themeText: string }) => {
  return (
    <div className="block">
      <img src={answers[0].image_link} alt="" />
      <span className="quiz-vignette-label">{themeText}</span>
    </div>
  );
};

export default QuizVignette;
