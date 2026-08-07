import React, { useContext } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';

const Timeline = () => {
  const [quizState] = useContext(QuizContext);

  if (quizState.questions.length === 0) return null;

  return (
    <>
      <div className="timeline">
        {quizState.questions.map((_: any, index: number) => (
          <span
            key={index}
            className={index <= quizState.currentQuestionIndex ? 'active' : ''}
          />
        ))}
      </div>
      <span className="timeline-text">
        {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
      </span>
    </>
  );
};

export default Timeline;
