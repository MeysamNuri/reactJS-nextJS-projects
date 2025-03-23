import React from 'react';
import "./App.css";
import { Provider } from "react-redux";
import store from './../boot/redux'
import Header from "../Layout/Header";

import Tabs from './../components/Tabs'

function App() {
  return (
    <Provider store={store}>
      <div className="main">
        <div className="App">
        <Header />
        <Tabs />
       
        </div>
      </div>
    </Provider>
  );
}

export default App;
