import React, { useState, useRef, useEffect } from 'react';

// Import styles 
import './stolify.scss';

// Imports image buttons - Ancienne UI (commentée)
// import nextBtn from '../assets/img/audio_player/next.svg';
// import previousBtn from '../assets/img/audio_player/previous.svg';
// import playBtn from '../assets/img/audio_player/play.svg';
// import pauseBtn from '../assets/img/audio_player/pause.svg';
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
      playElement.style.padding = '10px';
      playElement.style.margin = '-10px';
      playElement.addEventListener('click', (e) => {
        e.stopPropagation();
        play();
      });
    }

    if (pauseElement) {
      pauseElement.style.cursor = 'pointer';
      pauseElement.style.padding = '10px';
      pauseElement.style.margin = '-10px';
      pauseElement.addEventListener('click', (e) => {
        e.stopPropagation();
        pause();
      });
    }

    if (nextElement) {
      nextElement.style.cursor = 'pointer';
      nextElement.style.padding = '10px';
      nextElement.style.margin = '-10px';
      nextElement.addEventListener('click', (e) => {
        e.stopPropagation();
        next();
      });
    }

    if (previousElement) {
      previousElement.style.cursor = 'pointer';
      previousElement.style.padding = '10px';
      previousElement.style.margin = '-10px';
      previousElement.addEventListener('click', (e) => {
        e.stopPropagation();
        previous();
      });
    }

    // Mettre à jour l'état initial des contrôles
    updateControlStates();
    
    // Mettre à jour le titre et l'image du morceau
    updateTrackTitle();
    updateCoverImage();
  };

  // Mettre à jour l'état visuel des contrôles selon l'état de lecture
  const updateControlStates = (forceState?: boolean) => {
    const playElement = document.querySelector('#play') as HTMLElement;
    const pauseElement = document.querySelector('#pause') as HTMLElement;
    
    // Utiliser l'état forcé ou l'état actuel
    const currentState = forceState !== undefined ? forceState : isPlaying;

    if (playElement && pauseElement) {
      if (currentState) {
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
    // Mettre à jour l'UI SVG avec le nouvel état
    updateControlStates(true);
  };
  
  // Pause function 
  const pause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    // Mettre à jour l'UI SVG avec le nouvel état
    updateControlStates(false);
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
    // Mettre à jour le titre et l'image après un court délai
    setTimeout(() => {
      updateTrackTitle();
      updateCoverImage();
    }, 100);
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
    // Mettre à jour le titre et l'image après un court délai
    setTimeout(() => {
      updateTrackTitle();
      updateCoverImage();
    }, 100);
  };

  // Mettre à jour l'image du morceau dans l'élément .cls-14
  const updateCoverImage = () => {
    const coverElement = document.querySelector('#disc .cls-14') as SVGCircleElement;
    if (coverElement) {
      const svgNS = "http://www.w3.org/2000/svg";
      const defs = document.querySelector('svg defs');
      
      if (defs) {
        // Supprimer l'ancien clipPath s'il existe
        const oldClipPath = defs.querySelector('#cover-clip');
        if (oldClipPath) {
          oldClipPath.remove();
        }
        
        // Créer un clipPath avec les mêmes dimensions que le cercle
        const clipPath = document.createElementNS(svgNS, 'clipPath');
        clipPath.setAttribute('id', 'cover-clip');
        
        const clipCircle = document.createElementNS(svgNS, 'circle');
        clipCircle.setAttribute('cx', coverElement.getAttribute('cx') || '146.79');
        clipCircle.setAttribute('cy', coverElement.getAttribute('cy') || '152.2');
        clipCircle.setAttribute('r', coverElement.getAttribute('r') || '119.51');
        
        clipPath.appendChild(clipCircle);
        defs.appendChild(clipPath);
        
        // Créer l'image directement dans le SVG
        const oldImage = document.querySelector('#cover-image');
        if (oldImage) {
          oldImage.remove();
        }
        
        const image = document.createElementNS(svgNS, 'image');
        image.setAttribute('id', 'cover-image');
        image.setAttribute('href', tracks[currentTrackIndex].cover);
        image.setAttribute('x', (parseFloat(coverElement.getAttribute('cx') || '146.79') - parseFloat(coverElement.getAttribute('r') || '119.51')).toString());
        image.setAttribute('y', (parseFloat(coverElement.getAttribute('cy') || '152.2') - parseFloat(coverElement.getAttribute('r') || '119.51')).toString());
        image.setAttribute('width', (parseFloat(coverElement.getAttribute('r') || '119.51') * 2).toString());
        image.setAttribute('height', (parseFloat(coverElement.getAttribute('r') || '119.51') * 2).toString());
        image.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        image.setAttribute('clip-path', 'url(#cover-clip)');
        
        // Ajouter l'image après le cercle
        coverElement.parentNode?.insertBefore(image, coverElement.nextSibling);
        
        // Cacher le cercle original pour ne voir que l'image
        coverElement.style.fill = 'none';
      }
    }
  };

  // Mettre à jour le titre du morceau dans l'élément .cls-6
  const updateTrackTitle = () => {
    const titleElement = document.querySelector('.cls-6') as SVGRectElement;
    if (titleElement) {
      // Créer un élément text pour afficher le titre
      const svgNS = "http://www.w3.org/2000/svg";
      let textElement = titleElement.parentNode?.querySelector('text[data-title]');
      
      if (!textElement) {
        textElement = document.createElementNS(svgNS, 'text');
        textElement.setAttribute('data-title', 'true');
        textElement.setAttribute('x', (parseFloat(titleElement.getAttribute('x') || '0') + 10).toString());
        textElement.setAttribute('y', (parseFloat(titleElement.getAttribute('y') || '0') + 22).toString());
        textElement.setAttribute('fill', 'white');
        textElement.setAttribute('font-family', 'Arial, sans-serif');
        textElement.setAttribute('font-size', '16');
        textElement.setAttribute('font-weight', 'bold');
        titleElement.parentNode?.insertBefore(textElement, titleElement.nextSibling);
      }
      
      textElement.textContent = tracks[currentTrackIndex].title;
    }
  };

  // Mettre à jour le titre et l'image quand le morceau change
  useEffect(() => {
    // Attendre un peu que le SVG soit chargé
    setTimeout(() => {
      updateTrackTitle();
      updateCoverImage();
    }, 200);
  }, [currentTrackIndex]);

  return (
    <div className="stolify-wrapper">
      {/* <div className="stolify-container" id="stolify"> */}

        {/* Track title */}
        {/* <div className="title-container">
          <span className='title'>{tracks[currentTrackIndex].title}</span>
        </div> */}

        {/* Track cover */}
        {/* <div className='cover-container'>
          <img
            src={tracks[currentTrackIndex].cover}
            alt={`${tracks[currentTrackIndex].title} cover`}
            className="cover"
          />
        </div> */}

        {/* Audio controls - Ancienne UI (commentée) */}
      {/* <div className="stolify-controls">
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
      </div> */}
      {/* </div> */}

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
