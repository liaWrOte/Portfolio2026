import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { minimizeWindow, openWindow, closeWindow, openFolder, openProject, setPosition } from '../../actions/main';
import { slugify } from '../../utils/projectSlug';
import ScrambleText from '../ScrambleText/ScrambleText';
import gsap from 'gsap';
// Import styles
import './desktop.scss';
// Import components
import Item from '../../containers/item';
import Window from '../../containers/window';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
import cloud from '../assets/img/cloud.svg';
import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';
import { useTranslation } from '../../contexts/LanguageContext';
import { getWindowTargetPosition } from '../../utils/windowPosition';
import { backendUrl } from '../../middlewares/env';

export const Desktop = ({ displayWindowItem, displayImageItem, displayWindow, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // windowItemId is updated by OPEN_WINDOW on every item click
  // (projets, resume, contact_me, stolify, artquiz...), so it always
  // identifies the last clicked item.
  const windowItemId = useSelector((state: any) => state.main.windowItemId);
  const windowPositions = useSelector((state: any) => state.main.windowPositions);
  const openWindows = useSelector((state: any) => state.main.openWindows);
  const fileSystem = useSelector((state: any) => state.main.fileSystem);

  // Position of the actually clicked icon, and the target position for its window
  // (same calculation as Window.tsx): the same .fantom serves all items,
  // no need to duplicate the logic per item.
  const iconPosition = windowPositions?.[windowItemId];
  const targetWindowPosition = getWindowTargetPosition(windowItemId, openWindows);

  // The .fantom element is always present in the DOM (invisible by default):
  // GSAP manipulates its style directly on each click, no need to unmount/remount it.
  // gsap.to() automatically cancels and restarts the current tween if the user
  // clicks multiple times in quick succession.
  const fantomRef = useRef<HTMLDivElement>(null);
  const abskillRef = useRef<HTMLDivElement>(null);

  const abskillNode = fileSystem?.children
    ?.find((c: any) => c.id === 'Développement' || c.name === 'Développement')
    ?.children?.find((p: any) => slugify(p.name) === 'abskill');
  const abskillSrc = abskillNode?.logo?.data?.attributes?.url
    ? `${backendUrl}${abskillNode.logo.data.attributes.url}`
    : folderClosed2Icon;

  const handleAbskillClick = () => {
    const node = abskillNode;
    if (!node) return;
    if (abskillRef.current) {
      dispatch(setPosition('projets', abskillRef.current.getBoundingClientRect()));
    }
    dispatch(openWindow('projets' as any));
    dispatch(openFolder('root' as any));
    dispatch(openFolder('Développement'));
    dispatch(openProject(String(node.id)));
  };

  // Initial (hidden) state managed by GSAP itself, once on mount.
  // If set in JSX style (React), React would rewrite it on every component
  // re-render (triggered by Redux click) and would cancel the GSAP animation mid-flight.
  useEffect(() => {
    if (fantomRef.current) {
      gsap.set(fantomRef.current, { opacity: 0 });
    }
  }, []);

  // Tracks the previous openWindows to detect a real opening
  // (closed → open), as opposed to a simple re-click that merely
  // brings an already-open window to the foreground.
  const prevOpenWindowsRef = useRef<string[]>(openWindows || []);

  useEffect(() => {
    if (!iconPosition || !fantomRef.current || !windowItemId) {
      prevOpenWindowsRef.current = openWindows || [];
      return;
    }

    const wasAlreadyOpen = prevOpenWindowsRef.current.includes(windowItemId);
    prevOpenWindowsRef.current = openWindows || [];

    // The window was already open: this is just a re-click to bring it
    // to the foreground, not an opening — skip the fly animation.
    if (wasAlreadyOpen) return;

    const el = fantomRef.current;

    // Read the actual size of the window that just opened
    const windowEl = document.querySelector<HTMLElement>(`[data-window-id="${windowItemId}"]`);
    const winRect = windowEl?.getBoundingClientRect();
    const wW = winRect ? winRect.width : 100;
    const wH = winRect ? winRect.height : 70;
    const winLeft = winRect ? winRect.left : targetWindowPosition.x;
    const winTop = winRect ? winRect.top : targetWindowPosition.y;
    const windowZIndex = windowEl ? parseInt(windowEl.style.zIndex || '1') : 1;

    // Hide the window during the animation
    if (windowEl) windowEl.style.visibility = 'hidden';

    // Start positioned at the window (exact size) but centered on the icon (scale 0.1)
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

    // Grow to the window size and fade out on arrival, then reveal the window
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

  // Animate fantom from current window size → fullscreen (or back), then toggle .full
  useEffect(() => {
    const handleExpand = (e: Event) => {
      const { windowId } = (e as CustomEvent).detail;
      const el = fantomRef.current;
      if (!el) return;

      const windowEl = document.querySelector<HTMLElement>(`[data-window-id="${windowId}"]`);
      if (!windowEl) return;

      const beforeRect = windowEl.getBoundingClientRect();
      const windowZIndex = parseInt(windowEl.style.zIndex || '1');

      windowEl.style.visibility = 'hidden';
      windowEl.classList.toggle('full');

      // Double rAF: let the browser apply the new CSS before reading the after-rect
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const afterRect = windowEl.getBoundingClientRect();

          gsap.set(el, {
            left: beforeRect.left,
            top: beforeRect.top,
            width: beforeRect.width,
            height: beforeRect.height,
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: windowZIndex + 1
          });

          gsap.to(el, {
            left: afterRect.left,
            top: afterRect.top,
            width: afterRect.width,
            height: afterRect.height,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              if (windowEl) windowEl.style.visibility = '';
            }
          });
        });
      });
    };

    document.addEventListener('window-expand', handleExpand);
    return () => document.removeEventListener('window-expand', handleExpand);
  }, []);

  return (
    <div className="desktop">
      {/* Background clouds (small, transparent) */}
      <img className="cloud cloud--xs cloud--1" src={cloud} alt="" />
      <img className="cloud cloud--xs cloud--2" src={cloud} alt="" />
      <img className="cloud cloud--sm cloud--3" src={cloud} alt="" />
      <img className="cloud cloud--sm cloud--4" src={cloud} alt="" />
      {/* Intermediate-layer clouds */}
      <img className="cloud cloud--md cloud--5" src={cloud} alt="" />
      <img className="cloud cloud--md cloud--6" src={cloud} alt="" />
      {/* Foreground clouds (large, opaque) */}
      <img className="cloud cloud--lg cloud--7" src={cloud} alt="" />
      <img className="cloud cloud--lg cloud--8" src={cloud} alt="" />
      {/* Projects item */}
      <Item
        key="projets"
        inWindow={false}
        itemId="projets"
        outWindowLabel={t('projects')}
        triggerOpen="projets"
        srcImg={folderClosed2Icon}
      />
      {/* ABSkill shortcut */}
      <div className="item on-desktop abskill-class" ref={abskillRef} onClick={handleAbskillClick}>
        <img src={abskillSrc} alt="ABSkill" />
        <ScrambleText text="ABSkill" />
      </div>
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
