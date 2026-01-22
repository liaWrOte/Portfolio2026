import { Project, WindowState } from '../types';

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

export const showProjectLabel = (value: string) => ({
    type: SHOW_PROJECT_LABEL,
    value,
})

export const openWindow = (value: WindowState) => ({
    type: OPEN_WINDOW,
    value
})

export const showWindow = (value: boolean) => ({
    type: SHOW_WINDOW,
    value,
})

export const getAllProjects = () => ({
    type: GET_ALL_PROJECTS,
})

export const showAllProjects = (value: Project[]) => ({
    type: SHOW_ALL_PROJECTS,
    value,
})

export const openWindowItem = (value: boolean) => ({
    type: OPEN_WINDOW_ITEM,
    value,
})

export const openImageItem = (value: boolean) => ({
    type: OPEN_IMAGE_ITEM,
    value,
})

export const openSpecsItem = (value: boolean) => ({
    type: OPEN_SPECS_ITEM,
    value,
})

export const openAllItems = (value: boolean) => ({
    type: OPEN_ALL_ITEMS,
    value,
})

export const closeWindow = (value: string) => ({
    type: CLOSE_WINDOW,
    value,
})

export const showImageItem = (value: boolean) => ({
    type: SHOW_IMAGE_ITEM,
    value,
})

export const expandWindow = (value: string) => ({
    type: EXPAND_WINDOW,
    value
})

export const setPosition = (value: { x: number; y: number }) => ({
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

export const setFileSystem = (fs: any) => ({
    type: SET_FILESYSTEM,
    payload: fs
})

export const openFolder = (id: string) => ({
    type: OPEN_FOLDER,
    payload: id
})

export const openProject = (id: string) => ({
    type: OPEN_PROJECT,
    payload: id
})

export const goBack = (value: boolean) => ({
    type: GO_BACK,
    value
})

export const minimizeWindow = (windowId: string) => ({
    type: MINIMIZE_WINDOW,
    payload: windowId
})

export const restoreWindow = (windowId: string) => ({
    type: RESTORE_WINDOW,
    payload: windowId
})

export const toggleWindow = (windowId: string) => ({
    type: TOGGLE_WINDOW,
    payload: windowId
})

