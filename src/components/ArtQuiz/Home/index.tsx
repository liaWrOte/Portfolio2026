import React, { useContext } from 'react';
import Title from '../microComponents/Title';
import QuizVignette from '../microComponents/QuizVignette';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../../reducers/artquiz';
import quizData from '../../../data/quiz.json';
import badgeImage from '../../../assets/artquiz/badge.svg';
import artquizIcon from '../../assets/img/icons/artquiz_icon.svg';
import './index.scss';

const Home = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="home">
      <div className="user-container">
        <Title />
        <div className="badge-container">
          <img src={badgeImage} alt="" />
          <img src={badgeImage} alt="" />
          <img src={badgeImage} alt="" />
          <img src={badgeImage} alt="" />
        </div>
      </div>

      {quizState.showResults && (
        <>
          <div className="quiz-result">
            {quizState.correctAnswersCount > 6 ? 'Good job !' : 'Almost there, try again'}
          </div>

          <div className="answers-results answers">
            {quizState.questions.map((question: any, index: number) => (
              <span
                key={index}
                className={`answer ${question.rightAnswered ? 'green-block right-answer' : 'orange-block wrong-answer'}`}
              >
                {question.correctAnswer}
              </span>
            ))}
          </div>

          <div className="results-action-container">
            <Link
              to="/"
              onClick={() => {
                dispatch({ type: 'END_QUIZ', payload: false });
                dispatch({ type: 'RESET_QUESTIONS' });
              }}
              className="green-block start-quiz"
            >
              <span>Play again !</span>
            </Link>
          </div>
        </>
      )}

      {!quizState.showResults && (
        <>
          <div className="logo-container">
            <img src={artquizIcon} alt="" />
            <span className="logo-text">ArtQuiz</span>
            <p>Ready to play ?</p>
          </div>

          <div className="quiz-container">
            <p className="quiz-label">Choose your theme</p>
            <div className="quiz-container-links">
              {Object.entries(quizData).map(([theme, questions]) => (
                <Link
                  key={theme}
                  to={'/quiz/' + theme}
                  onClick={() => dispatch({ type: 'SELECT_THEME', payload: theme })}
                >
                  <QuizVignette answers={questions} themeText={theme} />
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
