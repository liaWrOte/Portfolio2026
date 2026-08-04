const DEFAULT_WINDOW_WIDTH = 750;
const DEFAULT_WINDOW_HEIGHT = 515;
const DESKTOP_BAR_HEIGHT = 80;
const STACK_OFFSET = 50;

const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  stolify: { width: 360, height: 460 },
};

export interface Point {
  x: number;
  y: number;
}

export const getWindowTargetPosition = (windowId: string, openWindows: string[] = []): Point => {
  const desktopWidth = window.innerWidth;
  const desktopHeight = window.innerHeight - DESKTOP_BAR_HEIGHT;

  const windowIndex = windowId ? openWindows.indexOf(windowId) : -1;
  const offset = windowIndex >= 0 ? windowIndex * STACK_OFFSET : 0;

  const size = WINDOW_SIZES[windowId] ?? { width: DEFAULT_WINDOW_WIDTH, height: DEFAULT_WINDOW_HEIGHT };

  return {
    x: Math.max(0, (desktopWidth - size.width) / 2 + offset),
    y: Math.max(0, (desktopHeight - size.height) / 2 + offset)
  };
};
