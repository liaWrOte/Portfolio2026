import React, { useState, useRef, useEffect, useHasChanged } from 'react';
import PropTypes from 'prop-types';
import './stolify.scss';

// svg btn
import nextBtn from '../assets/img/audio_player/next.svg';
import previousBtn from '../assets/img/audio_player/previous.svg';
import playBtn from '../assets/img/audio_player/play.svg';
import pauseBtn from '../assets/img/audio_player/pause.svg';

// jpeg tracks covers
import labiCover from '../assets/img/audio_player/labi.jpeg';
import irmaCover from '../assets/img/audio_player/irma.jpg';
import tezetaCover from '../assets/img/audio_player/tezeta.jpg';

// mp3
import labi from '../assets/mp3/I Got The... (2006 Remaster) (128 kbps).mp3';
import irma from '../assets/mp3/Irma Thomas Anyone Who Knows What Love Is (128 kbps).mp3';
import tezeta from '../assets/mp3/Tezeta (Nostalgia) (128 kbps).mp3';

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
  const audioRef = useRef(new Audio(tracks[currentTrackIndex].source));
  
  const play = () => {
    setIsPlaying(true);
    audioRef.current.play();
    let stolifySvg = document.getElementById('stolify-svg');
    stolifySvg.classList.add('playing');
    let stolifyContainer = document.getElementById('stolify-container');
    stolifyContainer.classList.add('playing');
  };
  
  const pause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    let stolifySvg = document.getElementById('stolify-svg');
    stolifySvg.classList.remove('playing');

  };

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
    
    <div className="stolify-container hide" id="stolify">
      <div className="title-container">
        <span className='title'>{tracks[currentTrackIndex].title}</span>
      </div>
      <div className='cover-container'>
        <img
          src={tracks[currentTrackIndex].cover}
          alt={`${tracks[currentTrackIndex].title} cover`}
          className="cover"
        />
      </div>
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

  );
};

Stolify.propTypes = {
  /**
   * Show items Stolify of firt level
   */
  displayStolify: PropTypes.bool.isRequired,
  /**
   * Show items Stolify of second level
   */
  displayStolifyItem: PropTypes.bool,

};

Stolify.defaultProps = {
  displayStolify: false,
  displayStolifyItem: false,
};

export default Stolify;
