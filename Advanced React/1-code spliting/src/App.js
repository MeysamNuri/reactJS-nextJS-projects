import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {lazy} from 'react'


const App = () => {

  const Home = lazy(()=>import("./Home"))
  const About = lazy(()=>import("./About"))

  console.log("salam")
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path={"/about"} component={About}/>
          <Route path={"/"} component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;