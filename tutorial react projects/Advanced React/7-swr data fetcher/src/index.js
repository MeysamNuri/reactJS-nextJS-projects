import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{fetcher:(url)=>axios(url).then(res=>res.data)}}>
    <App/>
    </SWRConfig>
  
  </React.StrictMode>,
document.getElementById('root')
)
;
