const DESKTOP_BAR_HEIGHT = 80;

// Fixed-size windows
const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  stolify: { width: 360, height: 460 },
  artquiz: { width: 450, height: 620 },
};

// Default windows use CSS: width: 62vw, height: 66vh
const DEFAULT_WINDOW_WIDTH_RATIO = 0.62;
const DEFAULT_WINDOW_HEIGHT_RATIO = 0.66;

export interface Point {
  x: number;
  y: number;
}

export const getWindowTargetPosition = (windowId: string, openWindows: string[] = []): Point => {
  const desktopWidth = window.innerWidth;
  const desktopHeight = window.innerHeight - DESKTOP_BAR_HEIGHT;

  let winWidth: number;
  let winHeight: number;

  if (windowId in WINDOW_SIZES) {
    const s = WINDOW_SIZES[windowId];
    winWidth = s.width;
    winHeight = s.height;
  } else {
    winWidth = DEFAULT_WINDOW_WIDTH_RATIO * desktopWidth;
    winHeight = DEFAULT_WINDOW_HEIGHT_RATIO * window.innerHeight;
  }

  return {
    x: Math.max(0, (desktopWidth - winWidth) / 2),
    y: Math.max(0, (desktopHeight - winHeight) / 2)
  };
};
