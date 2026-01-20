export const GET_PROJECT = 'GET_PROJECT';
export const SHOW_PROJECT_LABEL = 'SHOW_PROJECT_LABEL';
export const OPEN_WINDOW = 'OPEN_WINDOW';
export const SHOW_WINDOW = 'SHOW_WINDOW';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const SHOW_ALL_PROJECTS = 'SHOW_ALL_PROJECTS';
export const OPEN_WINDOW_ITEM = 'OPEN_WINDOW_ITEM';
export const SHOW_WINDOW_ITEM = 'SHOW_WINDOW_ITEM';
export const OPEN_IMAGE_ITEM = 'OPEN_IMAGE_ITEM';
export const OPEN_SPECS_ITEM = 'OPEN_SPECS_ITEM';
export const OPEN_ALL_ITEMS = 'OPEN_ALL_ITEMS';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const SHOW_IMAGE_ITEM = 'SHOW_IMAGE_ITEM';
export const EXPAND_WINDOW = 'EXPAND_WINDOW';
export const SET_POSITION = 'SET_POSITION';
export const OPEN_STOLIFY = 'OPEN_STOLIFY';
export const OPEN_ARTQUIZ = 'OPEN_ARTQUIZ';
export const CLOSE_ARTQUIZ = 'CLOSE_ARTQUIZ';

export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const RESTORE_WINDOW = 'RESTORE_WINDOW';
export const TOGGLE_WINDOW = 'TOGGLE_WINDOW';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SET_FILESYSTEM = 'SET_FILESYSTEM';
export const OPEN_FOLDER = 'OPEN_FOLDER';
export const OPEN_PROJECT = 'OPEN_PROJECT';
export const GO_BACK = 'GO_BACK';

export const getProject = () => ({
    type: GET_PROJECT,
})

export const showProjectLabel = (value) => ({
    type: SHOW_PROJECT_LABEL,
    value,
})

export const openWindow = (value) => ({
    type: OPEN_WINDOW,
    value
})

export const showWindow = (value) => ({
    type: SHOW_WINDOW,
    value,
})

export const getAllProjects = () => ({
    type: GET_ALL_PROJECTS,
})

export const showAllProjects = (value) => ({
    type: SHOW_ALL_PROJECTS,
    value,
})

export const openWindowItem = (value) => ({
    type: OPEN_WINDOW_ITEM,
    value,
})

export const openImageItem = (value) => ({
    type: OPEN_IMAGE_ITEM,
    value,
})

export const openSpecsItem = (value) => ({
    type: OPEN_SPECS_ITEM,
    value,
})

export const openAllItems = (value) => ({
    type: OPEN_ALL_ITEMS,
    value,
})

export const closeWindow = (value) => ({
    type: CLOSE_WINDOW,
    value,
})

export const showImageItem = (value) => ({
    type: SHOW_IMAGE_ITEM,
    value,
})

export const expandWindow = (value) => ({
    type: EXPAND_WINDOW,
    value
})

export const setPosition = (value) => ({
    type: SET_POSITION,
    value
})

export const openArtquiz = () => ({
    type: OPEN_ARTQUIZ
})

export const closeArtquiz = () => ({
    type: CLOSE_ARTQUIZ
})

export const fetchProjects = () => ({ type: 'FETCH_PROJECTS' });

export const setFileSystem = (fs) => ({
    type: SET_FILESYSTEM,
    payload: fs
})

export const openFolder = (id) => ({
    type: OPEN_FOLDER,
    payload: id
})

export const openProject = (id) => ({
    type: OPEN_PROJECT,
    payload: id
})

export const goBack = (value) => ({
    type: GO_BACK,
    value
})

export const minimizeWindow = (windowId) => ({
    type: MINIMIZE_WINDOW,
    payload: windowId
})

export const restoreWindow = (windowId) => ({
    type: RESTORE_WINDOW,
    payload: windowId
})

export const toggleWindow = (windowId) => ({
    type: TOGGLE_WINDOW,
    payload: windowId
})

