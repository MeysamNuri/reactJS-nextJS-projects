import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Profile from "./Porfile";
import EditProfile from "./EditProfile";
import Layout from "./Layout";


const App = () => {

  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route path={"/dashboard"} component={Dashboard}></Route>
          <Route path={"/teams"} component={Teams}></Route>
          <Route path={"/profile"} component={Profile}></Route>
          <Route path={"/editProfile"} component={EditProfile}></Route>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
};

export default App;