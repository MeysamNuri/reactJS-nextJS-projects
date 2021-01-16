import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import TweetList from '../Home/Components/TweetList';
import useStyle from './style.js'
import HomeIcon from '@material-ui/icons/Home';
import { Divider } from '@material-ui/core';
import Axios from 'axios';
import { getAllTweets } from '../../API/api_tweets';
const HastagTweetList = (props) => {
    
  const [tweets,setTweets]=useState([])

  useEffect(()=>{
    getAllTweets((isok,data)=>{
      if(!isok)
      return alert(data.message)
      else setTweets(data)
  })
  },[])
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