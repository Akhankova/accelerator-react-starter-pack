import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createAPI } from './services/api';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
