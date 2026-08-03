import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './loading-screen.scss';

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
  { text: 'IMPORT PORTFOLIO III', status: 'COMPLETED', type: 'success' },
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

    // Phase 1 : apparition ligne par ligne
    tl.to(lineEls, { opacity: 1, stagger: STAGGER, duration: 0 });

    // Phase 2 : scroll automatique quand les lignes débordent
    // On démarre le scroll quand la zone est pleine, et on le synchronise
    // avec l'apparition des lignes suivantes.
    const lineHeight = lineEls[0].offsetHeight + 6;
    const wrapper = messages.parentElement as HTMLElement;
    const availableHeight = wrapper.clientHeight;
    const visibleCount = Math.floor(availableHeight / lineHeight);
    const overflowLines = Math.max(0, lineEls.length - visibleCount);
    const totalScrollPx = overflowLines * lineHeight;

    if (totalScrollPx > 0) {
      const fadeEl = messages.parentElement?.querySelector('.loading-messages-fade');
      gsap.set(fadeEl, { opacity: 0 });

      // Le fade apparaît au moment où le scroll démarre
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

    // Phase 3 : disparition de l'écran de chargement
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.22 122.22">
            <defs>
              <style>{`
                .ll-1{stroke:#d45514}.ll-1,.ll-2,.ll-3,.ll-4,.ll-5{stroke-miterlimit:10}
                .ll-1,.ll-2,.ll-4,.ll-5{fill:none}.ll-1,.ll-4,.ll-5{stroke-width:9px}
                .ll-6{fill:#e8e1d7}.ll-2{stroke:#7f2010;stroke-width:8px}
                .ll-3{stroke:#5d161a}.ll-3,.ll-7{fill:#5d161a}
                .ll-4{stroke:#e6a934}.ll-5{stroke:#bd3018}
              `}</style>
            </defs>
            <path className="ll-6" d="M6.19,61.69C6.19,31.09,30.99,6.28,61.6,6.28s55.41,24.81,55.41,55.41-24.81,55.41-55.41,55.41S6.19,92.29,6.19,61.69"/>
            <path className="ll-3" d="M61.11,51.7c5.19,0,9.41,4.22,9.41,9.41s-4.22,9.41-9.41,9.41-9.41-4.22-9.41-9.41,4.22-9.41,9.41-9.41m0-14c-12.93,0-23.41,10.48-23.41,23.41s10.48,23.41,23.41,23.41,23.41-10.48,23.41-23.41-10.48-23.41-23.41-23.41"/>
            <circle className="ll-7" cx="61.57" cy="61.78" r="19"/>
            <path className="ll-2" d="M17.16,61.34s19.47,23.9,43.49,23.9,43.49-23.9,43.49-23.9"/>
            <path className="ll-2" d="M104.13,61.34s-19.47-23.89-43.49-23.89S17.16,61.34,17.16,61.34"/>
            <circle className="ll-5" cx="61.11" cy="61.11" r="39.65" transform="translate(-9 10.58) rotate(-9.22)"/>
            <path className="ll-4" d="M117.72,61.11c0-31.26-25.35-56.61-56.61-56.61S4.5,29.84,4.5,61.11s25.34,56.61,56.61,56.61,56.61-25.35,56.61-56.61Z"/>
            <circle className="ll-1" cx="61.11" cy="61.11" r="48.13" transform="translate(-25.31 61.11) rotate(-45)"/>
            <path className="ll-6" d="M64.23,52.47c0-1.27,1.03-2.3,2.3-2.3s2.3,1.03,2.3,2.3-1.03,2.3-2.3,2.3-2.3-1.03-2.3-2.3"/>
            <circle className="ll-6" cx="61.57" cy="61.78" r="10"/>
          </svg>
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
