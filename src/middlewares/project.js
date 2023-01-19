import axios from 'axios';
import apiUrl from './env';

import {
    GET_PROJECT,
} from '../actions/project';

const project = (store) => (next) => function (action) {
    switch (action.type) {
        default:
            next(action);
    }
};

export default project;