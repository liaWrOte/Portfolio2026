import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';

const Timer = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
    if (quizState.timer <= 0) return;
    const timerInterval = setInterval(
      () => dispatch({ type: 'DECREASE_TIMER', payload: quizState.timer - 1 }),
      1000
    );
    return () => clearInterval(timerInterval);
  }, [quizState.timer]);

  if (quizState.questions.length === 0) return null;

  const isCorrectAnswer =
    quizState.questions[quizState.currentQuestionIndex].correctAnswer === quizState.currentAnswer;

  return (
    <>
      {quizState.timer > 0 && <div className="timer">{quizState.timer}s</div>}
      {quizState.timer === 0 && isCorrectAnswer && <span className="timer-end">Bien joué !</span>}
      {quizState.timer === 0 && !isCorrectAnswer && (
        <span className="timer-end">Zut, ça sera pour la prochaine !</span>
      )}
    </>
  );
};

export default Timer;
