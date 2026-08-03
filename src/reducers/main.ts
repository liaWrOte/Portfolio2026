import {
  SHOW_PROJECT_LABEL,
  SHOW_WINDOW,
  SHOW_ALL_PROJECTS,
  OPEN_WINDOW,
  OPEN_WINDOW_ITEM,
  OPEN_IMAGE_ITEM,
  OPEN_SPECS_ITEM,
  OPEN_ALL_ITEMS,
  CLOSE_WINDOW,
  SHOW_IMAGE_ITEM,
  OPEN_STOLIFY,
  EXPAND_WINDOW,
  SET_POSITION,
  OPEN_ARTQUIZ,
  CLOSE_ARTQUIZ,
  MINIMIZE_WINDOW,
  RESTORE_WINDOW,
  TOGGLE_WINDOW,
  SET_FILESYSTEM,
  OPEN_PROJECT,
  OPEN_FOLDER,
  GO_BACK,
  GO_FORWARD
} from '../actions/main';

const initialState = {
  label: '',
  displayWindow: false,
  allProjects: [],
  displayWindowItem: false,
  windowItemId: '',
  displayImageItem: false,
  displaySpecsItem: false,
  displayAllItems: false,
  openWindows: [],
  minimizedWindows: [],
  openedWindows: [], // Tracker les fenêtres qui ont été ouvertes au moins une fois
  displayResume: false,
  windowPosition: {},
  windowPositions: {}, // Position de l'icône au clic, par windowId (pour l'effet "genie")
  displayArtquiz: false,
  fileSystem: null,
  window: {
    isOpen: false,
    view: 'explorer', // 'explorer' | 'project'
    activeId: null
  },
  navigation: {
    currentPath: ['root'],
    history: [{ view: 'explorer', currentPath: ['root'], activeId: null }],
    historyIndex: 0
  },
  loading: true
};

const desktopReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_PROJECT_LABEL: {
      return {
        ...state,
        label: action.value
      };
    }
    case SHOW_WINDOW: {
      return {
        ...state,
        displayWindow: true,
        window: {
          ...state.window,
          isOpen: true
        }
      };
    }

    case SET_FILESYSTEM: {
      console.log(action);
      return {
        ...state,
        fileSystem: action.payload,
        loading: false,
        displayWindowItem: true
      };
    }

    case OPEN_FOLDER: {
      let newPath;
      if (action.payload === 'root' && state.navigation.currentPath.length > 2) {
        newPath = ['root'];
      } else {
        newPath = [...state.navigation.currentPath, action.payload];
      }
      const folderEntry = { view: 'folder', currentPath: newPath, activeId: null };
      const truncatedF = state.navigation.history.slice(0, state.navigation.historyIndex + 1);
      const newHistoryF = [...truncatedF, folderEntry];
      return {
        ...state,
        window: { ...state.window, view: 'folder', activeId: null },
        navigation: {
          currentPath: newPath,
          history: newHistoryF,
          historyIndex: newHistoryF.length - 1
        }
      };
    }

    case OPEN_PROJECT: {
      const newPath = [...state.navigation.currentPath, action.payload];
      const projectEntry = { view: 'project', currentPath: newPath, activeId: action.payload };
      const truncatedP = state.navigation.history.slice(0, state.navigation.historyIndex + 1);
      const newHistoryP = [...truncatedP, projectEntry];
      return {
        ...state,
        window: { ...state.window, view: 'project', activeId: action.payload },
        navigation: {
          currentPath: newPath,
          history: newHistoryP,
          historyIndex: newHistoryP.length - 1
        }
      };
    }

    case GO_BACK: {
      const newIndexB = Math.max(0, state.navigation.historyIndex - 1);
      const entryB = state.navigation.history[newIndexB];
      if (!entryB) return state;
      return {
        ...state,
        window: { ...state.window, view: entryB.view, activeId: entryB.activeId },
        navigation: { ...state.navigation, currentPath: entryB.currentPath, historyIndex: newIndexB }
      };
    }

    case GO_FORWARD: {
      const newIndexF = Math.min(state.navigation.history.length - 1, state.navigation.historyIndex + 1);
      const entryF = state.navigation.history[newIndexF];
      if (!entryF) return state;
      return {
        ...state,
        window: { ...state.window, view: entryF.view, activeId: entryF.activeId },
        navigation: { ...state.navigation, currentPath: entryF.currentPath, historyIndex: newIndexF }
      };
    }

    case SET_POSITION: {
      return {
        ...state,
        windowPositions: {
          ...state.windowPositions,
          [action.windowId]: action.value
        }
      };
    }

    case OPEN_WINDOW: {
      let tempArr = [...state.allProjects];
      const windowId = action.value;
      return {
        ...state,
        displayWindow: true,
        allProjects: tempArr,
        windowItemId: windowId,
        openWindows: !state.openWindows.includes(windowId)
          ? state.openWindows.concat(windowId)
          : state.openWindows,
        openedWindows: !state.openedWindows.includes(windowId)
          ? state.openedWindows.concat(windowId)
          : state.openedWindows,
        minimizedWindows: state.minimizedWindows.filter((window) => window !== windowId),
        displayResume: windowId === 'resume' ? true : state.displayResume
      };
    }

    case CLOSE_WINDOW: {
      console.log('CLOSE_WINDOW ', action.value);
      if (typeof action.value === 'string') {
        const windowId = action.value.toLowerCase();
        return {
          ...state,
          openWindows: state.openWindows.filter(
            (window) => window !== action.value && window !== windowId
          ),
          minimizedWindows: state.minimizedWindows.filter(
            (window) => window !== action.value && window !== windowId
          ),
          displayResume:
            action.value === 'resume' || action.value === 'Resume' ? false : state.displayResume,
          displayWindow: action.value === 'projets' ? false : state.displayWindow
        };
      }
      if (Array.isArray(action.value)) {
        if (action.value[0] === 'Resume') {
          return {
            ...state,
            displayResume: !state.displayResume,
            openWindows: state.openWindows.filter(
              (window) => window !== 'resume' && window !== 'Resume'
            ),
            minimizedWindows: state.minimizedWindows.filter(
              (window) => window !== 'resume' && window !== 'Resume'
            )
          };
        }
        if (action.value.length === 1) {
          return {
            ...state,
            displayWindowItem: false,
            openWindows: state.openWindows.filter((window) => window !== action.value[0]),
            minimizedWindows: state.minimizedWindows.filter((window) => window !== action.value[0])
          };
        }
        if (action.value.length === 2) {
          return {
            ...state,
            displayWindowItem: false,
            openWindows: state.openWindows.filter((window) => !action.value.includes(window)),
            minimizedWindows: state.minimizedWindows.filter(
              (window) => !action.value.includes(window)
            )
          };
        }
      }
    }
    case OPEN_ARTQUIZ: {
      return {
        ...state,
        displayArtquiz: true
      };
    }
    case CLOSE_ARTQUIZ: {
      return {
        ...state,
        displayArtquiz: false
      };
    }
    case MINIMIZE_WINDOW: {
      const windowId = action.payload;
      return {
        ...state,
        minimizedWindows: state.minimizedWindows.includes(windowId)
          ? state.minimizedWindows
          : [...state.minimizedWindows, windowId]
      };
    }
    case RESTORE_WINDOW: {
      const windowId = action.payload;
      return {
        ...state,
        minimizedWindows: state.minimizedWindows.filter((id) => id !== windowId)
      };
    }
    case TOGGLE_WINDOW: {
      const windowId = action.payload;
      const isMinimized = state.minimizedWindows.includes(windowId);
      return {
        ...state,
        minimizedWindows: isMinimized
          ? state.minimizedWindows.filter((id) => id !== windowId)
          : [...state.minimizedWindows, windowId]
      };
    }
    default:
      return { ...state };
  }
};

export default desktopReducer;
