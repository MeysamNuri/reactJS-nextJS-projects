import { Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header.js';
import NewTweet from './Components/NewT.js';
import TweetList from './Components/TweetList.js';
import useStyle from './style.js'
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios'
import { getAllTweets } from '../../API/api_tweets.js';
import { toast } from 'react-toastify';
const Home = () => {
const [tweets,setTweets]=useState([])

useEffect(()=>{
  updateTweet()
},[])
const updateTweet=()=>{
  getAllTweets((isok,data)=>{
    if(!isok)
    return toast.error("ناموفق بود")
    else setTweets(data)
  })
}
console.log(tweets);
    const classes=useStyle()
    return ( 

      <>

<div className={classes.root}>
<Header title={"خانه"} icon={<HomeIcon />}/>
<Divider lassName={classes.divider}/>
<NewTweet updateTweet={updateTweet}/>
<TweetList data={tweets}/>
        </div>
  
      </>
     );
}
 
export default Home;