import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../pages/auth/Auth';
import HastagTweetList from '../pages/HastagTweetList/HastagTweetList';
import Home from '../pages/Home/Home';
import TweetsByUsers from '../pages/TweetsByUser';
import Layout from './Layout/layout';
import Page404 from './Page404';



function App() {

  return (

    <BrowserRouter>
      <Switch>

        <PublicRoute path={"/login"} component={Login} />
        <PrivateRoute path={"/"} render={() => {
          return <Layout>

            <Switch>
              <Route path={"/"} exact component={Home} />
              <Route path={"/hashtags/:hashtag"} exact component={HastagTweetList} />
              <Route path={"/users/:user"} exact component={TweetsByUsers} />
              <Route component={Page404} />
            </Switch>
          </Layout>
        }} />

      </Switch>
      <ToastContainer />
    </BrowserRouter>


  );
}

const isLogin = () => !!localStorage.getItem("token")

console.log(isLogin());

const PublicRoute = ({ component, ...props }) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return <Redirect to={"/"} />
    else {
      return React.createElement(component,props)
    }
  }} />
}
 
  const PrivateRoute=({render,...props})=>{
    return <Route {...props} render={(props)=>{
      if(isLogin())
      return render(props)
      // return React.createElement(component)
      else return <Redirect to={"/login"}/>
    }} />
  }
export default App;
