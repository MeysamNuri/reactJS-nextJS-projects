import { Divider } from '@material-ui/core';
import React, { useState } from 'react';
import Header from '../../Components/Header/Header.js';
import NewTweet from './Components/NewT.js';
import TweetList from './Components/TweetList.js';
import useStyle from './style.js'
import HomeIcon from '@material-ui/icons/Home';
const Home = () => {
  const Tweets=[
    {
      sender:{
        name: "Xiaomi", id: "Xiaomi@1234", img: "/images/b.jpg" 
      
      },
      text:` وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین`,
      likes:0
    },
    {
      sender:{
        name: "meysam", id: "@meysam", img: "/images/b.jpg" 
      
      },
      text:` وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین`,
      likes:4,
    },
    {
      sender:{
        name: "navid", id: "@navid", img: "/images/b.jpg" 
      
      },
      text:` وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین`,
      likes:58
    },
    {
      sender:{
        name: "hesam", id: "@hesam", img: "/images/b.jpg" 
      
      },
      text:` وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین
      وعده غدایی ما برای هر نفر به طور میانگین`,
      likes:5
    }
   

  ]
    const classes=useStyle()
    return ( 

      <>

<div className={classes.root}>
<Header title={"خانه"} icon={<HomeIcon />}/>
<Divider lassName={classes.divider}/>
<NewTweet />
<TweetList data={Tweets}/>
        </div>
  
      </>
     );
}
 
export default Home;