import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Components/theme';
import 'react-toastify/dist/ReactToastify.css';
import { TweetProvider } from './Context/TweetContext';
ReactDOM.render(
  <React.StrictMode>
    <TweetProvider>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </TweetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

