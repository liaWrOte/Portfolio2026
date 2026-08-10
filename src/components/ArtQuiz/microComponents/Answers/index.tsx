import React from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import { useTranslation } from '../../../../contexts/LanguageContext';
import Answer from '../Answer';
const Answers = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const { language } = useTranslation();
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  if (quizState.questions.length > 0) {
    const answers = currentQuestion.answers;
    const answersDisplay: string[] =
      language === 'fr' ? (currentQuestion.answers_fr ?? answers) : answers;
    return (
      <div className="answers">
        {answers.map((answer, index) => (
          <Answer
            answerText={answer}
            displayText={answersDisplay[index]}
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
