import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {SWRConfig} from "swr";
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{fetcher: (url) => axios(url).then(res => res.data)}}>
      <App/>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);
