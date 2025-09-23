import axios from 'axios';
import { apiUrl, backendUrl } from './env';

import {
    GET_PROJECT,
    showProjectLabel,
    OPEN_WINDOW, 
    showWindow,
    GET_ALL_PROJECTS,
    showAllProjects,
    showWindowItem,
    OPEN_IMAGE_ITEM,
    openWindowItem,
    openImageItem,
    showImageItem
} from '../actions/main';


const desktopMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case GET_PROJECT:
            axios.get(`${apiUrl}/projects?populate=media`)
            .then((response) => {
                let label = response.data.data[0].attributes.title;
                store.dispatch(showProjectLabel(label));

            })
            .catch((error) => {
                console.error(error);
            });
            next(action);
            break;

        case OPEN_WINDOW:
            store.dispatch(showWindow(true));
            next(action);
            break;

        case GET_ALL_PROJECTS: 
            axios.get(`${apiUrl}/projects?populate=*`)
            .then((response) => {
                let projects = response.data.data;
                store.dispatch(showAllProjects(projects));
            })
            .catch((error) => {
                console.error(error);
            });
            next(action);
            break;

        case OPEN_IMAGE_ITEM:
            let id = action.value + 1;
            axios.get(`${apiUrl}/projects/${id}?populate=*`)
            .then((response) => {
                let project = response.data.data;
                let test = store.dispatch(showImageItem(project));
            })
            .catch((error) => {
                console.error(error);
            });
            next(action);
            break;

        default:
            next(action);
    }
};

export default desktopMiddleware;