import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

setInterval(() => {
    let Time =(
        <div>
            <p>time is {new Date().toLocaleTimeString()}</p>
        </div>
    )
      ReactDOM.render(Time ,document.getElementById("time"))
  }, 1000);


serviceWorker.unregister();