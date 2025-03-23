import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


