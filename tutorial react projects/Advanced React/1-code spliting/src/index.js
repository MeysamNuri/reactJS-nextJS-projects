import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render(
  <Suspense fallback={<h1>لطفا صبر کنید</h1>}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
)
;
