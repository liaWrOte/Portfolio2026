import { configureStore } from '@reduxjs/toolkit';
import desktopMiddleware from './middlewares/desktop';
import desktopReducer from './reducers/desktop';

const store = configureStore({
    reducer: {
        desktop: desktopReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        }).concat(desktopMiddleware),
})

console.log('store ', store.getState());


export default store;