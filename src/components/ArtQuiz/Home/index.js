import React, {useContext} from 'react';
import Title from '../microComponents/Title';
import Cutie from '../microComponents/Cutie';
import QuizVignette from '../microComponents/QuizVignette';
import { Link } from 'react-router-dom';
import { QuizContext } from "../../../reducers/artquiz";

// Data
import quizData from '../../../data/quiz.json';
import badgeImage from '../../../assets/artquiz/badge.svg';
import paletteLogo from '../../../assets/artquiz/palette.svg';

import './index.scss';

const Home = () => { 
    const [quizState, dispatch] = useContext(QuizContext);  

    return (
    <div className='home'>
        <div className="user-container">
            <Title />
            
            <div className="badge-container">
                <img src={badgeImage} alt="" />
                <img src={badgeImage} alt="" />
                <img src={badgeImage} alt="" />
                <img src={badgeImage} alt="" />
            </div>
        </div>

        { quizState.showResults && 
            <>
                { quizState.correctAnswersCount > 6 &&
                    <div class="quiz-result">Good job !</div>
                }
                { quizState.correctAnswersCount <= 6 &&
                    <div class="quiz-result">Almost there, try again</div>
                }
                <div className="answers-results answers">
                    { Object.entries(quizState.questions).map( ([theme, questions], index) => (
                        <span className={`answer ${questions.rightAnswered ? 'green-block right-answer' : 'orange-block wrong-answer'}`}>
                            {questions.correctAnswer}
                        </span>
                    )) }
                </div>

                <div className="results-action-container">
                    
                    <Link to={'/'}
                        onClick={() => {
                                dispatch({type: "END_QUIZ", payload: false});
                                dispatch({type: "RESET_QUESTIONS", payload: ''})
                            }}
                        className="green-block start-quiz">
                            <span>Play again !</span>
                    </Link>
                </div>
            </>
        }
        
        { !quizState.showResults &&
            <>
                <div className="logo-container">
                    <img src={paletteLogo} alt="" />
                    <span className="logo-text">ArtQuiz</span>
                    <p>Ready to play ?</p>
                </div>

                <div className="quiz-container">
                    <p class="quiz-label">Choose your theme</p>
                    <div className="quiz-container-links">
                        { Object.entries(quizData).map( ([theme, questions], index) => (
                                <Link 
                                    to={"/quiz/" + theme}
                                    action=''
                                    onClick={() => dispatch({
                                            type: "SELECT_THEME",
                                            payload: theme
                                        })}>
                                    <QuizVignette 
                                        answers={questions}
                                        themeText={theme}
                                        key={index}
                                        
                                    />
                                </Link>

                        ))}
                    </div>
                </div>
            </>
        }

        {/* <Cutie /> */}
    </div>
    )
};

// == Export
export default Home;
