import React, { useContext, useEffect, useRef, useState } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';

const CORRECT = ['Bien joué !', 'Incroyable !', 'Masterclass !', 'Top !', 'Génie !'];
const WRONG   = ['Raté !', 'Presque...', 'Oops !', 'Pas de chance !', 'La prochaine !'];

const GraffitiFeedback = () => {
  const [quizState] = useContext(QuizContext);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const answer   = quizState.currentAnswer;
  const question = quizState.questions[quizState.currentQuestionIndex];
  const isCorrect = answer && question && answer === question.correctAnswer;
  const idx = quizState.currentQuestionIndex;

  useEffect(() => {
    if (!answer) { setVisible(false); return; }
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 2200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [answer, idx]);

  if (!visible || !answer) return null;

  const messages = isCorrect ? CORRECT : WRONG;
  const message  = messages[idx % messages.length];
  // Deterministic rotation per question: -13° → +13°
  const rot = ((idx * 17 + (isCorrect ? 5 : 11)) % 27) - 13;

  return (
    <div
      className={`graffiti-overlay ${isCorrect ? 'graffiti--correct' : 'graffiti--wrong'}`}
      style={{ '--rot': `${rot}deg` } as React.CSSProperties}
    >
      <span className="graffiti-text">{message}</span>
    </div>
  );
};

export default GraffitiFeedback;
