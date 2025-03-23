import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
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

          <Route exact path={"/"} component={Home} />
          <Route path={"/hashtags/:hashtag"} component={HastagTweetList} />
          <Route path={"/users/:user"} component={TweetsByUsers} />
          <Route component={Page404}/>
        </Layout>
      }} />
    </BrowserRouter>

  );
}

export default App;
