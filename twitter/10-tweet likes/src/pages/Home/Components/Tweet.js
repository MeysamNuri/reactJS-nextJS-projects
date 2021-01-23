import { Typography, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import useStyle from './../style'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setLikeTweet, useTweetDispatch } from '../../../Context/TweetContext';
import {setTweetText}from './../../../Context/TweetContext'
import { LikeTweetRequest } from '../../../API/api_tweets';
import { toast } from 'react-toastify';
const Tweet = ({ datas }) => {
    console.log(datas);
    const tweetDispatch=useTweetDispatch()
    const reTweetClick=()=>{
        setTweetText(tweetDispatch,datas.text)
    }
    const hanleLike=()=>{
        LikeTweetRequest(datas._id,(isOk,data)=>{
            if(!isOk)
            return toast.error(data)
            setLikeTweet(tweetDispatch,datas._id)
        })
       
    }
    const renderTweet = (text) => {

        return { __html: text.replace(/#\S+/g, "<a href='/tags/$&' style='color:blue'>$&</a>") }
    }
    const classes = useStyle()
    const getImage = () => {
        if (datas.user.image)
            return datas.user.image
        else return '/images/person.png'
    }
    return (

        <div className={classes.TweetItem}>
          
            <Grid container >
                <img src={getImage()} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />


                <Grid item container direction={"column"} style={{ flex: 1, marginRight: "1rem" }}>
                    <Grid item container >
                        <Typography className={classes.TweetItemName}>
                            {datas.user.name}
                        </Typography>
                        <Typography className={classes.TweetItemId}>
                            {datas.user.id}
                        </Typography>
                    </Grid>

                    <Typography dangerouslySetInnerHTML={renderTweet(datas.text)} style={{ marginTop: ".75rem", fontSize: "5px" }} component={"p"} />


                    {
                        datas.image &&
                        <div style={{ width: "50%", textAlign: "right", marginTop: "40px" }}>
                            <div style={{ backgroundImage: `url(${datas.image})` }} className={classes.Tweetpic}></div>
                        </div>
                    }
                </Grid>
            </Grid>
            <Grid container direction={"row-reverse"} style={{ marginTop: "16px" }} alignItems={"center"}>
                <IconButton onClick={reTweetClick}>
                    <img src={"/images/retweet.png"} className={classes.ButtonImg} />
                </IconButton>
                <IconButton className={classes.favImg} onClick={hanleLike}>
                    <FavoriteIcon />
                </IconButton>
                <Typography className={classes.Numbertweet}>{datas.likes}</Typography>
            </Grid>
        </div>


    );
}

export default Tweet;