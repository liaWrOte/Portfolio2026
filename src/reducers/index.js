import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './project';

const rootReducer = combineReducers({
    project: projectReducer,
});

export default rootReducer;