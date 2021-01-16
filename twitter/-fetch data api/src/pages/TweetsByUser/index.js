import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import TweetList from '../Home/Components/TweetList';
import useStyle from './../Home/style'
import PersonIcon from '@material-ui/icons/Person';
import { Divider } from '@material-ui/core';
import Axios from 'axios';
import { getAllTweets } from '../../API/api_tweets';
const TweetsByUsers = (props) => {
  const [tweets,setTweets]=useState([])

  useEffect(()=>{
    getAllTweets((isok,data)=>{
      if(!isok)
      return alert(data.message)
      else setTweets(data)
    })
  },[])
   
      const classes=useStyle()
      console.log(props.match.params.user);
    return (  

        <>
        <div className={classes.root}>
        <Header title={props.match.params.user} icon={ <PersonIcon />}/>
        <Divider lassName={classes.divider}/>
        
        <TweetList data={tweets}/>
                </div>
                </>
    );
}
 
export default TweetsByUsers;