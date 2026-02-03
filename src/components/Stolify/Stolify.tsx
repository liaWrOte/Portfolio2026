import React, { useState, useRef, useEffect } from 'react';

// Import styles 
import './stolify.scss';

// Imports image buttons
import nextBtn from '../assets/img/audio_player/next.svg';
import previousBtn from '../assets/img/audio_player/previous.svg';
import playBtn from '../assets/img/audio_player/play.svg';
import pauseBtn from '../assets/img/audio_player/pause.svg';
import stolifyUI from '../assets/img/stolify_ui.svg';

// Imports tracks covers images
import labiCover from '../assets/img/audio_player/labi.jpeg';
import irmaCover from '../assets/img/audio_player/irma.jpg';
import tezetaCover from '../assets/img/audio_player/tezeta.jpg';

// Imports mp3
import labi from '../assets/mp3/I Got The... (2006 Remaster) (128 kbps).mp3';
import irma from '../assets/mp3/Irma Thomas Anyone Who Knows What Love Is (128 kbps).mp3';
import tezeta from '../assets/mp3/Tezeta (Nostalgia) (128 kbps).mp3';

// Tracks list mapping
const tracks = [
  {
    title : 'I Got The... (2006 Remaster)',
    source: labi,
    cover: labiCover,
  },
  {
    title : 'Anyone Who Knows What Love Is',
    source: irma,
    cover: irmaCover,
  },
  {
    title : 'Tezeta (Nostalgia)',
    source: tezeta,
    cover: tezetaCover,
  },
];

const Stolify = () => {
  
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [svgContent, setSvgContent] = useState('');
  const audioRef = useRef(new Audio(tracks[currentTrackIndex].source));

  // Charger le contenu XML du SVG
  useEffect(() => {
    fetch(stolifyUI)
      .then(response => response.text())
      .then(svgText => {
        setSvgContent(svgText);
        // Ajouter les écouteurs d'événements après que le SVG soit injecté
        setTimeout(() => {
          addSVGEventListeners();
        }, 100);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, []);

  // Ajouter les écouteurs d'événements aux éléments du SVG
  const addSVGEventListeners = () => {
    const playElement = document.querySelector('#play') as HTMLElement;
    const pauseElement = document.querySelector('#pause') as HTMLElement;
    const nextElement = document.querySelector('#next') as HTMLElement;
    const previousElement = document.querySelector('#previous') as HTMLElement;

    if (playElement) {
      playElement.style.cursor = 'pointer';
      playElement.addEventListener('click', (e) => {
        e.stopPropagation();
        play();
        updateControlStates();
      });
    }

    if (pauseElement) {
      pauseElement.style.cursor = 'pointer';
      pauseElement.addEventListener('click', (e) => {
        e.stopPropagation();
        pause();
        updateControlStates();
      });
    }

    if (nextElement) {
      nextElement.style.cursor = 'pointer';
      nextElement.addEventListener('click', (e) => {
        e.stopPropagation();
        next();
      });
    }

    if (previousElement) {
      previousElement.style.cursor = 'pointer';
      previousElement.addEventListener('click', (e) => {
        e.stopPropagation();
        previous();
      });
    }

    // Mettre à jour l'état initial des contrôles
    updateControlStates();
  };

  // Mettre à jour l'état visuel des contrôles selon l'état de lecture
  const updateControlStates = () => {
    const playElement = document.querySelector('#play') as HTMLElement;
    const pauseElement = document.querySelector('#pause') as HTMLElement;

    if (playElement && pauseElement) {
      if (isPlaying) {
        // Quand on joue, cacher play et montrer pause
        playElement.style.display = 'none';
        pauseElement.style.display = 'block';
      } else {
        // Quand on est en pause, montrer play et cacher pause
        playElement.style.display = 'block';
        pauseElement.style.display = 'none';
      }
    }
  };

  // Play function 
  const play = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
  
  // Pause function 
  const pause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  // Previous navigation function 
  const previous = () => {
    const newIndex = currentTrackIndex - 1;
    if (newIndex < 0) {
      setCurrentTrackIndex(tracks.length - 1);
      audioRef.current.pause();
      audioRef.current = new Audio(tracks[tracks.length - 1].source);
    } else {
      setCurrentTrackIndex(newIndex);
      audioRef.current.pause();
      audioRef.current = new Audio(tracks[newIndex].source);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  // Next navigation function 
  const next = () => {
    const newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) {
      setCurrentTrackIndex(0);
      audioRef.current.pause();
      audioRef.current = new Audio(tracks[0].source);
    } else {
      setCurrentTrackIndex(newIndex);
      audioRef.current.pause();
      audioRef.current = new Audio(tracks[newIndex].source);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="stolify-wrapper">
      <div className="stolify-container" id="stolify">

        {/* Track title */}
        <div className="title-container">
          <span className='title'>{tracks[currentTrackIndex].title}</span>
        </div>

        {/* Track cover */}
        <div className='cover-container'>
          <img
            src={tracks[currentTrackIndex].cover}
            alt={`${tracks[currentTrackIndex].title} cover`}
            className="cover"
          />
        </div>

        {/* Audio controls */}
        <div className="stolify-controls">
          <img 
              src={previousBtn} 
              alt="previous song"
              onClick={previous}
            />
          {isPlaying ? (
            <img 
              src={pauseBtn} 
              alt="pause song"
              onClick={pause}
              className="main-controls"
            />
          ) : (
            <img 
              src={playBtn} 
              alt="play song"
              onClick={play}
              className="main-controls"
            />
          )}
          <img 
            src={nextBtn} 
            alt="next song"
            onClick={next}
          />
        </div>
      </div>

      <div className="stolify-container" id="stolify-ui">
        {svgContent ? (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : (
          <img src={stolifyUI} alt="Stolify UI" />
        )}
      </div>
    </div>
  );
};


export default Stolify;
