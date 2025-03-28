import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { initializeFirebase } from './push-notification';
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Router>
    <App />
    </Router>, document.getElementById('root'));
// registerServiceWorker()
initializeFirebase();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
