import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HastagTweetList from '../pages/HastagTweetList/HastagTweetList';
import Home from '../pages/Home/Home';
import TweetsByUsers from '../pages/TweetsByUser';
import Layout from './Layout/layout';
import Page404 from './Page404';
function App() {

  return (

    <BrowserRouter>
      <Route render={() => {
        return <Layout>

          <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/hashtags/:hashtag"} exact component={HastagTweetList} />
          <Route path={"/users/:user"} exact component={TweetsByUsers} />
          <Route component={Page404}/>
          </Switch>
        </Layout>
      }} />
     
    </BrowserRouter>

  );
}

export default App;
