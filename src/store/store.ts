import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { loadCardsSerch } from './api-actions';
import { rootReducer } from './root-reducer';

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

store.dispatch(loadCardsSerch());


export default store;
