import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { QuizProvider } from '../../../reducers/artquiz';
import Quiz from '../Quiz';
import '../../../styles/artquiz/index.scss';
import './index.scss';
import quizData from '../../../data/quiz.json';

const App = () => {
  return (
    <QuizProvider>
      <div className="artquiz-container">
        <div className="app">
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              {Object.entries(quizData).map(([theme, questions]) => (
                <Route
                  key={theme}
                  path={`/quiz/${theme}`}
                  element={<Quiz theme={theme} questions={questions} />}
                />
              ))}
            </Routes>
          </MemoryRouter>
        </div>
      </div>
    </QuizProvider>
  );
};

export default App;
