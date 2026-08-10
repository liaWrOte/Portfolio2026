import React, { useEffect, useState } from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { QuizProvider } from '../../../reducers/artquiz';
import Quiz from '../Quiz';
import '../../../styles/artquiz/index.scss';
import './index.scss';
import quizData from '../../../data/quiz.json';
import artquizIcon from '../../assets/img/icons/artquiz_icon.svg';

type Phase = 'loading' | 'splat' | 'revealed';

const SCREEN_SPLATS = [
  { style: { top: '14%', left: '14%' }, delay: 0,   color: 'red'   },
  { style: { top: '10%', left: '74%' }, delay: 110,  color: 'green' },
  { style: { top: '52%', left: '7%'  }, delay: 55,   color: 'orange'},
  { style: { top: '47%', left: '83%' }, delay: 180,  color: 'red'   },
  { style: { top: '80%', left: '22%' }, delay: 85,   color: 'green' },
  { style: { top: '74%', left: '67%' }, delay: 145,  color: 'orange'},
];

const ScreenSplat = ({ style, delay, color }: { style: React.CSSProperties; delay: number; color: string }) => (
  <div
    className={`screen-splat screen-splat--${color}`}
    style={{ ...style, ['--ss-delay' as any]: `${delay}ms` }}
    aria-hidden
  >
    <div className="ss-blob" />
    <span className="ss-drop ss-drop--1" />
    <span className="ss-drop ss-drop--2" />
    <span className="ss-drop ss-drop--3" />
    <span className="ss-drop ss-drop--4" />
    <span className="ss-drop ss-drop--5" />
    <span className="ss-drip" />
  </div>
);

const App = () => {
  const [phase, setPhase] = useState<Phase>('loading');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload cover images
  useEffect(() => {
    const srcs = Object.values(quizData).map((q) => q[0].image_link);
    let done = 0;
    const onDone = () => { done++; if (done >= srcs.length) setImagesLoaded(true); };
    srcs.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = onDone;
      img.src = src;
    });
  }, []);

  // Bar fills over 2s, then screen splats play for 1200ms, then reveal
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('splat'), 2000);
    const t2 = setTimeout(() => setPhase('revealed'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'revealed' && imagesLoaded) {
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
  }

  return (
    <QuizProvider>
      <div className="artquiz-container">
        <div className="app">
          <div className="artquiz-splash">
            <img src={artquizIcon} alt="ArtQuiz" className="artquiz-splash-icon" />
            <div className="artquiz-splash-bar-wrap">
              <div className="artquiz-splash-bar">
                <div className={`artquiz-splash-bar-fill${phase !== 'loading' ? ' artquiz-splash-bar-fill--done' : ''}`} />
              </div>
            </div>
            {phase === 'splat' && SCREEN_SPLATS.map((s, i) => (
              <ScreenSplat key={i} style={s.style} delay={s.delay} color={s.color} />
            ))}
          </div>
        </div>
      </div>
    </QuizProvider>
  );
};

export default App;
