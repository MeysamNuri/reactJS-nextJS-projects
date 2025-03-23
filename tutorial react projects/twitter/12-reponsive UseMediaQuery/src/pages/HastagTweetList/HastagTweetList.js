import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import TweetList from '../Home/Components/TweetList';
import useStyle from './style.js'
import HomeIcon from '@material-ui/icons/Home';
import { Divider } from '@material-ui/core';
import {useLocation} from 'react-router-dom'
import Axios from 'axios';
import { getTweetsByHastagRequest } from '../../API/api_tweets';
import { useTweetDispatch, useTweetState,setTweetList } from '../../Context/TweetContext';
import { toast } from 'react-toastify';
const HastagTweetList = (props) => {
    const location=useLocation()
  // const [tweets,setTweets]=useState([])
const {tweetLists:tweets}=useTweetState()
const tweetDispatch=useTweetDispatch()
  useEffect(()=>{
    getTweetsByHastagRequest(props.match.params.hashtag,(isok,data)=>{
      if(!isok)
      return toast.error(data)
      setTweetList(tweetDispatch,data)
     
  })
  },[location])
    const classes=useStyle()
    console.log(props);
    return ( 
        <>
<div className={classes.root}>
<Header title={props.match.params.hashtag} icon={ <img src={"/images/1.png"} style={{ width: "50px" }} />}/>
<Divider lassName={classes.divider}/>

<TweetList data={tweets}/>
        </div>
        </>
     );
}
 
export default HastagTweetList;