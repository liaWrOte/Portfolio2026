import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';
const NextQuestion = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  if (quizState.questions.length > 0) {
    const isCorrectAnswer =
      quizState.questions[quizState.currentQuestionIndex].correctAnswer === quizState.currentAnswer;
    // if (isCorrectAnswer && quizState.currentAnswer.length > 0 ) {
    //     return (<span onClick={() => dispatch({type: 'NEXT_QUESTION'})}>Question suivante</span>)
    // }
    if ((isCorrectAnswer || quizState.timer === 0) && quizState.currentQuestionIndex !== 9) {
      return (
        <span className="next-question" onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
          Next question <span className="next-question-arrow">&#62;</span>
        </span>
      );
      // return (<span>Essaie encore</span>)
    }
    if (quizState.timer === 0 && quizState.currentQuestionIndex === 9) {
      return (
        <Link to="/">
          <span
            className="next-question"
            onClick={() => dispatch({ type: 'END_QUIZ', payload: true })}
          >
            End quiz
            <span className="next-question-arrow">&#62;</span>
          </span>
        </Link>
      );
      // return (<span>Essaie encore</span>)
    }
  }
};
export default NextQuestion;
