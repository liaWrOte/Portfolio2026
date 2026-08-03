// Position cible par défaut d'une fenêtre (centrée sur le bureau, avec un
// décalage en cascade selon son index dans openWindows). Logique partagée
// entre Window.tsx (positionnement réel des fenêtres) et tout composant qui
// a besoin de connaître à l'avance où une fenêtre va apparaître (ex: une
// animation qui part d'une icône vers l'emplacement de sa fenêtre).
const WINDOW_WIDTH = 750;
const WINDOW_HEIGHT = 515;
const DESKTOP_BAR_HEIGHT = 80;
const STACK_OFFSET = 50;

export interface Point {
  x: number;
  y: number;
}

export const getWindowTargetPosition = (windowId: string, openWindows: string[] = []): Point => {
  const desktopWidth = window.innerWidth;
  const desktopHeight = window.innerHeight - DESKTOP_BAR_HEIGHT;

  const windowIndex = windowId ? openWindows.indexOf(windowId) : -1;
  const offset = windowIndex >= 0 ? windowIndex * STACK_OFFSET : 0;

  return {
    x: Math.max(0, (desktopWidth - WINDOW_WIDTH) / 2 + offset),
    y: Math.max(0, (desktopHeight - WINDOW_HEIGHT) / 2 + offset)
  };
};
