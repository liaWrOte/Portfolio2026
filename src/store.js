import { configureStore } from '@reduxjs/toolkit';
import projectMiddleware from './middlewares/project';
import rootReducer from './reducers';

export default configureStore({
    reducer: rootReducer,
    middleware: {
        projectMiddleware,
    }
})