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

export default store;
