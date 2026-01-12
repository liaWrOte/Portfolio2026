import { actions } from '@storybook/addon-actions';
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
    OPEN_CV,
    SET_POSITION,
    OPEN_ARTQUIZ,
    
    SET_FILESYSTEM,
    OPEN_PROJECT,
    OPEN_FOLDER,
    GO_BACK,
    FETCH_PROJECTS
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
    displayCv: false,
    windowPosition: {},
    displayArtquiz: false,

    fileSystem: null,
    window: {
        isOpen: true,
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
                displayWindow: action.value
            }
        }

        case SET_FILESYSTEM : {
            return {
                ...state,
                fileSystem: action.payload,
                loading: false
            }
        }

        case OPEN_FOLDER: {
            const newPath = [...state.navigation.currentPath, action.payload];
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
                history: [...state.navigation.history, newPath],
                historyIndex: state.navigation.historyIndex + 1
                }
            };
        }

        case OPEN_PROJECT:
        return {
            ...state,
            window: {
                ...state.window,
                view: 'project',
                activeId: action.payload
                }
        };

        case GO_BACK:
        return {
            ...state,
            window: { ...state.window, view: 'explorer', activeId: null },
        };

        case OPEN_WINDOW : {
            let tempArr = [...state.allProjects];
            tempArr.forEach((project, id) => {
                project.projectOpen = 0;
            })
            return {
                ...state,
                // displayWindow: true,
                allProjects: tempArr,
                windowItemId: action.value,
                openWindows: !(state.openWindows.includes(action.value)) ? state.openWindows.concat(action.value) : state.openWindows,
                displayWindowItem: false,
            }
        }

        case OPEN_WINDOW_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr.forEach(el => {
                el.projectOpen = 0;
            });
            tempArr[action.value].projectOpen = 1;
            return {
                ...state,
                displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case OPEN_IMAGE_ITEM : {
            let tempArr = [...state.allProjects];
            let tempDisplayImageItem = state.displayImageItem;
            const triggerOpen = action.value.triggerOpen ?? null;
            tempDisplayImageItem = triggerOpen;
            return {
                ...state,
                allProjects: tempArr,
                displayImageItem: tempDisplayImageItem
            }
        }

        case SHOW_IMAGE_ITEM : {
            let tempArr = [...state.allProjects];
            const itemId = action.value.id ?? action.value;
                
            const media = {
                capture_desktop : action.value.attributes.capture_desktop,
                capture_desktop_2 : action.value.attributes.capture_desktop_2,
                capture_mobile : action.value.attributes.capture_mobile,
                thumbnail : action.value.attributes.thumbnail,
            }
            tempArr[itemId - 1].attributes = {
                ...tempArr[itemId- 1].attributes,
                ...media 
            };

            tempArr[itemId - 1].imgOpen = 1;

                
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case OPEN_SPECS_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr[action.value].specsOpen = 1;
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case OPEN_ALL_ITEMS : {
            let tempArr = [...state.allProjects];
            console.log(tempArr[action.value]);
            tempArr[action.value].imgOpen = 1;
            tempArr[action.value].specsOpen = 1;
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case CLOSE_WINDOW : {
            console.log('CLOSE_WINDOW ', action.value);
            if (action.value !== undefined && action.value[0] !== undefined && action.value[1] === undefined) {
                console.error(1);
                let tempArr = [...state.allProjects];
                // tempArr.forEach((project, id) => {
                    //     project.projectOpen = 0;
                    // })
                    tempArr[action.value[0]].projectOpen = 0;
                    return {
                        ...state,
                        // displayWindowItem: true,
                        openWindows: state.openWindows.filter(window => window !== action.value),
                        allProjects: tempArr
                        
                    }
                }
                
            if (action.value !== undefined && action.value[0] === 'cv') {
                console.error(2);
                return {
                    ...state,
                    displayCv: !state.displayCv
                }
            }
            
            if (action.value !== undefined && action.value[1] !== undefined) {
                console.error(3);
                let tempArr = [...state.openWindows];
                // let type = action.value[1] + "Open";
                tempArr = tempArr.filter((window) => window !== action.value);
                return {
                    ...state,
                    // displayWindowItem: true,
                    displayWindow: false,
                    openWindows: tempArr
                }
            }
            
            if (action.value === undefined) {
                console.error(4);
                return {
                    ...state,
                    displayWindowItem: false
                }
            }

            return {
                ...state,
                // displayWindowItem: true,
                displayWindow: false
            }
        }

        case EXPAND_WINDOW : {
            let tempArr = [...state.allProjects];
            tempArr[action.value[0]].imgExpandedWindow = !tempArr[action.value[0]].imgExpandedWindow;
            return {
                ...state,
                allProjects: tempArr
            }
        }

        case OPEN_CV : {
            return {
                ...state,
                displayCv: !state.displayCv,
            }
        }

        case SET_POSITION : {
            return {
                ...state,
                windowPosition: action.value,
            }
        }

        case OPEN_ARTQUIZ : {
            return {
                ...state,
                displayArtquiz: true,
            }
        }

        default: return {...state};
    }
}

export default desktopReducer;
