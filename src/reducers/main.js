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
    OPEN_ARTQUIZ
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
    displayArtquiz: false
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

        case SHOW_ALL_PROJECTS : {
            let tempArr = action.value;
            if (state.allProjects.length === 0) {
                tempArr.forEach(el => {
                    el.projectOpen = 0;
                    el.imgOpen = 0;
                    el.specsOpen = 0;
                    el.imgExpandedWindow = false;
                });
                return {
                    ...state,
                    allProjects: tempArr
                }
            } else {
                return {
                    ...state
                }
            }

        }

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
            tempArr[action.value].projectOpen = 1;
            return {
                ...state,
                displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case OPEN_IMAGE_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr[action.value].imgOpen = 1;
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case SHOW_IMAGE_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr = state.allProjects;
                
                let media = {
                    capture_desktop : action.value.attributes.capture_desktop,
                    capture_desktop_2 : action.value.attributes.capture_desktop_2,
                    capture_mobile : action.value.attributes.capture_mobile,
                    thumbnail : action.value.attributes.thumbnail,
                }
                tempArr[action.value.id - 1].attributes = {
                   ...tempArr[action.value.id - 1].attributes,
                   ...media 
                };

                // tempArr[action.value].imgOpen = 1;

                
            tempArr[action.value.id - 1].imgOpen = 1;
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
            tempArr[action.value].imgOpen = 1;
            tempArr[action.value].specsOpen = 1;
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case CLOSE_WINDOW : {
            if (action.value !== undefined && action.value[0] !== undefined && action.value[1] === undefined) {
                console.log(action);
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
                return {
                    ...state,
                    displayCv: !state.displayCv
                }
            }
            
            if (action.value !== undefined && action.value[1] !== undefined) {
                let tempArr = [...state.allProjects];
                let type = action.value[1] + "Open";
                tempArr[action.value[0]][type] = 0;
                return {
                    ...state,
                    // displayWindowItem: true,
                    // allProjects: tempArr
                }
            }

            if (action.value === undefined) {
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
