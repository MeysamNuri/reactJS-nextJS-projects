import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CounterProvider } from './contex/ContextReducer';

ReactDOM.render(

  <React.StrictMode>
    <CounterProvider>
    <App />
    </CounterProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
