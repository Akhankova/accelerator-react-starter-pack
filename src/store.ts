import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
//import { loadCardsFirst } from './store/api-actions';
import { rootReducer } from './store/root-reducer';

export const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
//store.dispatch(loadCardsFirst());

export default store;
