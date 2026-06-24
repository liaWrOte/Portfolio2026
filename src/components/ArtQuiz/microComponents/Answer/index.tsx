import React from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';
const Answer = ({ answerText, onSelectAnswer, index, currentAnswer, correctAnswer }) => {
  const [quizState] = useContext(QuizContext);
  let isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  isCorrectAnswer = quizState.timer === 0 ? answerText === correctAnswer : isCorrectAnswer;
  const isWrongAnswer = currentAnswer && answerText !== correctAnswer;
  let isBadAnswer = currentAnswer !== answerText;
  const correctAnswerClass = isCorrectAnswer && quizState.timer === 0 ? 'right-answer' : '';
  const wrongAnswerClass =
    isWrongAnswer && currentAnswer && quizState.timer === 0 ? 'wrong-answer' : '';
  const disabledClass = quizState.timer === 0 ? 'disabled-answer' : '';
  const badAnswerClass = isBadAnswer && quizState.timer === 0 ? 'bad-answer' : '';
  return (
    <div
      className={`orange-block answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass} ${badAnswerClass}`}
      onClick={() => onSelectAnswer(answerText)}
    >
      {answerText}
    </div>
  );
};
export default Answer;
