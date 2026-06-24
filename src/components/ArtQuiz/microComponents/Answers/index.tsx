import React from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import Answer from '../Answer';
const Answers = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  // const isWrongAnswer =
  // quizState.currentAnswer === answerText && currentAnswer !== correctAnswer;
  if (quizState.questions.length > 0) {
    const answers = currentQuestion.answers;
    return (
      <div className="answers">
        {answers.map((answer, index) => (
          <Answer
            answerText={answer}
            index={index}
            key={index}
            correctAnswer={currentQuestion.correctAnswer}
            currentAnswer={quizState.currentAnswer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: 'SELECT_ANSWER', payload: answerText })
            }
          />
        ))}
      </div>
    );
  }
};
export default Answers;
