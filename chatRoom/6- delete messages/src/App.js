import React from 'react';
import { Route,Switch } from 'react-router-dom';
import ChatRoom from './ChatRoom/Chatrrom';
import Login from './page/Login';


function App() {
  return (

    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/chatroom" exact component={ChatRoom} />
      <Route exact path="/" component={Login} />

    </Switch>


  );
}

export default App;
