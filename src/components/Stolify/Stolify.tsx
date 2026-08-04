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

const PIVOT_X = 277.74;
const PIVOT_Y = 60.59;
const DISC_CX = 146.79;
const DISC_CY = 152.2;
const ARM_PLAY_ANGLE = 12;
const ARM_ANIM_DURATION = 800;
const DISC_DEG_PER_MS = (33 * 360) / 60000;

// Tracks list mapping
const tracks = [
  {
    title: 'I Got The... (2006 Remaster)',
    source: labi,
    cover: labiCover
  },
  {
    title: 'Anyone Who Knows What Love Is',
    source: irma,
    cover: irmaCover
  },
  {
    title: 'Tezeta (Nostalgia)',
    source: tezeta,
    cover: tezetaCover
  }
];

const Stolify = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [svgContent, setSvgContent] = useState('');
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(tracks[currentTrackIndex].source));
  const currentIndexRef = useRef(0);
  const armAngleRef = useRef(0);
  const armAnimRef = useRef<number | null>(null);
  const discAngleRef = useRef(0);
  const discAnimRef = useRef<number | null>(null);
  const trackChangeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const animateArm = (targetAngle: number) => {
    if (armAnimRef.current) cancelAnimationFrame(armAnimRef.current);
    const arm = document.querySelector('#disc-arm') as SVGElement | null;
    if (!arm) return;
    const startAngle = armAngleRef.current;
    const startTime = performance.now();
    const step = (time: number) => {
      const t = Math.min((time - startTime) / ARM_ANIM_DURATION, 1);
      const angle = startAngle + (targetAngle - startAngle) * easeInOut(t);
      armAngleRef.current = angle;
      arm.setAttribute('transform', `rotate(${angle}, ${PIVOT_X}, ${PIVOT_Y})`);
      if (t < 1) armAnimRef.current = requestAnimationFrame(step);
      else armAnimRef.current = null;
    };
    armAnimRef.current = requestAnimationFrame(step);
  };

  const startDiscSpin = () => {
    if (discAnimRef.current) return;
    const disc = document.querySelector('#disc') as SVGElement | null;
    if (!disc) return;
    let lastTime = performance.now();
    const spin = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      discAngleRef.current = (discAngleRef.current + delta * DISC_DEG_PER_MS) % 360;
      disc.setAttribute('transform', `rotate(${discAngleRef.current}, ${DISC_CX}, ${DISC_CY})`);
      discAnimRef.current = requestAnimationFrame(spin);
    };
    discAnimRef.current = requestAnimationFrame(spin);
  };

  const stopDiscSpin = () => {
    if (discAnimRef.current) {
      cancelAnimationFrame(discAnimRef.current);
      discAnimRef.current = null;
    }
  };

  const resetDiscAngle = () => {
    stopDiscSpin();
    discAngleRef.current = 0;
    const disc = document.querySelector('#disc') as SVGElement | null;
    if (disc) disc.setAttribute('transform', `rotate(0, ${DISC_CX}, ${DISC_CY})`);
  };

  // Synchroniser la référence avec l'état
  useEffect(() => {
    currentIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    audioRef.current.volume = 0.5;
    return () => {
      if (armAnimRef.current) cancelAnimationFrame(armAnimRef.current);
      if (discAnimRef.current) cancelAnimationFrame(discAnimRef.current);
      if (trackChangeTimeoutRef.current) clearTimeout(trackChangeTimeoutRef.current);
    };
  }, []);

  // Charger le contenu XML du SVG
  useEffect(() => {
    fetch(stolifyUI)
      .then((response) => response.text())
      .then((svgText) => {
        setSvgContent(svgText);
        // Ajouter les écouteurs d'événements après que le SVG soit injecté
        setTimeout(() => {
          addSVGEventListeners();
          setupSVGLayout();
        }, 100);
      })
      .catch((error) => {
        console.error('Error loading SVG:', error);
      });
  }, []);

  // Ajouter les écouteurs d'événements aux éléments du SVG
  const addSVGEventListeners = () => {
    const setupBtn = (selector: string, handler: () => void) => {
      const el = document.querySelector(selector) as SVGElement | null;
      if (!el) return;
      el.style.cursor = 'pointer';
      el.style.transition = 'opacity 0.08s ease';
      // pointer-events: bounding-box rend toute la zone rectangulaire cliquable
      el.setAttribute('pointer-events', 'bounding-box');
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        handler();
      });
      el.addEventListener('mousedown', () => {
        el.style.opacity = '0.45';
        el.style.transition = 'opacity 0.04s ease';
      });
      el.addEventListener('mouseup', () => {
        el.style.opacity = '1';
        el.style.transition = 'opacity 0.08s ease';
      });
      el.addEventListener('mouseleave', () => {
        el.style.opacity = '1';
        el.style.transition = 'opacity 0.08s ease';
      });
    };

    setupBtn('#play', play);
    setupBtn('#pause', pause);
    setupBtn('#next', next);
    setupBtn('#previous', previous);

    // Mettre à jour l'état initial des contrôles
    updateControlStates();

    // Mettre à jour le titre du morceau (l'image sera mise à jour par le useEffect)
    updateTrackTitle();
  };

  const setupSVGLayout = () => {
    const svgNS = 'http://www.w3.org/2000/svg';
    const defs = document.querySelector('#stolify-ui svg defs');

    // Barre de titre : look écran LCD (override fill CSS du pattern rouge)
    const titleRect = document.querySelector('.cls-6') as SVGRectElement | null;
    if (titleRect) {
      titleRect.setAttribute('width', '275');
      titleRect.style.fill = '#0d1f0d';
      titleRect.style.stroke = '#1c4a1c';
    }

    if (defs) {
      // Ombre portée partagée (disque + bras)
      if (!defs.querySelector('#vinyl-shadow')) {
        const f = document.createElementNS(svgNS, 'filter');
        f.setAttribute('id', 'vinyl-shadow');
        f.setAttribute('x', '-20%'); f.setAttribute('y', '-20%');
        f.setAttribute('width', '150%'); f.setAttribute('height', '150%');
        const s = document.createElementNS(svgNS, 'feDropShadow');
        s.setAttribute('dx', '4'); s.setAttribute('dy', '6');
        s.setAttribute('stdDeviation', '5');
        s.setAttribute('flood-color', '#000'); s.setAttribute('flood-opacity', '0.55');
        f.appendChild(s); defs.appendChild(f);
      }
    }

    // Ombres portées sur disque et bras
    const disc = document.querySelector('#disc') as SVGElement | null;
    if (disc) disc.setAttribute('filter', 'url(#vinyl-shadow)');
    const arm = document.querySelector('#disc-arm') as SVGElement | null;
    if (arm) arm.setAttribute('filter', 'url(#vinyl-shadow)');

    // Stries de vinyle sur l'anneau extérieur du disque
    if (disc && !disc.querySelector('[data-grooves]')) {
      const cx = 146.79, cy = 152.2;
      const grooveG = document.createElementNS(svgNS, 'g');
      grooveG.setAttribute('data-grooves', 'true');
      [120.5, 122, 123.5, 125, 126.5, 128].forEach(r => {
        const c = document.createElementNS(svgNS, 'circle');
        c.setAttribute('cx', String(cx)); c.setAttribute('cy', String(cy));
        c.setAttribute('r', String(r)); c.setAttribute('fill', 'none');
        c.setAttribute('stroke', 'rgba(255,255,255,0.18)');
        c.setAttribute('stroke-width', '0.6');
        grooveG.appendChild(c);
      });
      disc.appendChild(grooveG);
    }

    // Centrer les boutons sous le titre LCD
    const titleCenterX = 19.3 + 275 / 2; // 156.8
    const btnCenterX = (101.69 + 255.23) / 2; // 178.46
    const shift = Math.round(titleCenterX - btnCenterX); // ≈ -22
    ['#previous', '#play', '#pause', '#next'].forEach(id => {
      const el = document.querySelector(id) as SVGElement | null;
      if (el && !el.hasAttribute('data-shifted')) {
        el.setAttribute('transform', `translate(${shift}, 0)`);
        el.setAttribute('data-shifted', 'true');
      }
    });
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

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    audioRef.current.volume = value;
  };

  // Play function
  const play = () => {
    setIsPlaying(true);
    audioRef.current.play();
    updateControlStates(true);
    animateArm(ARM_PLAY_ANGLE);
    resetDiscAngle();
    startDiscSpin();
  };

  // Pause function
  const pause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    updateControlStates(false);
    animateArm(0);
    stopDiscSpin();
  };

  // Previous navigation function
  const previous = () => {
    const currentIndex = currentIndexRef.current;
    const newIndex = currentIndex - 1;
    const targetIndex = newIndex < 0 ? tracks.length - 1 : newIndex;
    const wasSpinning = discAnimRef.current !== null;

    currentIndexRef.current = targetIndex;
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[targetIndex].source);

    animateArm(0);
    // Reset disc AVANT setCurrentTrackIndex : le useEffect([currentTrackIndex])
    // appelle updateCoverImage à 200ms — le disque doit déjà être à 0° à ce moment
    resetDiscAngle();
    setCurrentTrackIndex(targetIndex);

    if (trackChangeTimeoutRef.current) clearTimeout(trackChangeTimeoutRef.current);
    trackChangeTimeoutRef.current = null;
    if (wasSpinning) {
      trackChangeTimeoutRef.current = setTimeout(() => {
        audioRef.current.play();
        animateArm(ARM_PLAY_ANGLE);
        startDiscSpin();
      }, ARM_ANIM_DURATION + 50);
    }
  };

  // Next navigation function
  const next = () => {
    const currentIndex = currentIndexRef.current;
    const newIndex = currentIndex + 1;
    const targetIndex = newIndex >= tracks.length ? 0 : newIndex;
    const wasSpinning = discAnimRef.current !== null;

    currentIndexRef.current = targetIndex;
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[targetIndex].source);

    animateArm(0);
    resetDiscAngle();
    setCurrentTrackIndex(targetIndex);

    if (trackChangeTimeoutRef.current) clearTimeout(trackChangeTimeoutRef.current);
    trackChangeTimeoutRef.current = null;
    if (wasSpinning) {
      trackChangeTimeoutRef.current = setTimeout(() => {
        audioRef.current.play();
        animateArm(ARM_PLAY_ANGLE);
        startDiscSpin();
      }, ARM_ANIM_DURATION + 50);
    }
  };

  // Mettre à jour l'image du morceau dans l'élément .cls-14
  const updateCoverImage = (trackIndex?: number) => {
    const index = trackIndex !== undefined ? trackIndex : currentTrackIndex;
    const coverElement = document.querySelector('#stolify-ui #disc .cls-14') as SVGCircleElement;
    if (coverElement) {
      const svgNS = 'http://www.w3.org/2000/svg';
      const defs = document.querySelector('#stolify-ui svg defs');

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
        image.setAttribute('href', tracks[index].cover);
        image.setAttribute(
          'x',
          (
            parseFloat(coverElement.getAttribute('cx') || '146.79') -
            parseFloat(coverElement.getAttribute('r') || '119.51')
          ).toString()
        );
        image.setAttribute(
          'y',
          (
            parseFloat(coverElement.getAttribute('cy') || '152.2') -
            parseFloat(coverElement.getAttribute('r') || '119.51')
          ).toString()
        );
        image.setAttribute(
          'width',
          (parseFloat(coverElement.getAttribute('r') || '119.51') * 2).toString()
        );
        image.setAttribute(
          'height',
          (parseFloat(coverElement.getAttribute('r') || '119.51') * 2).toString()
        );
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
    const titleElement = document.querySelector('#stolify-ui .cls-6') as SVGRectElement;
    if (titleElement) {
      // Créer un élément text pour afficher le titre
      const svgNS = 'http://www.w3.org/2000/svg';
      let textElement = titleElement.parentNode?.querySelector('text[data-title]');

      if (!textElement) {
        textElement = document.createElementNS(svgNS, 'text');
        textElement.setAttribute('data-title', 'true');
        textElement.setAttribute(
          'x',
          (parseFloat(titleElement.getAttribute('x') || '0') + 10).toString()
        );
        textElement.setAttribute(
          'y',
          (parseFloat(titleElement.getAttribute('y') || '0') + 22).toString()
        );
        textElement.setAttribute('fill', '#9bbc0f');
        textElement.setAttribute('font-family', '"Courier New", Courier, monospace');
        textElement.setAttribute('font-size', '13');
        textElement.setAttribute('font-weight', 'bold');

        // Clipper le texte à la zone réduite pour ne pas déborder sur le fader
        const defs = document.querySelector('#stolify-ui svg defs');
        if (defs && !defs.querySelector('#title-text-clip')) {
          const clipPath = document.createElementNS(svgNS, 'clipPath');
          clipPath.setAttribute('id', 'title-text-clip');
          const clipRect = document.createElementNS(svgNS, 'rect');
          clipRect.setAttribute('x', titleElement.getAttribute('x') || '19.3');
          clipRect.setAttribute('y', titleElement.getAttribute('y') || '299.73');
          clipRect.setAttribute('width', '275');
          clipRect.setAttribute('height', titleElement.getAttribute('height') || '32.33');
          clipPath.appendChild(clipRect);
          defs.appendChild(clipPath);
        }
        textElement.setAttribute('clip-path', 'url(#title-text-clip)');
        titleElement.parentNode?.insertBefore(textElement, titleElement.nextSibling);
      }

      textElement.textContent = tracks[currentTrackIndex].title;

      // Marquee SVG si le titre déborde de la zone d'affichage
      const svgText = textElement as SVGTextElement;
      svgText.querySelector('animateTransform[data-marquee]')?.remove();
      if (svgText.getComputedTextLength) {
        requestAnimationFrame(() => {
          const w = svgText.getComputedTextLength();
          if (w > 255) {
            const overflow = Math.ceil(w - 255);
            const anim = document.createElementNS(svgNS, 'animateTransform');
            anim.setAttribute('data-marquee', 'true');
            anim.setAttribute('attributeName', 'transform');
            anim.setAttribute('attributeType', 'XML');
            anim.setAttribute('type', 'translate');
            anim.setAttribute('values', `0,0; -${overflow},0; -${overflow},0; 0,0`);
            anim.setAttribute('keyTimes', '0; 0.45; 0.55; 1');
            anim.setAttribute('dur', '7s');
            anim.setAttribute('repeatCount', 'indefinite');
            svgText.appendChild(anim);
          }
        });
      }
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

        {/* Fader vertical dans la zone cls-3 (panneau blanc en bas à droite) */}
        <div className="vol-overlay">
          <span className="vol-label">VOL</span>
          <span className="vol-mark">MAX</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="vol-slider"
            style={{ '--pct': `${Math.round(volume * 100)}%` } as React.CSSProperties}
          />
          <span className="vol-mark">MUTE</span>
        </div>
      </div>
    </div>
  );
};

export default Stolify;
