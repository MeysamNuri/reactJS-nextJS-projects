import React from 'react';
import Header from '../../Components/Header/Header';
import TweetList from '../Home/Components/TweetList';
import useStyle from './../Home/style'
import PersonIcon from '@material-ui/icons/Person';
import { Divider } from '@material-ui/core';
const TweetsByUsers = () => {
    
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
          text:` وعده غدایی ما برای هر نفر #صبحانه به طور میانگین
          وعده #غدایی ما برای هر نفر به طور میانگین hello
          وعده غدایی ما برای هر نفر به طور #میانگین`,
          likes:4,
        },
        {
          sender:{
            name: "navid", id: "@navid", img: "/images/b.jpg" 
          
          },
          text:` وعده غدایی ما برای هر نفر به طور میانگین
          وعده غدایی ما #صبحانه هر نفر به طور میانگین hello
          وعده غدایی ما برای هر نفر به طور میانگین`,
          likes:58
        },
        {
          sender:{
            name: "hesam", id: "@hesam", img: "/images/b.jpg" 
          
          },
          text:` وعده غدایی #ما برای هر نفر به طور میانگین
          وعده غدایی ما برای هر #صبحانه به طور میانگین hello
          وعده غدایی ما #برای هر نفر به طور میانگین`,
          likes:5
        }
       
    
      ]
      const classes=useStyle()
    return (  

        <>
        <div className={classes.root}>
        <Header title={" میثم نوری"} icon={ <PersonIcon />}/>
        <Divider lassName={classes.divider}/>
        
        <TweetList data={Tweets}/>
                </div>
                </>
    );
}
 
export default TweetsByUsers;