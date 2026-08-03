import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { minimizeWindow } from '../../actions/main';
import gsap from 'gsap';
// Import styles
import './desktop.scss';
// Import components
import Item from '../../containers/item';
import Window from '../../containers/window';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
import cloud from '../assets/img/cloud.svg';
import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';
import { useTranslation } from '../../contexts/LanguageContext';
import { getWindowTargetPosition } from '../../utils/windowPosition';

export const Desktop = ({ displayWindowItem, displayImageItem, displayWindow, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // windowItemId est mis à jour par OPEN_WINDOW à chaque clic sur n'importe
  // quel item (projets, resume, contact_me, stolify, artquiz...), donc il
  // identifie toujours le dernier item cliqué.
  const windowItemId = useSelector((state: any) => state.main.windowItemId);
  // Position de toutes les icônes, capturées par Item.tsx via setPosition au clic
  const windowPositions = useSelector((state: any) => state.main.windowPositions);
  // Liste des fenêtres ouvertes, nécessaire pour calculer le décalage en cascade
  const openWindows = useSelector((state: any) => state.main.openWindows);

  // Position de l'icône effectivement cliquée, et position où sa fenêtre va
  // apparaître (même calcul que Window.tsx) : le même .fantom sert pour tous
  // les items, plus besoin de dupliquer la logique par item.
  const iconPosition = windowPositions?.[windowItemId];
  const targetWindowPosition = getWindowTargetPosition(windowItemId, openWindows);

  // Élément .fantom toujours présent dans le DOM (invisible par défaut) :
  // GSAP manipule directement son style à chaque clic, pas besoin de le
  // démonter/remonter. gsap.to() interrompt et reprend automatiquement le
  // tween en cours si l'utilisateur clique plusieurs fois de suite.
  const fantomRef = useRef<HTMLDivElement>(null);

  // Etat initial (caché) géré par GSAP lui-même, une seule fois au montage.
  // Si on le mettait dans le style JSX (React), React le réécrirait à chaque
  // re-render du composant (déclenché par le clic via Redux) et effacerait
  // l'animation de GSAP en plein vol.
  useEffect(() => {
    if (fantomRef.current) {
      gsap.set(fantomRef.current, { opacity: 0 });
    }
  }, []);

  // Garde la trace de openWindows "d'avant" pour détecter une vraie ouverture
  // (fermé -> ouvert), par opposition à un simple re-clic qui ne fait que
  // remettre une fenêtre déjà ouverte au premier plan.
  const prevOpenWindowsRef = useRef<string[]>(openWindows || []);

  useEffect(() => {
    if (!iconPosition || !fantomRef.current || !windowItemId) {
      prevOpenWindowsRef.current = openWindows || [];
      return;
    }

    const wasAlreadyOpen = prevOpenWindowsRef.current.includes(windowItemId);
    prevOpenWindowsRef.current = openWindows || [];

    // La fenêtre était déjà ouverte : ce n'est qu'un re-clic pour la remettre
    // au premier plan, pas une ouverture -> pas d'animation de vol.
    if (wasAlreadyOpen) return;

    const el = fantomRef.current;

    // Place l'élément sur l'icône cliquée, sans transition (état de départ)
    gsap.set(el, {
      left: iconPosition.x - 50,
      top: iconPosition.y - 50,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1
    });

    // L'anime jusqu'à la position de sa fenêtre, en s'estompant à l'arrivée
    gsap.to(el, {
      x: targetWindowPosition.x - iconPosition.x,
      y: targetWindowPosition.y - iconPosition.y,
      opacity: 0,
      scale: 0.3,
      duration: 0.45,
      ease: 'power2.out'
    });
  }, [iconPosition, windowItemId, openWindows]);

  // Animate fantom from window → taskbar item, then actually minimize
  useEffect(() => {
    const handleMinimize = (e: Event) => {
      const { windowId } = (e as CustomEvent).detail;
      const el = fantomRef.current;
      if (!el) {
        dispatch(minimizeWindow(windowId));
        return;
      }

      const windowEl = document.querySelector<HTMLElement>(`[data-window-id="${windowId}"]`);
      const taskbarEl = document.querySelector<HTMLElement>(`[data-taskbar-id="${windowId}"]`);

      const winRect = windowEl?.getBoundingClientRect();
      const taskRect = taskbarEl?.getBoundingClientRect();

      // Start at center of the window (or middle of screen as fallback)
      const startCX = winRect ? winRect.left + winRect.width / 2 : window.innerWidth / 2;
      const startCY = winRect ? winRect.top + winRect.height / 2 : window.innerHeight / 2;

      // Target: center of the taskbar item (or bottom center as fallback)
      const endCX = taskRect ? taskRect.left + taskRect.width / 2 : window.innerWidth / 2;
      const endCY = taskRect ? taskRect.top + taskRect.height / 2 : window.innerHeight - 40;

      gsap.set(el, {
        left: startCX - 50,
        top: startCY - 50,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1
      });

      gsap.to(el, {
        x: endCX - startCX,
        y: endCY - startCY,
        scale: 0.2,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => dispatch(minimizeWindow(windowId))
      });
    };

    document.addEventListener('window-minimize', handleMinimize);
    return () => document.removeEventListener('window-minimize', handleMinimize);
  }, [dispatch]);

  return (
    <div className="desktop">
      {/* Nuages arrière-plan (petits, transparents) */}
      <img className="cloud cloud--xs cloud--1" src={cloud} alt="" />
      <img className="cloud cloud--xs cloud--2" src={cloud} alt="" />
      <img className="cloud cloud--sm cloud--3" src={cloud} alt="" />
      <img className="cloud cloud--sm cloud--4" src={cloud} alt="" />
      {/* Nuages plan intermédiaire */}
      <img className="cloud cloud--md cloud--5" src={cloud} alt="" />
      <img className="cloud cloud--md cloud--6" src={cloud} alt="" />
      {/* Nuages premier plan (grands, opaques) */}
      <img className="cloud cloud--lg cloud--7" src={cloud} alt="" />
      <img className="cloud cloud--lg cloud--8" src={cloud} alt="" />
      {/* Item projets */}
      <Item
        key={Math.random()}
        inWindow={false}
        itemId="projets"
        outWindowLabel={t('projects')}
        triggerOpen="projets"
        srcImg={folderClosed2Icon}
      />
      {/* Item resume */}
      <Item
        key={Math.random()}
        inWindow={false}
        itemId="resume"
        outWindowLabel={t('resume')}
        triggerOpen="resume"
        srcImg={fileIcon}
      />
      {/* Item contact me */}
      <Item
        key={Math.random()}
        inWindow={false}
        itemId="contact_me"
        outWindowLabel={t('contact')}
        triggerOpen="openWindow"
        srcImg={emailIcon}
      />

      <div
        ref={fantomRef}
        className="fantom"
        style={{
          position: 'fixed',
          pointerEvents: 'none'
        }}
      ></div>
      {/* Item Window to open all items */}
      <Window />
    </div>
  );
};
