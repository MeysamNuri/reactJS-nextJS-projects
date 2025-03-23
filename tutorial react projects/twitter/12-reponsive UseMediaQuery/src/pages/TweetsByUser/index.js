import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import TweetList from '../Home/Components/TweetList';
import useStyle from './../Home/style'
import PersonIcon from '@material-ui/icons/Person';
import { Divider, Typography } from '@material-ui/core';
import Axios from 'axios';
import { getAllTweets, getTweetsByUserRequest } from '../../API/api_tweets';
import { useLocation } from 'react-router-dom';
import { setTweetList, useTweetDispatch, useTweetState } from '../../Context/TweetContext';
const TweetsByUsers = (props) => {
 
  const location=useLocation()
  // const [tweets,setTweets]=useState([])
const {tweetLists:tweets}=useTweetState()
const tweetDispatch=useTweetDispatch()

  useEffect(()=>{
    getTweetsByUserRequest(props.match.params.id,(isok,data)=>{
      if(!isok)
      return;
      else setTweetList(tweetDispatch,data)
    })
  },[location])
   console.log(tweets);
      const classes=useStyle()
      console.log(props.match.params.user);
    return (  

        <>
        <div className={classes.root}>
        <Header title={props.match.params.name} icon={ <PersonIcon />}/>
        <Divider lassName={classes.divider}/>
        {tweets.length ===0 && 
        <Typography>این کاربر تویتی تا به حال نداشته</Typography>
        }
        <TweetList data={tweets}/>
                </div>
                </>
    );
}
 
export default TweetsByUsers;