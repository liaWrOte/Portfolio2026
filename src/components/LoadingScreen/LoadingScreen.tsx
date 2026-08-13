import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './loading-screen.scss';
import LogoSvg from '../Logo/LogoSvg';

interface Props {
  onComplete: () => void;
}

const lines = [
  { text: 'INITIALISATION DU PORTFOLIO', status: 'COMPLETED', type: 'success' },
  { text: 'VÉRIFICATION DE LA MÉMOIRE', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DU NOYAU', status: 'COMPLETED', type: 'success' },
  { text: 'CHARGEMENT DES PILOTES GRAPHIQUES', status: 'OK', type: 'success' },
  { text: 'DÉTECTION DES PÉRIPHÉRIQUES', status: '4 FOUND', type: 'success' },
  { text: 'CHARGEMENT DES PROJETS', status: '3 FOUND', type: 'success' },
  { text: 'IMPORT STOLIFY', status: 'COMPLETED', type: 'success' },
  { text: 'IMPORT ARTQUIZ', status: 'COMPLETED', type: 'success' },
  { text: 'IMPORT PORTFOLIO2026', status: 'COMPLETED', type: 'success' },
  { text: 'VÉRIFICATION DU CSS', status: 'OK', type: 'success' },
  { text: 'VÉRIFICATION DU TYPESCRIPT', status: 'WARNING, TOO STRICT', type: 'warning' },
  { text: 'COMPILATION SASS', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DES ANIMATIONS GSAP', status: 'COMPLETED', type: 'success' },
  { text: 'CONNEXION AU SERVEUR STRAPI', status: 'SUCCESS', type: 'success' },
  { text: 'SYNCHRONISATION DES DONNÉES', status: 'COMPLETED', type: 'success' },
  { text: 'CHARGEMENT DES CHATS', status: 'NOT FOUND', type: 'warning' },
  { text: 'SCAN DES BUGS', status: 'NOT FOUND', type: 'warning' },
  { text: 'ACTIVATION DU MODE SOMBRE', status: 'PERMISSION DENIED', type: 'error' },
  { text: 'CONNEXION À LA LUNE', status: 'TIMEOUT', type: 'error' },
  { text: 'SCAN INSTAGRAM', status: 'WARNING, TOO MUCH CAT CONTENT', type: 'warning' },
  { text: 'TÉLÉCHARGEMENT DES EXCUSES', status: 'NOT FOUND', type: 'warning' },
  { text: 'VÉRIFICATION DU WIFI', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DES FONTS', status: 'MONOSPACE ONLY', type: 'success' },
  { text: 'CHARGEMENT DES ICÔNES', status: 'COMPLETED', type: 'success' },
  { text: 'INITIALISATION DU SYSTÈME DE FICHIERS', status: 'COMPLETED', type: 'success' },
  { text: 'VÉRIFICATION DES DROITS UTILISATEUR', status: 'GRANTED', type: 'success' },
  { text: 'CHARGEMENT DES COMPÉTENCES REACT', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DES COMPÉTENCES REDUX', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DES COMPÉTENCES SASS', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DES COMPÉTENCES NODE', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DES COMPÉTENCES FIGMA', status: 'OK', type: 'success' },
  { text: 'INSTALLATION DE LA PATIENCE', status: 'FAILED', type: 'error' },
  { text: 'CHARGEMENT DU CV', status: 'COMPLETED', type: 'success' },
  { text: 'MISE EN CACHE DES ASSETS', status: 'COMPLETED', type: 'success' },
  { text: 'OPTIMISATION DES IMAGES', status: 'OK', type: 'success' },
  { text: 'PRÉCHARGEMENT DES FENÊTRES', status: 'COMPLETED', type: 'success' },
  { text: 'CHARGEMENT DU FOND NUAGEUX', status: 'OK', type: 'success' },
  { text: 'CHARGEMENT DU PAYSAGE', status: 'OK', type: 'success' },
  { text: 'RÉCUPÉRATION DES DONNÉES MÉTÉO', status: 'PERMISSION DENIED', type: 'error' },
  { text: 'ACTIVATION DES RACCOURCIS CLAVIER', status: 'COMPLETED', type: 'success' },
  { text: 'CHARGEMENT DE LA BARRE DES TÂCHES', status: 'COMPLETED', type: 'success' },
  { text: 'INDEXATION DES FICHIERS', status: 'COMPLETED', type: 'success' },
  { text: 'VÉRIFICATION ANTIVIRUS AVAST', status: 'WARNING, BLOCKING SSL', type: 'warning' },
  { text: 'INITIALISATION DU BUREAU', status: 'READY', type: 'success' }
];

const STAGGER = 0.1;

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const messages = messagesRef.current;
    if (!screen || !messages) return;

    const lineEls = Array.from(messages.querySelectorAll<HTMLElement>('.loading-line'));
    if (!lineEls.length) return;

    gsap.set(lineEls, { opacity: 0 });

    const tl = gsap.timeline();

    // Phase 1: lines appear one by one
    tl.to(lineEls, { opacity: 1, stagger: STAGGER, duration: 0 });

    // Phase 2: auto-scroll when lines overflow
    // Scroll starts when the area is full, synchronized
    // with the appearance of the following lines.
    const lineHeight = lineEls[0].offsetHeight + 6;
    const wrapper = messages.parentElement as HTMLElement;
    const availableHeight = wrapper.clientHeight;
    const visibleCount = Math.floor(availableHeight / lineHeight);
    const overflowLines = Math.max(0, lineEls.length - visibleCount);
    const totalScrollPx = overflowLines * lineHeight;

    if (totalScrollPx > 0) {
      const fadeEl = messages.parentElement?.querySelector('.loading-messages-fade');
      gsap.set(fadeEl, { opacity: 0 });

      // The fade appears when the scroll starts
      tl.to(fadeEl, { opacity: 1, duration: 0.4 }, visibleCount * STAGGER);

      tl.to(
        messages,
        {
          y: -totalScrollPx,
          duration: overflowLines * STAGGER,
          ease: 'none'
        },
        visibleCount * STAGGER
      );
    }

    // Phase 3: fade out
    tl.to(screen, { opacity: 0, duration: 0.5 }, `+=${0.8}`);
    tl.call(onComplete);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={screenRef} className="loading-screen">
      <div className="loading-header">
        <div className="loading-logo">
          <LogoSvg />
        </div>
        <div className="loading-info">
          <p className="loading-title">LIA OS v1.0</p>
          <p>Copyright (C) Sandrine MZE</p>
          <p className="loading-path">C:\portfolio\lia_</p>
        </div>
      </div>

      <div className="loading-messages-wrapper">
        <div className="loading-messages-fade" />
        <div ref={messagesRef} className="loading-messages">
          {lines.map((line, i) => (
            <div key={i} className={`loading-line loading-line--${line.type}`}>
              <span className="loading-line__text">{line.text}:</span>
              <span className="loading-line__status">{line.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
