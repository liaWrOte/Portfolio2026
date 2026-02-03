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
    displayResume: false,
    windowPosition: {},
    displayArtquiz: false,

    fileSystem: null,
    window: {
        isOpen: false,
        view: 'explorer', // 'explorer' | 'project'
        activeId: null,
    },
    navigation: {
        currentPath: ['root'],
        history: [['root']],
        historyIndex: 0 
    },
    loading: true,
}

const desktopReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case SHOW_PROJECT_LABEL : {
            return {
                ...state,
                label: action.value
            }
        }

        case SHOW_WINDOW : {
            return {
                ...state,
                displayWindow: true,
                window: {
                    ...state.window,
                    isOpen: true
                }
            }
        }

        case SET_FILESYSTEM : {
            console.log(action);
            return {
                ...state,
                fileSystem: action.payload,
                loading: false,
                displayWindowItem: true
            }
        }

        case OPEN_FOLDER: {
            // Handle navigation to folders from any location
            let newPath;
            console.log('action.payload ', action.payload);
            if (action.payload === 'root' && state.navigation.currentPath.length > 2) {
                // We're in a project and clicking on "projets" (payload = 'root')
                newPath = ['root'];
            } else if (action.payload === 'root') {
                // Clicking on "projets" from root level
                newPath = ['root'];
            } else if (state.navigation.currentPath.length > 2) {
                // We're in a project and clicking on a category folder (e.g., "Brand Design")
                newPath = ['root', action.payload];
            } else {
                // Normal navigation - add folder to current path
                newPath = [...state.navigation.currentPath, action.payload];
            }
            console.log('OPEN_FOLDER ', action, newPath);
            return {
                ...state,
                window: {
                    ...state.window,
                    view: 'folder',
                    activeId: null
                },
                navigation: {
                    ...state.navigation,
                    currentPath: newPath,
                    history: newPath,
                    historyIndex: state.navigation.historyIndex + 1
                }
            };
        }

        case OPEN_PROJECT: {
            const newPath = [...state.navigation.currentPath, action.payload];
            console.log('OPEN_PROJECT ', action, newPath);
            return {
                ...state,
                window: {
                    ...state.window,
                    view: 'project',
                    activeId: action.payload
                },
                navigation: {
                    ...state.navigation,
                    currentPath: newPath,
                    history: [...state.navigation.history, newPath],
                    historyIndex: state.navigation.historyIndex + 1
                }
            };
        }

        case GO_BACK:
        return {
            ...state,
            window: { ...state.window, view: 'explorer', activeId: null },
        };

        case OPEN_WINDOW : {
            let tempArr = [...state.allProjects];
            const windowId = action.value;
            
            return {
                ...state,
                displayWindow: true,
                allProjects: tempArr,
                windowItemId: windowId,
                openWindows: !(state.openWindows.includes(windowId)) ? state.openWindows.concat(windowId) : state.openWindows,
                // Remove from minimized windows when opening
                minimizedWindows: state.minimizedWindows.filter(window => window !== windowId),
                // Handle specific window display states
                displayResume: windowId === 'resume' ? true : state.displayResume,
            }
        }

        // case OPEN_WINDOW_ITEM : {
        //     let tempArr = [...state.allProjects];
        //     tempArr.forEach(el => {
        //         el.projectOpen = 0;
        //     });
        //     tempArr[action.value].projectOpen = 1;
        //     return {
        //         ...state,
        //         displayWindowItem: true,
        //         allProjects: tempArr
        //     }
        // }

        // case OPEN_IMAGE_ITEM : {
        //     let tempArr = [...state.allProjects];
        //     let tempDisplayImageItem = state.displayImageItem;
        //     const triggerOpen = action.value.triggerOpen ?? null;
        //     tempDisplayImageItem = triggerOpen;
        //     return {
        //         ...state,
        //         allProjects: tempArr,
        //         displayImageItem: tempDisplayImageItem
        //     }
        // }

        // case SHOW_IMAGE_ITEM : {
        //     let tempArr = [...state.allProjects];
        //     const itemId = action.value.id ?? action.value;
                
        //     const media = {
        //         capture_desktop : action.value.attributes.capture_desktop,
        //         capture_desktop_2 : action.value.attributes.capture_desktop_2,
        //         capture_mobile : action.value.attributes.capture_mobile,
        //         thumbnail : action.value.attributes.thumbnail,
        //     }
        //     tempArr[itemId - 1].attributes = {
        //         ...tempArr[itemId- 1].attributes,
        //         ...media 
        //     };

        //     tempArr[itemId - 1].imgOpen = 1;

                
        //     return {
        //         ...state,
        //         // displayWindowItem: true,
        //         allProjects: tempArr
        //     }
        // }

        // case OPEN_SPECS_ITEM : {
        //     let tempArr = [...state.allProjects];
        //     tempArr[action.value].specsOpen = 1;
        //     return {
        //         ...state,
        //         // displayWindowItem: true,
        //         allProjects: tempArr
        //     }
        // }

        // case OPEN_ALL_ITEMS : {
        //     let tempArr = [...state.allProjects];
        //     console.log(tempArr[action.value]);
        //     tempArr[action.value].imgOpen = 1;
        //     tempArr[action.value].specsOpen = 1;
        //     return {
        //         ...state,
        //         // displayWindowItem: true,
        //         allProjects: tempArr
        //     }
        // }

        case CLOSE_WINDOW : {
            console.log('CLOSE_WINDOW ', action.value);
            
            // Handle simple string window IDs (from TaskBar)
            if (typeof action.value === 'string') {
                // Normalize window ID to lowercase for consistency
                const windowId = action.value.toLowerCase();
                const newOpenWindows = state.openWindows.filter(window => window !== action.value && window !== windowId);
                const newMinimizedWindows = state.minimizedWindows.filter(window => window !== action.value && window !== windowId);
                
                // Check if any windows are still open after closing this one
                const hasOtherWindows = newOpenWindows.length > 0;
                
                return {
                    ...state,
                    openWindows: newOpenWindows,
                    minimizedWindows: newMinimizedWindows,
                    // Handle specific window types
                    displayResume: (action.value === 'resume' || action.value === 'Resume') ? false : state.displayResume,
                    displayWindow: hasOtherWindows // Only close displayWindow if no other windows are open
                };
            }
            
            // Handle array format (legacy)
            if (Array.isArray(action.value)) {
                if (action.value[0] === 'Resume') {
                    return {
                        ...state,
                        displayResume: !state.displayResume,
                        openWindows: state.openWindows.filter(window => window !== 'resume' && window !== 'Resume'),
                        minimizedWindows: state.minimizedWindows.filter(window => window !== 'resume' && window !== 'Resume')
                    };
                }
                
                if (action.value.length === 1) {
                    return {
                        ...state,
                        openWindows: state.openWindows.filter(window => window !== action.value[0]),
                        minimizedWindows: state.minimizedWindows.filter(window => window !== action.value[0])
                    };
                }
            }
            
            // Default case
            return {
                ...state,
                displayWindow: false
            };
        }

        case EXPAND_WINDOW : {
            let tempArr = [...state.allProjects];
            tempArr[action.value[0]].imgExpandedWindow = !tempArr[action.value[0]].imgExpandedWindow;
            return {
                ...state,
                allProjects: tempArr
            }
        }

        case OPEN_ARTQUIZ : {
            return {
                ...state,
                displayArtquiz: true
            }
        }

        case CLOSE_ARTQUIZ : {
            return {
                ...state,
                displayArtquiz: false
            }
        }

        case MINIMIZE_WINDOW : {
            const windowId = action.payload;
            return {
                ...state,
                minimizedWindows: state.minimizedWindows.includes(windowId) 
                    ? state.minimizedWindows 
                    : [...state.minimizedWindows, windowId]
            }
        }

        case RESTORE_WINDOW : {
            const windowId = action.payload;
            return {
                ...state,
                minimizedWindows: state.minimizedWindows.filter(id => id !== windowId)
            }
        }

        case TOGGLE_WINDOW : {
            const windowId = action.payload;
            const isMinimized = state.minimizedWindows.includes(windowId);
            return {
                ...state,
                minimizedWindows: isMinimized 
                    ? state.minimizedWindows.filter(id => id !== windowId)
                    : [...state.minimizedWindows, windowId]
            }
        }

        default: return {...state};
    }
}

export default desktopReducer;
