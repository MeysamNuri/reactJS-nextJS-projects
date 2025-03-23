import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Login from './page/Login';


function App() {
  return (

    <Switch>
      <Route path="/login" exact component={Login} />
      <Route component={Login} />

    </Switch>


  );
}

export default App;
