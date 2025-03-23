import { Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header.js';
import NewTweet from './Components/NewT.js';
import TweetList from './Components/TweetList.js';
import useStyle from './style.js'
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios'
const Home = () => {
const [tweets,setTweets]=useState([])

useEffect(()=>{
axios.get("http://localhost:3000/tweets")
.then(res=>{
  const data=res.data
  setTweets(data)
}).catch((ex)=>{
  console.log(ex);
})
},[])
    const classes=useStyle()
    return ( 

      <>

<div className={classes.root}>
<Header title={"خانه"} icon={<HomeIcon />}/>
<Divider lassName={classes.divider}/>
<NewTweet />
<TweetList data={tweets}/>
        </div>
  
      </>
     );
}
 
export default Home;