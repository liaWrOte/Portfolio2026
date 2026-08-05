import { configureStore } from '@reduxjs/toolkit';
import mainMiddleware from './middlewares/main';
import mainReducer from './reducers/main';

const store = configureStore({
  reducer: {
    main: mainReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(mainMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
