import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './pages/admin';
import Home from './pages/Home';
import Login from './pages/login';

const App = () => {
  const isLogin = () => !!localStorage.getItem("Auth-key")

  const PublicRoute = ({ component, ...props }) => {
    return <Route {...props} render={() => {
      if (isLogin())
        return <Redirect to={"/admin"} />
      else return React.createElement(component)
    }
    } />
  }
  const PrivateRoute = ({ component, ...props }) => {
    return <Route {...props} render={() => {
      if (isLogin())
        return React.createElement(component) 
      else 
      return <Redirect to={"/login"} />
    }
    } />
  }
  return (
    <>
      <BrowserRouter>

        <Switch>
          <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
          <Route path={"/home"} component={Home} />
          <PrivateRoute path={"/admin"} component={Admin}/>
          <PublicRoute path={"/login"} component={Login}/>
        </Switch>
      </BrowserRouter>



      {/* <BrowserRouter>
<Switch>
  <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
  <Route path={"/home"} component={Home} />
  <Route path={"/admin"} render={()=>!isLogin()?<Redirect to={"/login"}/>:(<Admin />)}/>
  <Route path={"/login"} render={()=>isLogin()?<Redirect to={"/admin"}/>:(<Login />)} />
</Switch>
</BrowserRouter> */}

    </>


  )
}
export default App