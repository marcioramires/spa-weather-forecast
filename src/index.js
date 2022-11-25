import React from 'react';
import ReactDOM from 'react-dom/client';

import Routes from './routes';
import GlobalStyles from './styles/globalStyles.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes />
    <GlobalStyles />
  </React.StrictMode>
);