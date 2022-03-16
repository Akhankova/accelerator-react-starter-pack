import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {smallCardGuitar} from './mocks/cards';

ReactDOM.render(
  <React.StrictMode>
    <App cards = {smallCardGuitar}/>
  </React.StrictMode>,
  document.getElementById('root'));
