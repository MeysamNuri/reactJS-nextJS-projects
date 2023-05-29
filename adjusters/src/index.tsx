import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./globalState.css";
import "antd/dist/antd.css";


ReactDOM.render(
  <React.StrictMode>
    {console.log('%c adjuster version 1.3.9', 'background: #f542ec; color: #ffffff; border-radius: 4px; padding: 2px 5px; border: 2px solid #ffffff')}
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
