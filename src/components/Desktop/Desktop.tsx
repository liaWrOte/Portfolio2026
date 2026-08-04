import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { minimizeWindow, openWindow, closeWindow } from '../../actions/main';
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

    // Lire la taille réelle de la fenêtre qui vient de s'ouvrir
    const windowEl = document.querySelector<HTMLElement>(`[data-window-id="${windowItemId}"]`);
    const winRect = windowEl?.getBoundingClientRect();
    const wW = winRect ? winRect.width : 100;
    const wH = winRect ? winRect.height : 70;
    const winLeft = winRect ? winRect.left : targetWindowPosition.x;
    const winTop = winRect ? winRect.top : targetWindowPosition.y;
    const windowZIndex = windowEl ? parseInt(windowEl.style.zIndex || '1') : 1;

    // Masquer la fenêtre pendant l'animation
    if (windowEl) windowEl.style.visibility = 'hidden';

    // Part positionné sur la fenêtre (à sa taille exacte) mais centré sur l'icône (scale 0.1)
    gsap.set(el, {
      left: winLeft,
      top: winTop,
      width: wW,
      height: wH,
      x: iconPosition.x - (winLeft + wW / 2),
      y: iconPosition.y - (winTop + wH / 2),
      opacity: 1,
      scale: 0.1,
      zIndex: windowZIndex + 1
    });

    // Grandit jusqu'à la fenêtre et s'estompe en arrivant, puis révèle la fenêtre
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => {
        if (windowEl) windowEl.style.visibility = '';
      }
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

      // Fantom matches the window's exact size (capped at window size per UX intent)
      const wW = winRect ? winRect.width : 100;
      const wH = winRect ? winRect.height : 70;
      const startLeft = winRect ? winRect.left : window.innerWidth / 2 - 50;
      const startTop = winRect ? winRect.top : window.innerHeight / 2 - 35;

      // Target: center of the taskbar item (or bottom center as fallback)
      const endCX = taskRect ? taskRect.left + taskRect.width / 2 : window.innerWidth / 2;
      const endCY = taskRect ? taskRect.top + taskRect.height / 2 : window.innerHeight - 40;

      // Window's z-index so the fantom matches its stacking level
      const windowZIndex = windowEl ? parseInt(windowEl.style.zIndex || '1') : 1;

      // Dispatch first: window disappears, fantom takes its place visually
      dispatch(minimizeWindow(windowId));

      gsap.set(el, {
        left: startLeft,
        top: startTop,
        width: wW,
        height: wH,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        zIndex: windowZIndex
      });

      // Shrink from window position/size toward the taskbar item center
      gsap.to(el, {
        x: endCX - (startLeft + wW / 2),
        y: endCY - (startTop + wH / 2),
        scale: 0.1,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in'
      });
    };

    document.addEventListener('window-minimize', handleMinimize);
    return () => document.removeEventListener('window-minimize', handleMinimize);
  }, [dispatch]);

  // Animate fantom from taskbar item → restored window
  useEffect(() => {
    const handleRestore = (e: Event) => {
      const { windowId } = (e as CustomEvent).detail;
      const el = fantomRef.current;

      const taskbarEl = document.querySelector<HTMLElement>(`[data-taskbar-id="${windowId}"]`);
      const taskRect = taskbarEl?.getBoundingClientRect();
      const taskCX = taskRect ? taskRect.left + taskRect.width / 2 : window.innerWidth / 2;
      const taskCY = taskRect ? taskRect.top + taskRect.height / 2 : window.innerHeight - 40;

      // Restore window first, then read its rect after React renders it
      dispatch(openWindow(windowId));

      if (!el) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const windowEl = document.querySelector<HTMLElement>(`[data-window-id="${windowId}"]`);
          const winRect = windowEl?.getBoundingClientRect();
          const wW = winRect ? winRect.width : 300;
          const wH = winRect ? winRect.height : 200;
          const winLeft = winRect ? winRect.left : window.innerWidth / 2 - 150;
          const winTop = winRect ? winRect.top : window.innerHeight / 2 - 100;
          const windowZIndex = windowEl ? parseInt(windowEl.style.zIndex || '1') : 1;

          if (windowEl) windowEl.style.visibility = 'hidden';

          gsap.set(el, {
            left: winLeft,
            top: winTop,
            width: wW,
            height: wH,
            x: taskCX - (winLeft + wW / 2),
            y: taskCY - (winTop + wH / 2),
            opacity: 1,
            scale: 0.1,
            zIndex: windowZIndex + 1
          });

          gsap.to(el, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
            onComplete: () => {
              if (windowEl) windowEl.style.visibility = '';
            }
          });
        });
      });
    };

    document.addEventListener('window-restore', handleRestore);
    return () => document.removeEventListener('window-restore', handleRestore);
  }, [dispatch]);

  // Animate fantom from window → icon/taskbar, then close
  useEffect(() => {
    const handleClose = (e: Event) => {
      const { windowId } = (e as CustomEvent).detail;
      const el = fantomRef.current;

      const windowEl = document.querySelector<HTMLElement>(`[data-window-id="${windowId}"]`);
      const taskbarEl = document.querySelector<HTMLElement>(`[data-taskbar-id="${windowId}"]`);

      const winRect = windowEl?.getBoundingClientRect();
      const taskRect = taskbarEl?.getBoundingClientRect();

      const wW = winRect ? winRect.width : 100;
      const wH = winRect ? winRect.height : 70;
      const startLeft = winRect ? winRect.left : window.innerWidth / 2 - 50;
      const startTop = winRect ? winRect.top : window.innerHeight / 2 - 35;
      const endCX = taskRect ? taskRect.left + taskRect.width / 2 : window.innerWidth / 2;
      const endCY = taskRect ? taskRect.top + taskRect.height / 2 : window.innerHeight - 40;
      const windowZIndex = windowEl ? parseInt(windowEl.style.zIndex || '1') : 1;

      dispatch(closeWindow(windowId));

      if (!el) return;

      gsap.set(el, {
        left: startLeft,
        top: startTop,
        width: wW,
        height: wH,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        zIndex: windowZIndex
      });

      gsap.to(el, {
        x: endCX - (startLeft + wW / 2),
        y: endCY - (startTop + wH / 2),
        scale: 0.1,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in'
      });
    };

    document.addEventListener('window-close', handleClose);
    return () => document.removeEventListener('window-close', handleClose);
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
        key="projets"
        inWindow={false}
        itemId="projets"
        outWindowLabel={t('projects')}
        triggerOpen="projets"
        srcImg={folderClosed2Icon}
      />
      {/* Item resume */}
      <Item
        key="resume"
        inWindow={false}
        itemId="resume"
        outWindowLabel={t('resume')}
        triggerOpen="resume"
        srcImg={fileIcon}
      />
      {/* Item contact me */}
      <Item
        key="contact_me"
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
