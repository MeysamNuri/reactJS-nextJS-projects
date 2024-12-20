import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Components/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

