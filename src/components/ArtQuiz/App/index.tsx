import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter, useParams } from 'react-router-dom';
// == Import composants
import Home from '../Home';
import { QuizProvider } from '../../../reducers/artquiz';
import Quiz from '../Quiz';
import { closeArtquiz } from '../../../actions/main';

import '../../../styles/artquiz/index.scss';
import './index.scss';

// Data
import quizData from '../../../data/quiz.json';

// function Users() {
//     // get ID from url
//     const params = useParams();
  
//     console.log(params); // 👉️ {userId: '4200'}
  
//     return <h2>userId is 👉️ {params.questionId}</h2>;
//   }

// == Composant
const App = () => {
    const dispatch = useDispatch();
    
    return (
        <QuizProvider>
            <div className='artquiz-container'>
                <div className='app'>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            { Object.entries(quizData).map( ([theme, questions], index) => (

                                <Route 
                                    path={`/quiz/${theme}`} 
                                    element={<Quiz theme={theme} questions={questions}/>}
                                />

                            ))}

                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </QuizProvider>
    );
};

// == Export
export default App;
