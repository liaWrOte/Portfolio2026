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
} from '../actions/desktop';

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
    displayArtQuiz: false
}

const desktopReducer = (state = initialState, action = {}) => {
    console.log('reducer ', action.type);
    console.log('action ', action);
    console.log('action reçue ', action.value);
    console.log('state ', state);
    switch (action.type) {

        case SHOW_PROJECT_LABEL : {
            return {
                ...state,
                label: action.value
            }
        }

        case SHOW_WINDOW : {
            console.error('DISPLAY WINDOW');
            console.log(action.value);
            return {
                ...state,
                displayWindow: action.value
            }
        }

        case SHOW_ALL_PROJECTS : {
            let tempArr = action.value;
            console.log(state.allProjects.length);
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
            console.error('OPEN WINDOW');
            console.log(action.value);
            return {
                ...state,
                // displayWindow: true,
                openWindows: state.openWindows.concat(action.value)
            }
        }

        case OPEN_WINDOW_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr[action.value].projectOpen = 1;
            console.log(tempArr);
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case OPEN_IMAGE_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr[action.value].imgOpen = 1;
            console.error('OPEN');
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case SHOW_IMAGE_ITEM : {
            let tempArr = [...state.allProjects];
            tempArr = state.allProjects;
            console.error('SHOW');
                
                let media = {
                    capture_desktop : action.value.attributes.capture_desktop,
                    capture_desktop_2 : action.value.attributes.capture_desktop_2,
                    capture_mobile : action.value.attributes.capture_mobile,
                    thumbnail : action.value.attributes.thumbnail,
                }
                console.log(action.value.id - 1);
                tempArr[action.value.id - 1].attributes = {
                   ...tempArr[action.value.id - 1].attributes,
                   ...media 
                };

                // tempArr[action.value].imgOpen = 1;

                console.log(tempArr[action.value.id - 1]);

                console.log(action.value)
                
            tempArr[action.value.id - 1].imgOpen = 1;
            console.log(tempArr);
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
            console.error(tempArr[action.value]);
            return {
                ...state,
                // displayWindowItem: true,
                allProjects: tempArr
            }
        }

        case CLOSE_WINDOW : {
            console.log(action.value);
            if (action.value !== undefined && action.value[0] !== undefined && action.value[1] === undefined) {
                let tempArr = [...state.allProjects];
                tempArr[action.value[0]].projectOpen = 0;
                console.log(1);
                return {
                    ...state,
                    // displayWindowItem: true,
                    allProjects: tempArr,
                }
            }

            if (action.value !== undefined && action.value[0] === 'cv') {
                return {
                    ...state,
                    displayCv: !state.displayCv
                }
            }
            
            if (action.value !== undefined && action.value[1] !== undefined) {
                console.log(2);
                let tempArr = [...state.allProjects];
                let type = action.value[1] + "Open";
                tempArr[action.value[0]][type] = 0;
                return {
                    ...state,
                    // displayWindowItem: true,
                    allProjects: tempArr
                }
            }

            if (action.value === undefined) {
                return {
                    ...state,
                    // displayWindowItem: true,
                    displayWindow: !state.displayWindow
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
            console.log(action.value);
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
            console.log('SET POSITION ', action.value);
            return {
                ...state,
                windowPosition: action.value,
            }
        }

        default: return {...state};
    }
}

export default desktopReducer;
